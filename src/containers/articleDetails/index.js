import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Container, Row, Col, Navbar } from 'react-bootstrap'
import { fetchSingleArticle } from '../../api'

class ArticleDetails extends Component {
  state = {
    article: null,
  }

  componentDidMount() {
    const pageId = _.get(this, 'props.match.params.pageId', null)

    if (!pageId) {
      console.log('page id is not defined')
    } else {
      fetchSingleArticle(pageId).then((article) => {
        this.setState({ article })
      })
    }
  }

  render() {
    const { article } = this.state

    if (!article) {
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
          <Navbar.Brand href="/">
            📙 <span className={'articleName'}>{article.title}</span>
            <Link to="/">🔙</Link>

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
