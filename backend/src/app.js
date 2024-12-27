import express from 'express'
import cors from 'cors'
const app = express()
import bodyParser from 'body-parser'

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http:localhost:3001',
  ],
  methods: 'GET,POST,PUT,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

import { postRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
postRoutes(app)
userRoutes(app)

// const getData = async () => {
//   const url = 'http://localhost:3001/api/v1/posts/6768692534d81254250a9a54'
//   try {
//     const response = await fetch(url)
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`)
//     }

//     const data = await response.json()
//     console.log(data)
//   } catch (error) {
//     console.error(error.message)
//   }
// }

app.get('/', async (req, res) => {
  // getData()
  res.send(`Hello from Express!\n
    Visit <a href="http://localhost:3001/api/v1/posts" target='_blank'>API here</a>
    `)
})

export { app }
