import dotenv from 'dotenv'
dotenv.config()
import { app } from './app.js'
const PORT = process.env.PORT || 3001
import { initDatabase } from './db/init.js'

try {
  await initDatabase()
  app.listen(PORT)
  console.info(`
    Express server running on http://localhost:${PORT}`)
} catch (error) {
  console.error(`Error connecting to database `, error)
}
