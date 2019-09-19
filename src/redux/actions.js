import { createAction } from 'redux-actions'

export const FETCH_ARTICLE_DETAILS_START = 'FETCH_ARTICLE_DETAILS_START'
export const FETCH_ARTICLE_DETAILS_SUCCESS = 'FETCH_ARTICLE_DETAILS_SUCCESS'
export const FETCH_ARTICLE_DETAILS_ERROR = 'FETCH_ARTICLE_DETAILS_ERROR'

export const fetchArticleDetailsStart = createAction(FETCH_ARTICLE_DETAILS_START, (id) => ({ id }))
export const fetchArticleDetailsSuccess = createAction(FETCH_ARTICLE_DETAILS_SUCCESS, (id, article) => ({ id, article }))
export const fetchArticleDetailsError = createAction(FETCH_ARTICLE_DETAILS_ERROR)
