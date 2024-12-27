import { createUser, getUserInfoById, loginUser } from '../services/users.js'
const API_URL = '/api/v1/users'

export function userRoutes(app) {
  app.post(`${API_URL}/signup`, async (req, res) => {
    try {
      const user = await createUser(req.body)
      return res.status(201).json({ username: user.username })
    } catch (error) {
      return res.status(400).json({
        error: 'failed to craete the user, does the username exist?',
      })
    }
  })

  app.post(`${API_URL}/login`, async (req, res) => {
    try {
      const token = await loginUser(req.body)
      return res.status(200).send({ token })
    } catch (error) {
      return res.status(400).send({
        error:
          'login failed, did you enter the correct username/password combination?',
      })
    }
  })

  app.get(`${API_URL}/:id`, async (req, res) => {
    const userInfo = await getUserInfoById(req.params.id)
    return res.status(200).send(userInfo)
  })
}
