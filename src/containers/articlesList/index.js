import React from 'react'
import UIComponent from './uiComponent'
import { fetchArticlesList } from '../../api'
import _ from 'lodash'


function ArticleList({ articlesState, updateArticlesState, fetchingState, updateFetchingState }) {

  const { articles, currentPage } = articlesState
  const currentArticlesObj = articles.find((a) => a.page === currentPage)
  const currentArticles = currentArticlesObj ? currentArticlesObj.articles : []
  const lastPage = _.maxBy(articles, 'page') || { page: 1 }

  const fetchPage = (page) => {
    const { nextStartDate } = articlesState

    updateFetchingState((state) => ({
      ...state,
      isFetching: true,
    }))

    fetchArticlesList(nextStartDate).then((res) => {
      updateFetchingState((state) => ({
        ...state,
        isFetching: false,
      }))
      updateArticlesState((state) => ({
        ...state,
        articles: [...state.articles, { page, articles: res.articles }],
        nextStartDate: res.nextStartDate.substr(0, res.nextStartDate.indexOf('|')),
        currentPage: page,
      }))
    })
  }

  return (
    <UIComponent
      articlesState={{
        currentArticles,
        lastPage: lastPage.page,
        currentPage,
      }}
      updateArticlesState={updateArticlesState}
      fetchingState={fetchingState}
      updateFetchingState={updateFetchingState}
      fetchPage={fetchPage}
    />
  )
}

export default ArticleList
