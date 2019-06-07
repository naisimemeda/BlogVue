<template>
  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body article-index">
      <div class="panel-body">
        <h1 class="all-articles">
          专栏文章
          <router-link  to="/articles/create" class="btn btn-primary pull-right">
            <i class="fa fa-paint-brush"></i>
            创作文章
          </router-link>
        </h1>

        <ul class="list-group">
          <li v-for="(article, index) in articles"  :key='index' class="list-group-item">
            <img  :src="data.avatar" class="avatar avatar-small">
            <router-link :to="`/articles/${article.id}/content`" class="title">
              {{ article.title }}
            </router-link>
            <span class="meta pull-right">
              <span class="timeago">{{ article.created_cn}}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import register from '@/api/User'

export default {
  name: 'List',
  data() {
    return {
      articles:'',
      data: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getUserArticle(vm.$route.params.userid)
    })
  },
  created(){
  },
  methods:{
    getUserArticle(userid){
    register.UserArticle(userid).then(response => {
        let data = response.data
        this.data = data
        this.articles = data.article
      })
    }
  }
}
</script>

<style scoped>

</style>