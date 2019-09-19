import React from 'react'
import { Container, Row, Col, Navbar } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Paginator from './components/Paginator'
import ArticleCard from './components/ArticleCard'

const ArticlesList = ({ updateArticlesState, articlesState, fetchingState, fetchPage }) => {
  const navigatePage = (page) => {
    updateArticlesState((state) => ({ ...state, currentPage: page }))
  }

  const { currentArticles, currentPage, lastPage } = articlesState
  const { isFetching } = fetchingState
  const BoundPaginator = (
    <Paginator currentPage={currentPage} fetchArticles={() => fetchPage(lastPage + 1)} lastPage={lastPage} navigatePage={navigatePage} />
  )

  const content = (
    <>
      <Row>
        <Col>{BoundPaginator}</Col>
      </Row>
      <Row>
        {currentArticles.map((a, index) => (
          <ArticleCard key={index} index={index} pageId={a.pageId} timeStamp={a.timeStamp} title={a.title} />
        ))}
      </Row>
      <Row>
        <Col>{BoundPaginator}</Col>
      </Row>
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

ArticlesList.propTypes = {
  articlesState: PropTypes.object.isRequired,
  fetchingState: PropTypes.object.isRequired,
  updateArticlesState: PropTypes.func.isRequired,
  fetchPage: PropTypes.func.isRequired,
}

export default ArticlesList
