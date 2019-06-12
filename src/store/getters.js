export const getArticlesByKeyword = (state) => (keyword, getters) => {
    let articles = getters
    let results = []
    if (Array.isArray(articles)) {
      articles.forEach((article) => {
          
        let { id, title, content } = article
        const regex = new RegExp(`(${keyword})`, 'gi')
  
        if (title.indexOf(keyword) !== -1 || content.indexOf(keyword) !== -1) {
          // 使用 state.origin 代替 location.origin
          const url = `${state.origin}/articles/${id}/content`
          title = title.replace(regex, '<span class="highlight">$1</span>')
          content = content.substr(0, 100).replace(regex, '<span class="highlight">$1</span>')
          results.push({...article, ...{ url, title, content }})
        }
      })
    }
  
    return results
  }