const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const data = require('./data.json')

app.prepare().then(() => {
  const server = express()

  // Client-side renders
  server.get('/', (req, res) => {
    return app.render(req, res, '/home')
  })
  server.get('/products', (req, res) => {
    return app.render(req, res, '/products')
  })

  // API renders
  server.get('/api/products', (req, res) => {
    res.status(200).json(data.products);
  });
  server.get('/api/categories', (req, res) => {
    res.status(200).json(data.categories);
  });


  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})