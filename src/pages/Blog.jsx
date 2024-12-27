import { useQuery } from '@tanstack/react-query'
import { CreatePost } from '../components/CreatePost'
import { PostFilter } from '../components/PostFilter'
import { PostList } from '../components/PostList'
import { PostSorting } from '../components/PostSorting'
import { getPosts } from '../api/posts'
import { useState } from 'react'
import { Header } from '../components/Header'
import { Helmet } from 'react-helmet-async'

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })

  const posts = postsQuery.data ?? []

  return (
    <div style={{ padding: 30 }}>
      <Helmet>
        <title>Full-Stack React Blog</title>
        <meta
          name='description'
          content='A blog full of articles about full-stack React development'
        />
      </Helmet>
      <Header />
      <br />
      <br />
      <br />
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter
        field='author'
        value={author}
        onChange={value => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={value => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={orderValue => setSortOrder(orderValue)}
      />
      <PostList posts={posts} />
    </div>
  )
}

// <Post
//   title='Full-stack React Projects'
//   contents="Let's become full-stack developers"
//   author='Daniel Bugl'
// />
