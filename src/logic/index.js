import { fetchArticlesStart, fetchArticlesSuccess } from '../redux/actions'
import { fetchArticles as apiFetchArticles } from './../api'

export const fetchArticles = (page, nextDate) => (dispatch) => {
  dispatch(fetchArticlesStart(page))
  apiFetchArticles(nextDate)
    .then(({ articles, nextStartDate }) => {
      dispatch(fetchArticlesSuccess(articles, page, nextStartDate.substr(0, nextStartDate.indexOf('|'))))
    })
    .catch((e) => {})
}
