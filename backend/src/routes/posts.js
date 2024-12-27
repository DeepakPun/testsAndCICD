import mongoose from 'mongoose'
import {
  createPost,
  deletePost,
  getPostById,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  updatePost,
} from '../services/posts.js'
import { requireAuth } from '../middleware/jwt.js'
const URL_ENDPOINT = '/api/v1/posts'

export function postRoutes(app) {
  app.get(URL_ENDPOINT, async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }
    // console.log('REQ.PARAMS ', req.params)
    // console.log('REQ.QUERY ', req.query)
    // console.log(req.query)
    // console.log(options)

    try {
      if (author && tag) {
        return res
          .status(400)
          .json({ error: 'query by either author or tag, not both' })
      } else if (author) {
        return res.json(await listPostsByAuthor(author, options))
      } else if (tag) {
        return res.json(await listPostsByTag(tag, options))
      } else {
        return res.json(await listAllPosts(options))
      }
    } catch (error) {
      console.error('error listing posts', error)
      return res.status(500).end()
    }
  })

  app.post(URL_ENDPOINT, requireAuth, async (req, res) => {
    // console.log('req.body is ', req.body)
    try {
      const { title, contents } = req.body

      // console.log(title, author, contents)

      // if (!title || !contents) {
      //   return res.status(400).json({ error: 'Required data missing' })
      // }

      const post = await createPost(req.auth.sub, {
        title,
        contents,
      })
      return res.json(post)
    } catch (error) {
      console.error('error creating post', error)
      return res.status(500).end()
    }
  })

  app.get(`${URL_ENDPOINT}/:postId`, async (req, res) => {
    try {
      const { postId } = req.params
      // console.log(postId)
      if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
        return res
          .status(400)
          .json({ error: 'Post not found, invalid or missing post id' })
      }
      const post = await getPostById(postId)
      return res.json(post)
    } catch (error) {
      console.error('Error fetching post', error)
      return res.status(500).end()
    }
  })

  app.put(`${URL_ENDPOINT}/:postId`, requireAuth, async (req, res) => {
    try {
      const { postId } = req.params
      // console.log(postId)
      if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
        return res
          .status(400)
          .json({ error: 'Post not found, invalid or missing post id' })
      }
      const { title, author, contents, tags } = req.body
      // if (!title || !author || !contents || !tags) {
      //   return res.status(400).json({ error: 'Required fields missing' })
      // }
      const updatedPost = await updatePost(req.auth.sub, postId, {
        title,
        author,
        contents,
        tags,
      })
      return res.json(updatedPost)
    } catch (error) {
      console.error('Error fetching post', error)
      return res.status(500).end()
    }
  })

  app.delete(`${URL_ENDPOINT}/:postId`, requireAuth, async (req, res) => {
    try {
      const { postId } = req.params
      if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
        return res
          .status(400)
          .json({ error: 'Post not found, invalid or missing post id' })
      }
      const { deleteCount } = await deletePost(req.auth.sub, postId)
      return res
        .status(200)
        .json({ message: 'Post was deleted', _id: postId, deleteCount })
    } catch (error) {
      console.error('Error deleting post', error)
      return res.status(500).end()
    }
  })
}
