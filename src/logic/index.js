import { fetchArticleDetailsStart, fetchArticleDetailsSuccess, fetchArticleDetailsError } from '../redux/actions'
import { fetchArticleDetails as fetchArticleDetailsApi } from './../api'

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
