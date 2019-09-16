import React, { Component } from 'react'
import { Container, Row, Col, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchArticles } from '../../logic'
import { navigatePage } from '../../redux/actions'
import Paginator from './components/Paginator'
import ArticleCard from './components/ArticleCard'

class ArticlesList extends Component {
  componentDidMount() {
    const { articles, currentPage, fetchArticles, nextStartDate } = this.props
    if (articles.length > 0) {
      return
    }

    fetchArticles(currentPage, nextStartDate)
  }

  render() {
    const { articles, isFetching, currentPage, fetchArticles, lastPage, navigatePage, nextStartDate } = this.props

    const content = (
      <>
        <Row>
          <Col>
            <Paginator
              currentPage={currentPage}
              fetchArticles={() => fetchArticles(lastPage + 1, nextStartDate)}
              lastPage={lastPage}
              navigatePage={navigatePage}
            />
          </Col>
        </Row>
        <Row>
          {articles.map((a, index) => (
            <ArticleCard index={index} pageId={a.pageId} timeStamp={a.timeStamp} title={a.title} />
          ))}
        </Row>
        <Col>
          <Paginator currentPage={currentPage} fetchArticles={fetchArticles} lastPage={lastPage} navigatePage={navigatePage} />
        </Col>
      </>
    )
    return (
      <>
        <Navbar bg="dark" variant="dark" sticky={'top'} className="justify-content-center">
          <Navbar.Brand>📙 Recent Wiki articles</Navbar.Brand>
        </Navbar>
        ​<Container className="py-4">{isFetching ? <h5 className={'loading'}>Fetching latest articles...</h5> : content}</Container>
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
