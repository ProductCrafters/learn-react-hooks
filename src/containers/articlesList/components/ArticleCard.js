import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { timeFromNowAgo } from '../../../utils'

const CardImage = <Card.Img variant="top" src="http://via.placeholder.com/320x180" />

const ArticleCard = ({ index, pageId, title, timeStamp }) => (
  <Col xs={12} sm={6} md={4} lg={3} key={index} className={'articleCard mb-3'}>
    <Link to={`/details/${pageId}`} className={'text-decoration-none'}>
      <Card>
        {CardImage}
        <Card.Body>
          <Card.Title className={'articleTitle'}>{title}</Card.Title>
          <Card.Text>🕒 {timeFromNowAgo(timeStamp)}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  </Col>
)

export default ArticleCard
