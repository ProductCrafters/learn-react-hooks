import React, { Component } from 'react'
import { Container, Row, Col, Navbar } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Paginator from './components/Paginator'
import ArticleCard from './components/ArticleCard'


class ArticlesList extends Component {
  componentDidMount() {
    const { articlesState } = this.props
    const { currentArticles } = articlesState

    if (currentArticles.length > 0) {
      return
    }

    this.props.fetchPage(1)
  }


  navigatePage = page => {
    this.props.updateArticlesState(state => ({ ...state, currentPage: page }))
  }

  render() {
    const { currentArticles, currentPage, lastPage } = this.props.articlesState
    const { isFetching } = this.props.fetchingState
    const BoundPaginator = (
      <Paginator currentPage={currentPage} fetchArticles={() => this.props.fetchPage(lastPage + 1)} lastPage={lastPage} navigatePage={this.navigatePage} />
    )

    const content = (
      <>
        <Row>
          <Col>{BoundPaginator}</Col>
        </Row>
        <Row>
          {currentArticles.map((a, index) => (
            <ArticleCard index={index} pageId={a.pageId} timeStamp={a.timeStamp} title={a.title} />
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
}

ArticlesList.propTypes = {
  articlesState: PropTypes.object.isRequired,
  fetchingState: PropTypes.object.isRequired,
  updateArticlesState: PropTypes.func.isRequired,
  updateFetchingState: PropTypes.func.isRequired,
}

export default ArticlesList
