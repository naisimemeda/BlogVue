<template>
  <div class="blog-container" style="margin-top:20px">
    <div class="blog-pages">
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
              <div v-if="auth && this.$store.state.user.id === 1" class="panel-footer operate">
              <div class="actions">
                <a @click="deleteArticle" class="admin" href="javascript:;"><i class="fa fa-trash-o"></i></a>
                <a @click="editArticle" class="admin" href="javascript:;"><i class="fa fa-pencil-square-o"></i></a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import ls from '@/utils/localStorage'
import register from '@/api/article'
import emoji from 'node-emoji'
import { mapState } from 'vuex'




export default {
  name: 'Content',
  // 添加相关数据
  data() {
    return {
      articleId:'',
      title: '', // 文章标题
      content: '', // 文章内容
      create_time: '',
      user_id: ''
    }
  },
  computed: {
    ...mapState([
      'auth',
      'user'
    ])
  },
  // 在实例创建完成后
  created() {
    // 从当前路由对象获取参数 articleId
    const articleId = this.$route.params.articleId
    if (articleId) {
      register.Article(articleId).then(response => {
         const article = response.data
         
        let { id, title, content, created_at, user_id} = article

        this.title = title
        // 使用编辑器的 markdown 方法将 Markdown 内容转成 HTML
        this.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name))
        this.create_time = created_at
        this.articleId = id
        this.user_id = user_id

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
      this.$router.push({ name: 'Edit', params: { articleId: this.articleId } })
    },
    // 删除文章
    deleteArticle() {

    }
  }
}
</script>

<style scoped>
.CodeMirror, .CodeMirror-scroll {
  color: #fff;
}
</style>
