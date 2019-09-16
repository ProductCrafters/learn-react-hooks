import { handleActions } from 'redux-actions'
import { FETCH_ARTICLE_DETAILS_START, FETCH_ARTICLE_DETAILS_SUCCESS, FETCH_ARTICLE_DETAILS_ERROR } from '../actions'
import initialState from './../initialState'

const articlesListReducer = handleActions(
  {
    [FETCH_ARTICLE_DETAILS_START]: (state) => ({
      ...state, isFetching: true
    }),
    [FETCH_ARTICLE_DETAILS_SUCCESS]: (state, { payload }) => ({
      ...state,
      list: state.list.find(a => a.id === payload.id) ? state.list : [...state.list, { id: payload.id, article: payload.article }],
      isFetching: false
    }),
    [FETCH_ARTICLE_DETAILS_ERROR]: (state, { payload }) => ({
      ...state,
      error: payload
    }),
  },
  initialState.articlesList
)

export default articlesListReducer
