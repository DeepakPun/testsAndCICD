import PropTypes from 'prop-types'
import { Post } from './Post'
import { Fragment } from 'react'

export function PostList({ posts = [] }) {
  let renderedPosts = posts.map(post => (
    <Fragment key={post._id}>
      <Post {...post} />
      <hr />
    </Fragment>
  ))

  return <div>{renderedPosts}</div>
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}
