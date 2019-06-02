import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'
import * as moreActions from './actions'
Vue.use(Vuex)

const getters = {
  getArticleById: (state) => (id) => {
    let articles = state.articles
    if (Array.isArray(articles)) {
      articles = articles.filter(article => parseInt(id) === parseInt(article.articleId))
      return articles.length ? articles[0] : null
    } else {
      return null
    }
  }
}
const state = {
  user: ls.getItem('user'),
  auth: ls.getItem('auth'),
  articles: ls.getItem('articles')
}
const mutations = {
  USER(state, user) {
    state.user = user
    ls.setItem('user', user)
  },
  UPDATE_AUTH(state, auth) {
    state.auth = auth
    ls.setItem('auth', auth)
  },
  UPDATE_ARTICLES(state, articles) {
    state.articles = articles
    ls.setItem('articles', articles)
  },
  ...moreActions
}

const actions = {
  login({ commit }, user) {
    if (user) commit('USER', user)
    commit('UPDATE_AUTH', true)
    router.push('/')
  },
  logout({ commit }) {
    commit('UPDATE_AUTH', false)
    ls.removeItem('user')
    router.push({
      name: 'Home',
      params: {
        logout: true
      }
    })
  },
  errlogout({ commit }) {
    commit('UPDATE_AUTH', false)
    ls.removeItem('user')
    router.push({
      name: 'Home', 
      params: {
        errLogin: true
      }
    })
  },
  updateUser({ state, commit }, user) {
    const stateUser = state.user
    if (stateUser && typeof stateUser === 'object') {
      user = {
        ...stateUser,
        ...user
      }
    }
    commit('USER', user)
  },
  refreshToken({ state, commit }, token) {
    const stateUser = state.user
    const user = {
      ...stateUser,
      ...token
    }
    commit('USER', user)
  },
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
