const jsonServer = require('json-server')
const path = require('path')

const db_path = path.join(__dirname, '../data/db.json')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router(db_path)

module.exports = function() {
  const port = 3003
  server.use(middlewares)
  server.use(router)
  /* NOTE: supertest will auto start the server */
  server.listen(port, () => {
    console.log('JSON Server is running at port ' + port)
  })
  return server
}