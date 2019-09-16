import { handleActions } from 'redux-actions'
import { FETCH_ARTICLES_START, FETCH_ARTICLES_SUCCESS, NAVIGATE_PAGE } from './actions'
import initialState from './initialState'

const reducer = handleActions(
  {
    [FETCH_ARTICLES_START]: (state) => ({
      ...state, isFetching: true
    }),
    [FETCH_ARTICLES_SUCCESS]: (state, { payload }) => ({
      ...state,
      articles: [...state.articles, { page: payload.page, articles: payload.articles }],
      nextStartDate: payload.nextStartDate,
      currentPage: payload.page,
      isFetching: false
    }),
    [NAVIGATE_PAGE]: (state, { payload }) => ({
      ...state,
      currentPage: payload,
    }),
  },
  initialState
)

export default reducer
