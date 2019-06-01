export const post = ({ commit, state }, { article, articleId }) => {
  let articles = state.articles
  const { title, content } = article
  articles.push({
        title
      })
    commit('UPDATE_ARTICLES', articles)
    router.push({ name: 'Content', params: { articleId, showMsg: true } })
  }
