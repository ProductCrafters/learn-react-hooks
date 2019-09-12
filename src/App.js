import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { fetchArticles, fetchSingleArticle } from './api'

// fetchArticles(0).then(console.log)
class App extends Component {
  state = {
    __html: 'Loading...',
  }

  componentDidMount() {
    fetchSingleArticle(24326).then((text) => {
      this.setState({ __html: text })
    })
  }

  render() {
    const { __html } = this.state
    return (
      <div className="App">
        <div dangerouslySetInnerHTML={{ __html }} />
      </div>
    )
  }
}

export default App
