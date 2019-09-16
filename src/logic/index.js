import {
  fetchArticlesStart,
  fetchArticlesSuccess,
  fetchArticlesError,
  fetchArticleDetailsStart,
  fetchArticleDetailsSuccess,
  fetchArticleDetailsError,
} from '../redux/actions'
import { fetchArticlesList, fetchArticleDetails as fetchArticleDetailsApi } from './../api'

export const fetchArticles = (page, nextDate) => (dispatch) => {
  dispatch(fetchArticlesStart(page))
  fetchArticlesList(nextDate)
    .then(({ articles, nextStartDate }) => {
      dispatch(fetchArticlesSuccess(articles, page, nextStartDate.substr(0, nextStartDate.indexOf('|'))))
    })
    .catch((e) => {
      dispatch(fetchArticlesError(e))
    })
}

export const fetchArticleDetails = (id) => (dispatch) => {
  dispatch(fetchArticleDetailsStart(id))
  fetchArticleDetailsApi(id)
    .then((article) => {
      dispatch(fetchArticleDetailsSuccess(id, article))
    })
    .catch((e) => {
      dispatch(fetchArticleDetailsError(e))
    })
}
