import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchArticles } from '../../logic'

class ArticlesList extends Component {
  componentDidMount() {
    const { articles, currentPage, fetchArticles, nextStartDate } = this.props
    if (articles.length > 0) {
      return
    }

    fetchArticles(currentPage, nextStartDate)
  }

  fetchPage = (page, nextDate) => {
    this.props.fetchArticles(page, nextDate)
  }

  render() {
    const { articles, currentPage, nextStartDate } = this.props

    if (articles.length === 0) {
      return (
        <Container>
          <h5>Fetching latest articles...</h5>
        </Container>
      )
    }

    return (
      <Container>
        <Row>
          <Col>
            <h3>Updated Articles:</h3>
            <span>{nextStartDate}</span>
          </Col>
        </Row>
        {articles.map((a) => (
          <Row>
            <Col>
              <Link to={`/details/${a.pageId}`}> {a.title}</Link>
            </Col>
          </Row>
        ))}
        <Row>
          <Col>
            <Row>
              <p onClick={() => this.fetchPage(currentPage + 1, nextStartDate)}>{currentPage + 1}</p>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

const connectedArticlesList = connect(
  (state) => {
    const articlesObj = state.articles.find((a) => a.page === state.currentPage)
    console.log(state.nextStartDate)
    return {
      articles: articlesObj ? articlesObj.articles : [],
      currentPage: state.currentPage,
      nextStartDate: state.nextStartDate
    }
  },
  {
    fetchArticles,
  }
)(ArticlesList)

export default connectedArticlesList
