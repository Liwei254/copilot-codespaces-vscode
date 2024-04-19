// Create web server
// Create a web server that listens on port 3000 and serves the comments.json file.

// The comments.json file contains an array of comments. Each comment has the following structure:
// {
//     "id": 1,
//     "author": "John Doe",
//     "message": "Hello, world!",
//     "created_at": "2021-02-01T12:34:56Z"
// }
// The server should respond to the following requests:

// GET /comments
// Respond with the comments.json file as JSON.
// GET /comments/:id
// Respond with the comment that has the given id as JSON. If the comment does not exist, respond with a 404 status code.
// POST /comments
// Create a new comment. The request body should contain the author and message fields. The created_at field should be set to the current date and time. The new comment should be added to the comments.json file and assigned a unique id. Respond with the new comment as JSON.
// PUT /comments/:id
// Update the comment with the given id. The request body should contain the author and message fields. Respond with the updated comment as JSON. If the comment does not exist, respond with a 404 status code.
// DELETE /comments/:id
// Delete the comment with the given id. Respond with a 204 status code. If the comment does not exist, respond with a 404 status code.

// To parse the request body as JSON, you can use the express.json() middleware.

const express = require('express')
const fs = require('fs').promises

const app = express()

app.use(express.json())

app.get('/comments', async (req, res) => {
  const comments = JSON.parse(await fs.readFile('comments.json'))
  res.json(comments)
})

app.get('/comments/:id', async (req, res) => {
  const comments = JSON.parse(await fs.readFile('comments.json'))
  const comment = comments.find(comment => comment.id === parseInt(req.params.id))
  if (!comment) {
    res.status(404).send('Comment not found')
    return
  }
  res.json(comment)
})

app.post('/comments', async (req, res) => {
  const comments = JSON.parse(await fs.readFile('comments.json'))
  const newComment = {
    id: comments.length > 0 ? comments[comments.length - 1].