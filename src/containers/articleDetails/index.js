import React, { useEffect } from 'react'
import useReactRouter from 'use-react-router'
import _ from 'lodash'
import ArticleDetails from './uiComponent'
import { fetchArticleDetails as fetchArticleDetailsApi } from '../../api'

function ArticleDetailsContainer({ articlesDetails, setArticlesDetails, fetchingState, updateFetchingState }) {
  const {
    match: { params },
  } = useReactRouter()
  const pageId = _.get(params, 'pageId', null)
  const articleObj = articlesDetails.find((a) => a.id === pageId)
  const article = articleObj ? articleObj.article : null

  const fetchArticleDetails = () => {
    updateFetchingState((state) => ({ ...state, isFetching: true }))

    fetchArticleDetailsApi(pageId).then((res) => {
      setArticlesDetails((state) => [...state, { id: pageId, article: res }])
      updateFetchingState((state) => ({ ...state, isFetching: false }))
    })
  }

  useEffect(() => {
    if (!fetchingState.isFetching && !article) {
      fetchArticleDetails(pageId)
    }
  })

  return (
    <ArticleDetails
      article={article}
      setArticlesDetails={setArticlesDetails}
      fetchArticleDetails={fetchArticleDetails}
      isFetching={fetchingState.isFetching}
    />
  )
}

export default ArticleDetailsContainer
