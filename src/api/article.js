import axios from 'axios'
import store from '@/store'
var user = store.state.user
export default {  
  ArticleList: (Page, Order) => {
    return axios.get(('http://blogapi.test/api/article/list?page=' + Page +'&order='+ Order)).then(response =>
        response.data
    ).catch(error => error.response.data)
  },
  CreateArticle: data => {
    return axios.post(('http://blogapi.test/api/article'), data, {
      headers: {
        'Authorization': user.token
      }
    }).then(response =>
      response.data
    ).catch(error => error.response.data)
  },
  Article: id => {
    return axios.get(('http://blogapi.test/api/article/'+ id)).then( response => response.data )
  },
  Search: (Search, Order = 1) => {
    return axios.get(('http://blogapi.test/api/article/search?search='+ Search+'&order='+ Order)).then( response => response.data )
  },
  UpdateArticle: (articleId, data) => {
    return axios.post(('http://blogapi.test/api/article/'+ articleId), data, {
      headers: {
        'Authorization': user.token,
      }
    }).then(response =>
      response.data
    ).catch(error => error.response.data)
  },
  DelArticle: articleId => {
    return axios.delete(('http://blogapi.test/api/article/'+ articleId),  {
      headers: {
        'Authorization': user.token
      }
    }).then(response =>
        response.data
    ).catch(error => error.response.data)
  },
  CancelLike: (articleId) => {
    return axios.get(('http://blogapi.test/api/article/cancelike/'+ articleId),  {
      headers: {
        'Authorization': user.token
      }
    }).then(response =>
        response.data
    ).catch(error => error.response.data)
  },
  ArticleLike: (articleId) => {
    return axios.get(('http://blogapi.test/api/article/like/'+ articleId),  {
      headers: {
        'Authorization': user.token
      }
    }).then(response =>
        response.data
    ).catch(error => error.response.data)
  },
  ArticleComment: (articleId) => {
    return axios.get(('http://blogapi.test/api/comment/'+ articleId)).then(response =>
        response.data
    ).catch(error => error.response.data)
  },
  CreateComment: (articleId, data) => {
    return axios.post(('http://blogapi.test/api/comment/'+ articleId), data, {
      headers: {
        'Authorization': user.token,
      }
    }).then(response =>
      response.data
    ).catch(error => error.response.data)
  },
  DeleteComment: CommentId => {
    return axios.delete(('http://blogapi.test/api/comment/'+ CommentId),  {
      headers: {
        'Authorization': user.token
      }
    }).then(response =>
        response.data
    ).catch(error => error.response.data)
  }
}
