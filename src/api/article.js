import axios from 'axios'
import store from '@/store'

export default {
  CreateArticle: data => {
    const user = store.state.user
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
  }
}
