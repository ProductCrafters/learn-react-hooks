import { createAction } from 'redux-actions'

export const FETCH_ARTICLES_START = 'FETCH_ARTICLES_START'
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS'
export const FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR'

export const FETCH_ARTICLE_DETAILS_START = 'FETCH_ARTICLE_DETAILS_START'
export const FETCH_ARTICLE_DETAILS_SUCCESS = 'FETCH_ARTICLE_DETAILS_SUCCESS'
export const FETCH_ARTICLE_DETAILS_ERROR = 'FETCH_ARTICLE_DETAILS_ERROR'

export const NAVIGATE_PAGE = 'NAVIGATE_PAGE'

export const fetchArticlesStart = createAction(FETCH_ARTICLES_START, (page) => ({ page }))
export const fetchArticlesSuccess = createAction(FETCH_ARTICLES_SUCCESS, (articles, page, nextStartDate) => ({ articles, page, nextStartDate }))

export const navigatePage = createAction(NAVIGATE_PAGE)


