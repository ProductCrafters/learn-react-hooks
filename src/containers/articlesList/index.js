import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { fetchArticles } from '../../api'

class Index extends Component {
  state = {
    articles: [],
  }

  componentDidMount() {
    fetchArticles(0).then((articles) => {
      this.setState({
        articles,
      })
    })
  }

  render() {
    const { articles } = this.state

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
          <Col>Pagination</Col>
        </Row>
      </Container>
    )
  }
}

export default Index
