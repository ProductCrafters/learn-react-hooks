import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Navbar } from 'react-bootstrap'
import PropTypes from 'prop-types'

const ArticleDetails = ({ isFetching, article }) => {
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

ArticleDetails.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  article: PropTypes.object,
}

export default ArticleDetails
