import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Container, Row, Col, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchArticleDetails } from '../../logic'

class ArticleDetails extends Component {
  componentDidMount() {
    const { article, fetchArticleDetailsAction, pageId } = this.props

    if (!article) {
      fetchArticleDetailsAction(pageId)
    }
  }

  render() {
    const { isFetching, article } = this.props

    if (isFetching || !article) {
      return (
        <Container>
          <Row>
            <h4>Loading...</h4>
          </Row>
        </Container>
      )
    }

    return (
      <>
        <Navbar bg="dark" variant="dark" sticky={'top'} className="justify-content-center">
          <Navbar.Brand>
            <Link to="/">
              📙 <span className={'articleName'}>{article.title}</span>
            </Link>
          </Navbar.Brand>
        </Navbar>

        <Container>
          <Row>
            <Col>
              <div dangerouslySetInnerHTML={{ __html: article.html }} />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

const connectedArticleDetails = connect(
  ({ articleDetails }, props) => {
    const pageId = _.get(props, 'match.params.pageId', null)

    const articleObj = articleDetails.list.find((a) => a.id === pageId)

    return {
      article: articleObj ? articleObj.article : null,
      isFetching: articleDetails.isFetching,
      pageId,
    }
  },
  {
    fetchArticleDetailsAction: fetchArticleDetails,
  }
)(ArticleDetails)

export default connectedArticleDetails
