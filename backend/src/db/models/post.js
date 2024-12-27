import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'] },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    contents: String,
    tags: [String],
  },
  { timestamps: true },
)

export const Post = mongoose.model('Post', postSchema)

// const postSchema = new Schema(
//   {
//     title: { type: String, required: [true, 'Title is required'] },
//     author: { type: String, required: [true, 'Author is required'] },
//     contents: { type: String, required: [true, 'Contents is required'] },
//     tags: { type: [String], required: [true, 'At least one tag is required'] },
//   },
//   { timestamps: true },
// )
