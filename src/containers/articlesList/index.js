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
    const { currentPage, lastPage, nextStartDate, navigatePage, fetchArticles } = this.props
    if (lastPage <= 5) {
      return (
        <ButtonGroup>
          {_.range(1, lastPage + 1).map((p) => (
            <Button key={p} disabled={p === currentPage} onClick={() => navigatePage(p)} className={'pageButton'}>
              {p}
            </Button>
          ))}
          <Button onClick={() => fetchArticles(lastPage + 1, nextStartDate)} className={'fetchMoreButton'}>
            ⏭️
          </Button>
        </ButtonGroup>
      )
    }
  }

  render() {
    const { articles, isFetching } = this.props

    const content = (
      <>
        <Row>{this.paginator()}</Row>
        {articles.map((a, index) => (
          <Row key={index}>
            <Col className={'article'}>
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
      </>
    )

    return (
      <>
        <Navbar bg="dark" variant="dark" sticky={'top'} className="justify-content-center">
          <Navbar.Brand>📙 Recent Wiki articles</Navbar.Brand>
        </Navbar>

        <Container>{isFetching ? <h5 className={'loading'}>Fetching latest articles...</h5> : content}</Container>
      </>
    )
  }
}

const connectedArticlesList = connect(
  ({ articlesList }) => {
    const articlesObj = articlesList.articles.find((a) => a.page === articlesList.currentPage)
    const lastPage = _.maxBy(articlesList.articles, 'page') || { page: 1 }
    return {
      articles: articlesObj ? articlesObj.articles : [],
      isFetching: articlesList.isFetching,
      currentPage: articlesList.currentPage,
      lastPage: lastPage.page,
      nextStartDate: articlesList.nextStartDate,
    }
  },
  {
    fetchArticles,
    navigatePage,
  }
)(ArticlesList)

export default connectedArticlesList
