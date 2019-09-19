import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Navbar } from 'react-bootstrap'

class ArticleDetails extends Component {
  componentDidMount() {
    const { article, pageId, fetchArticleDetails } = this.props

    if (!article) {
      fetchArticleDetails(pageId)
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

export default ArticleDetails
