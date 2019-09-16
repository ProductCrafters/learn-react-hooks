import { combineReducers } from 'redux'
import articleListReducer from './articlesListReducer'
import articlesDetailsListReducer from './articleDetailsList'

const reducer = combineReducers({
  articlesList: articleListReducer,
  articleDetails: articlesDetailsListReducer
})

export default reducer
