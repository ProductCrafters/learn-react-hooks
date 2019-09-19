import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ArticlesList from './containers/articlesList'
import ArticleDetails from './containers/articleDetails'
const articlesInitialState = {
  articles: [],
  currentPage: 1,
  nextStartDate: null,
}

const fetchingInitialState = {
  isFetching: false,
  error: null,
}
function AppRouter() {
  const [articlesState, updateArticlesState] = useState(articlesInitialState)
  const [fetchingState, updateFetchingState] = useState(fetchingInitialState)
  const [articlesDetails, setArticlesDetails] = useState([])

  return (
    <Router>
      <Route
        path="/"
        exact
        render={(props) => (
          <ArticlesList
            {...props}
            articlesState={articlesState}
            updateArticlesState={updateArticlesState}
            fetchingState={fetchingState}
            updateFetchingState={updateFetchingState}
          />
        )}
      />
      <Route
        path="/details/:pageId"
        render={(props) => (
          <ArticleDetails
            {...props}
            articlesDetails={articlesDetails}
            setArticlesDetails={setArticlesDetails}
            fetchingState={fetchingState}
            updateFetchingState={updateFetchingState}
          />
        )}
      />
    </Router>
  )
}

export default AppRouter
