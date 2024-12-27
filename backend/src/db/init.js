import mongoose from 'mongoose'
// fsr for fullstack react
// const dbName = 'blog_fsr_book'
import dotenv from 'dotenv'
dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL

// console.log(DATABASE_URL)

export function initDatabase() {
  mongoose.connection.on('open', () => {
    console.info('Succesfully connected to the database ')
  })

  const connection = mongoose.connect(DATABASE_URL)

  return connection
}
