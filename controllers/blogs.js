const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
//const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// Tehtävä 4.10 ja 4.12
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title or URL is missing' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

// Tehtävä 4.13
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// Tehtävä 4.14
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updateBlog = {
    likes: body.likes
  }
  const updated = await Blog.findByIdAndUpdate(request.params.id, updateBlog, { new: true })
  response.json(updated)
})
/*
blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
}) 

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
}) */

module.exports = blogsRouter