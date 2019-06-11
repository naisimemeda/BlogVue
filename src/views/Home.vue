<template>
<div>
  <Message :show.sync="msgShow" :type="msgType" :msg="msg" />
  <div class="col-md-9 topics-index main-col">
  <div class="panel panel-default">
    <div class="panel-heading">
      <ul class="list-inline topic-filter">
        <li v-for="(item, index) in filters" :key="index">
          <router-link v-title="item.title" :class="{ active: filter === item.name }" :to="`/topics?filter=${item.name}`">{{ item.name }}</router-link>
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>

    <div class="panel-body remove-padding-horizontal">
      <ul class="list-group row topic-list">
        <li v-for="article in articles" :key="article.id" class="list-group-item">
          <router-link :to="`/articles/${article.id}/content`" tag="div" class="reply_count_area hidden-xs pull-right">
            <div class="count_set">
              <span class="count_of_votes" title="点赞数">{{ article.like_count}}</span>
              <span class="count_seperator">/</span>
              <span class="count_of_replies" title="回复数">{{ article.comment_count}}</span>
              <span class="count_seperator">|</span>
              <abbr class="timeago">{{ article.create_at  }}</abbr>
            </div>
          </router-link>
          <router-link  :to="`/${article.user.id}`" tag="div" class="avatar pull-left">
            <img :src="article.user.avatar" class="media-object img-thumbnail avatar avatar-middle">
          </router-link>
          <router-link :to="`/articles/${article.id}/content`" tag="div" class="infos">
            <div class="media-heading">
              {{ article.title }}
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="panel-footer text-right remove-padding-horizontal pager-footer">
    <Pagination :currentPage="currentPage" :total="total"  :onPageChange="changePage" />
</div>
  </div>
</div>
</div>
</template>

<script>
import register from '@/api/article'
import topic from '@/api/topics'
export default {
  name: 'Home',
  data() {
    return {
      articles: '',
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false, // 是否显示消息，默认不显示
      filters: [
        { title: '最后回复排序'},
        { title: '点赞数排序'},
        { title: '发布时间排序'},
        { title: '无人问津的话题'}
      ],
      filter: '活跃',
      TopicsId:'',
      total: 0,
    }
  },
  beforeRouteEnter(to, from, next) {
    const fromName = from.name
    const logout = to.params.logout
    const errLogin = to.params.errLogin
    next(vm => {
      if (vm.$store.state.auth) {
        switch (fromName) {
          case 'Register':
            vm.showMsg('注册成功')
            break
            // 已登录时，从登录页面跳转过来
          case 'Login':
            // 显示登录成功
            vm.showMsg('登录成功')
            break
        }
      } else if (logout) {
        vm.showMsg('操作成功')
      } else if (errLogin) {
        vm.showMsg('请重新登陆', 'warning')
      }
      vm.setDataByFilter(to.query.filter)
    })
  },
  beforeCreate(){
    let that = this
    register.ArticleList().then(response => {
        const data = response.data.data
        this.articles = data
        }).catch(error => {
       return this.$message.show('请重试', 'warning')
     }),
    topic.get('http://blogapi.test/api/topics').then(response => {
        this.filters = response.data
    })
  },
  computed: {
    auth() {
      return this.$store.state.auth
    },
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    }
  },
  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('操作成功')
      }
    },
    '$route'(to) {
      this.setDataByFilter(to.query.filter)
    }
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    },
    setDataByFilter(filter = '活跃') {
      this.filter = filter
       switch (filter) {
            case '活跃':
              this.TopicsId = 1
              break;
            case '点赞':
              this.TopicsId = 2
              break;
            case '最近':
              this.TopicsId = 3
              break;
            case '零回复':
              this.TopicsId = 4
              break;
        }
      const currentPage = this.currentPage
      register.ArticleList(currentPage, this.TopicsId).then(response => {
        const data = response.data.data
        const { last_page } = response.data
        this.articles = data
        this.total = last_page
        }).catch(error => {
       return this.$message.show('请重试', 'warning')
     })
    },
    changePage(page) {
      // 在查询参数中混入 page，并跳转到该地址
      // 混入部分等价于 Object.assign({}, this.$route.query, { page: page })
      this.$router.push({ query: { ...this.$route.query, page } })
    }
  }
}
</script>

<style scoped>

</style>
