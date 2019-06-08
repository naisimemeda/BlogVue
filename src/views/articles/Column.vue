<template>
  <div class="blog-container">
    <div class="blog-pages">
      <!-- 用于渲染『文章列表』和『文章内容』 -->
      <router-view/>

      <div class="col-md-3 main-col pull-left">
        <div class="panel panel-default corner-radius">
          <div class="panel-body text-center topic-author-box blog-info">
            <div class="image blog-cover">
              <router-link :to="`/${id}`">
                <img :src="userAvatar" class="avatar-112 avatar img-thumbnail">
              </router-link>
            </div>
            <div class="blog-name">
              <h4>
                <router-link :to="`/${id}`">{{ userName }} 的专栏</router-link>
              </h4>
            </div>
            <hr>
            <router-link :to="`/${id}`">
              <li class="list-group-item"><i class="text-md fa fa-list-ul"></i> 专栏文章{{ article_count ? '（' + article_count + '）': ''}}</li>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import register from '@/api/User.js'
import Article from '@/api/article.js'
export default {
  name: 'Column',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const userid = vm.$route.params.userid
      const articleId = vm.$route.params.articleId
      if(userid){
        vm.getUserInfo(vm.$route.params.userid)
      }else if(articleId){
        vm.getArticleUser(vm.$route.params.articleId)
      }
    })
  },
   data(){
      return {
        id: '',
        userName: '',
        article_count: '',
        userAvatar: ''
      }
  },
  methods: {
    getUserInfo(userid){
        let that = this
        register.UserInfo(userid).then(response => {
           let data = response.data
           const { id, avatar, article_count, name} = data
           that.id = id
           that.userAvatar = avatar
           that.article_count = article_count
           that.userName = name
        })
    },
    getArticleUser(articleId){
      let that = this
      Article.Article(articleId).then(response => {
          const user = response.data.user
          let { id, avatar, article_count, name } = user
          that.id = id
          that.userAvatar = avatar
          that.article_count = article_count
          that.userName = name
      })
    }
  }
}
</script>

<style scoped>
.blog-container { margin-top: 20px;}
</style>
