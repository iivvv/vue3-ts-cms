//@login&register
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const User = require('../../models/User')
const passport = require('passport')

// $route GET api/users/test
// @desc 返回请求的 json 数据
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'api works' })
})

// $route POST api/users/register
// @desc 添加数据，并返回添加的 json 数据
// @access public
router.post('/register', (req, res) => {
  // console.log(req.body) //携带的数据
  //查询数据库中是否拥有该邮箱
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json('邮箱已被注册！')
    } else {
      //mm 为默认头像
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        role: req.body.role,
        password: req.body.password
      })
      //密码加密
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if (err) throw err
          newUser.password = hash
          // Store hash in your password DB.
          newUser
            .save() //往数据库添加数据
            .then((user) => res.json(user))
            .catch((err) => console.log(err))
        })
      })
    }
  })
})

// $route POST api/users/login
// @desc  校验数据，并返回结果和token
// @access public
router.post('/login', (req, res) => {
  // console.log(req)
  const name = req.body.name
  const password = req.body.password
  //查询数据库
  User.findOne({ name }).then((user) => {
    if (!user) {
      return res.status(400).json('该用户不存在！')
    }
    //匹配密码
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // res.json({ msg: 'success' })
        //登录成功返回 token
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          role: user.role
        }
        // jwt.sign('规则', '加密名称', '过期时间', '箭头函数')
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err
          res.json({
            success: true,
            token: 'Bearer ' + token //必须写bearer
          })
        })
      } else {
        return res.status(400).json('密码错误')
      }
    })
  })
})

// $route GET api/users/current
// @desc 根据 token 返回请求的 current user数据
// @access private
// router.get('/current','验证 token','箭头函数’)
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // res.json({ msg: 'token success' })
    // res.json(req.user)
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    })
  }
)

module.exports = router
