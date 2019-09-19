import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Page from './containers/phd'

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Page} />
    </Router>
  )
}

export default AppRouter
