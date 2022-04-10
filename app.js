const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const sassMiddleware = require('node-sass-middleware')
const path = require('path')
const routes = require('./routes')
const PORT = 3000

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
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('testSetting')
})
// 將 request 導入路由器
app.use(routes)



app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
});