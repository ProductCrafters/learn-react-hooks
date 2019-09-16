import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'

const apiBaseUrl = 'https://en.wikipedia.org/w/api.php'
const url = (startDate) =>
  `${apiBaseUrl}?action=query&list=recentchanges&format=json&rcstart=${startDate}&rcnamespace=0&rcshow=!minor%7C!bot%7C!anon%7C!redirect&rclimit=20&rcdir=newer&origin=*`

const singlePageUrl = (pageId) => `${apiBaseUrl}?action=parse&pageid=${pageId}&format=json&origin=*`

const now =
  moment()
    .utc()
    .add('hours', -1)
    .format(`YYYY-MM-DDTHH:mm:ss`) + 'Z'

const fetchArticlesList = (startDate) => {
  return axios
    .get(url(startDate || now))
    .then((response) => {
      const data = _.get(response, 'data.query.recentchanges', [])
      const nextStartDate = _.get(response, 'data.continue.rccontinue', null)
      const articles = data.map((d) => ({ title: d.title, pageId: d.pageid, timeStamp: d.timestamp }))

      return {
        articles,
        nextStartDate,
      }
    })
    .catch(function(error) {
      // handle error
      console.log(error)
    })
}

const fetchArticleDetails = (id) => {
  return axios.get(singlePageUrl(id)).then((response) => {
    const data = _.get(response, 'data.parse', {})
    return {
      title: data.title,
      html: data.text['*'],
    }
  })
}

export { fetchArticlesList, fetchArticleDetails }
