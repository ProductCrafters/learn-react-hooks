import { handleActions } from 'redux-actions'
import { FETCH_ARTICLES_START, FETCH_ARTICLES_SUCCESS } from './actions'
import initialState from './initialState'

const reducer = handleActions(
  {
    [FETCH_ARTICLES_START]: (state) => state,
    [FETCH_ARTICLES_SUCCESS]: (state, { payload }) => {
      // console.log(payload)
      return {
        ...state,
        articles: [...state.articles, { page: payload.page, articles: payload.articles }],
        nextStartDate: payload.nextStartDate,
        currentPage: payload.page
      }
    },
  },
  initialState
)

export default reducer
