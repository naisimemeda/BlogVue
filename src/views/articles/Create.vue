<template>
<div class="blog-container">
  <div class="blog-pages">
    <div class="col-md-12 panel">
      <div class="panel-body">
        <h2 class="text-center">{{ articleId ? '编辑文章' : '创作文章' }}</h2>
        <hr>
        <div data-validator-form>
          <div class="form-group">
            <input v-model.trim="title" v-validator:blur.required="{ title: '标题' }" type="text" class="form-control" placeholder="请填写标题">
          </div>
          <div class="form-group">
            <textarea id="editor"></textarea>
          </div>
          <br>
          <div class="form-group">
            <button class="btn btn-primary" type="submit" @click="post">发 布</button>
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
import router from '@/router'
window.hljs = hljs

export default {
  name: 'Create',
  data() {
    return {
      title: '', // 文章标题
      content: '', // 文章内容
      articleId: undefined
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setArticleId(vm.$route.params.articleId)
    })
},
// 在离开该组件的对应路由前
beforeRouteLeave(to, from, next) {
  // 清空自动保存的文章数据
  this.clearData()
  next()
},
watch: {
  // 监听路由参数的变化
  '$route'(to) {
    // 清空自动保存的文章数据
    this.clearData()
    // 设置 articleId
    this.setArticleId(to.params.articleId)
  }
},
  mounted() {
    const simplemde = new SimpleMDE({
      element: document.querySelector('#editor'),
      placeholder: '请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。',
      spellChecker: false,
      autoDownloadFontAwesome: false,
      autosave: {
        enabled: true,
        uniqueId: 'vuejs-essential'
      },
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    })

    simplemde.codemirror.on('change', () => {
      this.content = simplemde.value()
    })

    this.simplemde = simplemde
  },
  methods: {
    post() {
      const title = this.title
      const content = this.content

      if (title !== '' && content.trim() !== '') {
        const article = {
          title,
          content
        }
        register.CreateArticle(article).then(response => {
          this.clearData()
          var articleId = response.data.id
          router.push({ name: 'Content', params: { articleId, showMsg: true } })
        })
      }
    },
    clearData() {
      this.title = ''
      ls.removeItem('smde_title')
      this.simplemde.value('')
      this.simplemde.clearAutosavedValue()
    }
    ,
  setArticleId(articleId) {
    this.articleId = articleId
  }
  }
}
</script>

<style scoped>
.blog-container {
  max-width: 980px;
  margin: 0 auto;
  margin-top: 20px;
}

textarea {
  height: 200px;
}

.editor-preview .editor-preview-active {
  color: #fff;
}
</style>
