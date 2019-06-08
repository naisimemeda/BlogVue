<template>
<div class="col-md-9 left-col pull-right">
  <div class="panel article-body content-body">
    <h1 class="text-center">{{ title }}</h1>
    <div class="article-meta text-center">
      <i class="fa fa-clock-o"></i>
      <abbr>{{create_time}}</abbr>
    </div>
    <div class="entry-content">
      <div class="content-body entry-content panel-body ">
        <div class="markdown-body" v-html="content"></div>
        <div v-if="auth && this.$store.state.user.id === user_id" class="panel-footer operate">
          <div class="actions">
            <a @click="deleteArticle" class="admin" href="javascript:;"><i class="fa fa-trash-o"></i></a>
            <a @click="editArticle" class="admin" href="javascript:;"><i class="fa fa-pencil-square-o"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="votes-container panel panel-default padding-md">
    <div class="panel-body vote-box text-center">
      <div class="btn-group">
        <div @click="like" href="javascript:;" class="vote btn btn-primary popover-with-html" :class="likeClass">
          <i class="fa fa-thumbs-up"></i> {{ likeClass ? '已赞' : '点赞' }}
        </div>
      </div>
      <div class="voted-users">
        <div class="user-lists">
          <span v-for="(likeUser, index) in likeUsers" :key='index'>
            <img :src="likeUser.avatar" class="img-thumbnail avatar avatar-middle animated swing" :class="{ 's' : likeUser.user_id == 1 }">
          </span>
        </div>
        <div v-if="!likeUsers.length" class="vote-hint">成为第一个点赞的人吧 ?</div>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import router from '@/router'
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import ls from '@/utils/localStorage'
import register from '@/api/article'
import emoji from 'node-emoji'
import {
  mapState
} from 'vuex'

export default {
  name: 'Content',
  // 添加相关数据
  data() {
    return {
      articleId: '',
      title: '', // 文章标题
      content: '', // 文章内容
      create_time: '',
      user_id: '',
      likeUsers: [], // 点赞用户列表
      likeClass: '', // 点赞样式
    }
  },
  computed: {
    ...mapState([
      'auth',
    ])
  },
  beforeCreate(){
    const articleId = this.$route.params.articleId
    if (articleId) {
      register.Article(articleId).then(response => {
        const article = response.data
        let {id, title, content, created_at, user_id, like} = article
        this.title = title
        // 使用编辑器的 markdown 方法将 Markdown 内容转成 HTML
        this.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name))
        this.create_time = created_at
        this.articleId = id
        this.user_id = user_id
        this.likeUsers = like || []
        this.likeClass = this.likeUsers.some(likeUser => likeUser.user_id === this.$store.state.user.id) ? 'active' : ''
        this.$nextTick(() => {
          // 遍历当前实例下的 'pre code' 元素
          this.$el.querySelectorAll('pre code').forEach((el) => {
            // 使用 highlight.js 的 highlightBlock 方法进行高亮
            hljs.highlightBlock(el)
          })
        })
      })
    }
  },
  methods: {
    // 编辑文章
    editArticle() {
      // 点击编辑文章图标，跳到编辑文章页面，并附带当前文章 ID
      this.$router.push({
        name: 'Edit',
        params: {
          articleId: this.articleId
        }
      })
    },
    // 删除文章
    deleteArticle() {
      this.$swal({
        text: '你确定要删除此内容吗?',
        confirmButtonText: '删除'
      }).then((res) => {
        register.DelArticle(this.articleId).then(response => {
          router.push({
            name: 'Home',
            params: {
              showMsg: true
            }
          })
        })
      })
    },
    like(e) {
      // 未登录时，提示登录
      if (!this.auth) {
        this.$swal({
          text: '需要登录以后才能执行此操作。',
          confirmButtonText: '前往登录'
        }).then((res) => {
          if (res.value) {
            this.$router.push('/auth/login')
          }
        })
      } else {
        let that = this
        const target = e.currentTarget
        // 点赞按钮是否含有 active 类，我们用它来判断是否已赞
        const active = target.classList.contains('active')
        const articleId = this.articleId
        if (active) {
          register.CancelLike(this.articleId).then(response => {
            this.likeClass = ''
            for (let likeUser of this.likeUsers) {
              if (parseInt(likeUser.user_id) === this.$store.state.user.id) {
                this.likeUsers.splice(this.likeUsers.indexOf(likeUser), 1)
                break
              }
            }
          }).catch(error => {
            return this.$message.show('请重试', 'warning')
          })
        } else {
          // 添加已赞样式
          register.ArticleLike(this.articleId).then(response => {
            this.likeClass = 'active animated rubberBand'
            const user = this.$store.state.user
            this.likeUsers.push({
              user_id: user.id,
              avatar: user.avatar
            })
          }).catch(error => {
            return this.$message.show('请重试', 'warning')
          })
        }
      }
    },
  }
}
</script>

<style scoped>
.CodeMirror,
.CodeMirror-scroll {
  color: #fff;
}
</style>
