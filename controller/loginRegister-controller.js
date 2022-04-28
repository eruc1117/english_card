const PORT = process.env.PORT
const User = require('../models/UserModel')
const customize = require('../function/constructor')
const bcrypt = require('bcryptjs')
//根據頁面生成對應的CSS路徑
const loginCss = new customize.PageCss('login', PORT)
const registerCss = new customize.PageCss('register', PORT)

const loginRegisterController = {
  loginPage: (req, res) => {
    res.render('user/login', { cssStyle: loginCss.css })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },
  registerPage: (req, res) => {
    res.render('user/register', { cssStyle: registerCss.css })
  },
  register: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body
      if (password !== confirmPassword) {
        return res.redirect('/loginRegister/register')
      }
      const userInfo = await User.findOne({ email })
      const lastId = await User.find()
      let newUser = { name, email }
      if (userInfo) {
        const errorMsg = `這個 Email 已經註冊過了。`
        return res.render('user/rigster', { userInfo: newUser, error_msg: errorMsg, cssStyle: style.css })
      }
      if (!userInfo && !lastId[lastId.length - 1]) {//[lastId.length - 1]，在node v16後可以用 .at(-1)替代 
        newUser.id = 1
      } else {
        newUser.id = Number(lastId[lastId.length - 1].id) + 1
      }
      const salt = await bcrypt.genSalt(10)
      newUser.password = await bcrypt.hash(password, salt)
      newUser.name = name
      await User.create(newUser)
      return res.redirect('/')
    } catch (err) {
      console.log(err)
    }
  }
}


module.exports = loginRegisterController