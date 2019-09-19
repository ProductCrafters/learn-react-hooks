import { combineReducers } from 'redux'
import articlesDetailsListReducer from './articleDetailsList'

const reducer = combineReducers({
  articleDetails: articlesDetailsListReducer
})

export default reducer
