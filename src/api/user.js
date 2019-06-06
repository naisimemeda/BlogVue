import axios from 'axios'
import store from '@/store'

export default {
  UserCreate: data => {
    return axios.post(('http://blogapi.test/api/users'), data).then(response =>
      response.data
    ).catch(error => error.response.data)
  },
  Login: data => {
    return axios.post(('http://blogapi.test/api/login'), data).then(response =>
      response.data
    ).catch(error => error.response.data)
  },
  UserUpdate: data => {
    const user = store.state.user
    return axios.post(("http://blogapi.test/api/users/" + user.id), data, {
      headers: {
        'Authorization': user.token
      }
    }).then(response =>
      response.data
    ).catch(error => error.data)
  },
  UserPassword: data => {
    const user = store.state.user
    return axios.post("http://blogapi.test/api/password", {
      password: data
    }, {
      headers: {
        'Authorization': user.token
      }
    }).then(response => {
      response.data
    }).catch(error => error.data)
  },
  UserInfo: userid => {
    return axios.get(('http://blogapi.test/api/userinfo/'+ userid)).then( response => response.data )
  },
  UserArticle: userid => {
    return axios.get(('http://blogapi.test/api/userarticle/'+ userid)).then( response => response.data )
  }
}
