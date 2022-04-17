const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const sassMiddleware = require('node-sass-middleware')
const path = require('path')
const routes = require('./routes')
const usePassport = require('./config/passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const PORT = 3000

require('./config/mongoose')

const handlebars = exphbs.create({
})
app.engine('.handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
  })
)
app.use(cookieParser('eruc11111'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
usePassport(app)
app.use((req, res, next) => {
  next()
})
// 將 request 導入路由器
app.use(routes)



app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
});