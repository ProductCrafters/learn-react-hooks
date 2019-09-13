import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ArticlesList from './containers/articlesList'
import ArticleDetails from './containers/articleDetails'

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={ArticlesList} />
      <Route path="/details/:pageId" component={ArticleDetails} />
    </Router>
  )
}

export default AppRouter
