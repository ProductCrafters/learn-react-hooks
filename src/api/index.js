import _ from 'lodash'
import axios from 'axios'
const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=recentchanges&format=json&rcstart=2019-08-29T10:59:20Z&rcnamespace=0&rcshow=!minor%7C!bot%7C!anon%7C!redirect&rclimit=5&rcdir=newer&origin=*'

const singlePageUrl = (pageId) => `https://en.wikipedia.org/w/api.php?action=parse&pageid=${pageId}&format=json&origin=*`

const fetchArticles = (skip = 0) => {
  return axios
    .get(url)
    .then((response) => {
      const data = _.get(response, 'data.query.recentchanges', [])
      return data.map((d) => ({ title: d.title, timeStamp: d.timestamp, pageId: d.pageid }))
    })
    .catch(function(error) {
      // handle error
      console.log(error)
    })
}

const fetchSingleArticle = id => {
  return axios.get(singlePageUrl(id)).then(response => {

    const data = _.get(response, 'data.parse.text.*', '')
    return data
  })
}

export { fetchArticles, fetchSingleArticle }
