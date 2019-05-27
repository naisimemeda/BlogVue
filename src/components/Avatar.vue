<template>
  <div class="example-avatar">
    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>Drop files to upload</h3>
    </div>
    <div class="avatar-upload"  v-show="!edit" >
      <div class="text-center p-2" style="float: left">
        <label for="avatar" >
          <img style="border-radius: 50%;width: 300px; height: 300px;" :src="this.$store.state.user.avatar ? this.$store.state.user.avatar  : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
        </label>
      </div>
      <div class="text-center p-2" style="line-height: 22">
        <file-upload
          :headers="{'authorization': this.$store.state.user.token }" 
          extensions="gif,jpg,jpeg,png,webp"
          accept="image/png,image/gif,image/jpeg,image/webp"
          name="avatar"
          class="btn btn-primary"
          post-action="http://blogapi.test/api/upload/avatar"
          :drop="!edit"
          v-model="files"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload">
          Upload avatar
        </file-upload>
      </div>
    </div>

    <div class="avatar-edit" v-show="files.length && edit">
      <div class="avatar-edit-image" v-if="files.length">
        <img style="width: 300px !important; height: 300px !important; border-radius: 50%;"  ref="editImage" :src="files[0].url" />
      </div>
      <div class="text-center p-4" style="margin-top: 45px;width: 300px">
        <button type="button" class="btn btn-secondary" @click.prevent="$refs.upload.clear">Cancel</button>
        <button type="submit" class="btn btn-primary" @click.prevent="editSave">Save</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.example-avatar .avatar-upload .rounded-circle {
  width: 200px;
  height: 200px;
}
.example-avatar .text-center .btn {
  margin: 0 .5rem
}
.p-4 button{
  margin: 0 auto;
}
.example-avatar .avatar-edit-image {
  max-width: 100%
}
.example-avatar .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}
.example-avatar .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>


<script>
import FileUpload from 'vue-upload-component'

export default {
  components: {
    FileUpload,
  },
  data() {
    return {
      files: [],
      edit: false,
    }
  },
  watch: {
    edit(value) {
      if (value) {
        this.$nextTick(function () {
          if (!this.$refs.editImage) {
            return
          }
        })
      }
    }
  },
  methods: {
    editSave() {
      this.edit = false
      let oldFile = this.files[0]
      this.$refs.upload.update(oldFile.id, {
        active: true,
      })
    },
    alert(message) {
      alert(message)
    },
    inputFile(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        this.$nextTick(function () {
          this.edit = true
        })
      }
      if (!newFile && oldFile) {
        this.edit = false
      }
    },
    inputFilter(newFile, oldFile, prevent) {

      if(newFile.response.data){
        this.$store.dispatch('updateUser', {
          avatar: newFile.response.data.avatar
        })
        this.$message.show('更换成功 ~ ')
      }
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.alert('Your choice is not a picture')
          return prevent()
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
    },
  }
}
</script>
