import React, { Component } from 'react'
import { Container, Row, Col, Navbar, Button, ButtonGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { fetchArticles } from '../../logic'
import { navigatePage } from '../../redux/actions'
import { timeFromNowAgo } from '../../utils'

class ArticlesList extends Component {
  componentDidMount() {
    const { articles, currentPage, fetchArticles, nextStartDate } = this.props
    if (articles.length > 0) {
      return
    }

    fetchArticles(currentPage, nextStartDate)
  }

  // 1,2,3, ..., 17,_18_ >>
  // _1_ >>
  // 1,2,3,4,_5_ >>
  paginator = () => {
    const { currentPage, lastPage, nextStartDate, navigatePage } = this.props
    if (lastPage <= 5) {
      return (
        <ButtonGroup>
          {_.range(1, lastPage + 1).map((p) => (
            <Button disabled={p === currentPage} onClick={() => navigatePage(p)}>
              {p}
            </Button>
          ))}
          <Button onClick={() => this.fetchPage(lastPage + 1, nextStartDate)}>⏭️</Button>
        </ButtonGroup>
      )
    }
  }

  fetchPage = (page, nextDate) => {
    this.props.fetchArticles(page, nextDate)
  }

  render() {
    const { articles } = this.props

    if (articles.length === 0) {
      return (
        <Container>
          <h5>Fetching latest articles...</h5>
        </Container>
      )
    }

    return (
      <>
        <Navbar bg="dark" variant="dark" sticky={'top'} className="justify-content-center">
          <Navbar.Brand>📙 Recent Wiki articles</Navbar.Brand>
        </Navbar>

        <Container>
          <Row>{this.paginator()}</Row>
          {articles.map((a) => (
            <Row>
              <Col>
                <Link to={`/details/${a.pageId}`}>{a.title}</Link>
                <p>🕒 {timeFromNowAgo(a.timeStamp)}</p>
              </Col>
            </Row>
          ))}
          <Row>
            <Col>
              <Row>{this.paginator()}</Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

const connectedArticlesList = connect(
  (state) => {
    const articlesObj = state.articles.find((a) => a.page === state.currentPage)
    const lastPage = _.maxBy(state.articles, 'page') || { page: 1 }
    return {
      articles: articlesObj ? articlesObj.articles : [],
      currentPage: state.currentPage,
      lastPage: lastPage.page,
      nextStartDate: state.nextStartDate,
    }
  },
  {
    fetchArticles,
    navigatePage,
  }
)(ArticlesList)

export default connectedArticlesList