import React from 'react'
import { Pagination } from 'react-bootstrap'
import _ from 'lodash'

const Paginator = ({ currentPage, lastPage, navigatePage, fetchArticles }) => (
  <Pagination>
    {_.range(1, lastPage + 1).map((p) => (
      <Pagination.Item key={p} disabled={p === currentPage} onClick={() => navigatePage(p)} className={'pageButton'}>
        {p}
      </Pagination.Item>
    ))}
    <Pagination.Next onClick={fetchArticles} className={'fetchMoreButton'} />
  </Pagination>
)

export default Paginator
