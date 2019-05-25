<template>
<div class="row">
  <div class="col-md-4 col-md-offset-4 floating-box">
    <Message :show.sync="msgShow" :type="msgType" :msg="msg" />

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">请登录</h3>
      </div>

      <div class="panel-body" data-validator-form>
        <div class="form-group">
          <label class="control-label">用户名</label>
          <input v-model.trim="username" v-validator.required="{ title: '用户名' }" type="text" class="form-control" placeholder="请填写用户名">
        </div>
        <div class="form-group">
          <label class="control-label">密码</label>
          <input v-model.trim="password" id="password" v-validator.required="{ title: '密码' }" type="password" class="form-control" placeholder="请填写密码">
        </div>
        <br>
        <button @click="login" type="submit" class="btn btn-lg btn-success btn-block">
          <i class="fa fa-btn fa-sign-in"></i> 登录
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import register from '@/api/User'

export default {
  name: 'Login',
  data() {
    return {
      username: '', // 用户名
      password: '', // 密码
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  methods: {
    login(e) {
      this.$nextTick(() => {
        setTimeout(() => {
          const target = e.target.type === 'submit' ? e.target : e.target.parentElement
          if (target.canSubmit) {
            this.submit()
          }
        });
      })
    },
    submit() {
      const user = {
        name: this.username,
        password: this.password
      }
      register.Login(user).then(response => {
        const code = response.code
        if (code != 200) {
          this.showMsg(response.message)
        } else {
          const user = response.data
          this.$store.dispatch('login', user)
          this.showMsg('登陆成功', 'success')
        }
      })
    },
    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false

      this.$nextTick(() => {
        this.msgShow = true
      })
    }
  }
}
</script>

<style scoped>

</style>
