import mongoose from 'mongoose'
import { beforeAll, afterAll } from '@jest/globals'
import { initDatabase } from '../db/init.js'

beforeAll(async done => {
  await initDatabase()
  done()
})

afterAll(async done => {
  await mongoose.connection.close()
  done()
})
