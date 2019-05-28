<template>
<div class="col-md-9 left-col">
  <div class="panel panel-default padding-md">
    <div class="panel-body">
      <h2><i class="fa fa-cog"></i> 编辑个人资料</h2>
      <hr>
      <div class="form-horizontal" data-validator-form>
      <div class="form-group" >
        <label class="col-sm-2 control-label">头像</label>
          <Avatar style="width: 480px; margin: 0 auto;"></Avatar>
      </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">用户名</label>
          <div class="col-sm-6">
            <input v-model.trim="username" v-validator:input.required="{ title: '用户名', regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }" type="text" class="form-control">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">性别</label>
          <div class="col-sm-6">
            <select v-model="sex" class="form-control">
              <option value="">未选择</option>
              <option value="1">男</option>
              <option value="0">女</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">个人简介</label>
          <div class="col-sm-6">
            <textarea v-model.trim="introduction" type="text" class="form-control"></textarea>
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-6">
            <button type="submit" class="btn btn-primary" @click="updateProfile">应用修改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import register from '@/api/User'
import Avatar from '@/components/Avatar'
export default {
  name: 'EditProfile',
  components: {
    Avatar,
  },
  data() {
    return {
      username: '', // 用户名
      sex: '', // 性别
      introduction: '' // 个人简介
    }
  },
  created() {
    const user = this.$store.state.user
    if (user && typeof user === 'object') {
      const {  name,  sex,  introduction  } = user
      this.username = name
      this.sex = sex || this.sex
      this.introduction = introduction
    }
  },
  methods: {
    updateProfile(e) {
      this.$nextTick(() => {
          const user = {
            name: this.username,
            sex: this.sex,
            introduction: this.introduction
          }
          register.UserUpdate(user).then(response => {
            if (response.code && response.code != 201) {
              this.$message.show(response.message, 'warning')
            } else {
              this.$store.dispatch('updateUser', {
                name: user.name,
                sex: user.sex,
                introduction: user.introduction
              })
              this.$message.show('修改成功')
            }
          })
      });
    },
  }
}
</script>

<style scoped>

</style>
