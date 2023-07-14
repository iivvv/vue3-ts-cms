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
  //查询数据库中是否拥有该手机号
  User.findOne({ phone: req.body.phone }).then((user) => {
    if (user) {
      return res.status(400).json('手机号已被注册！')
    } else {
      //mm 为默认头像
      const avatar = gravatar.url(req.body.phone, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User({
        name: req.body.name,
        phone: req.body.phone,
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
          id: user._id,
          name: user.name,
          avatar: user.avatar,
          role: user.role
        }
        // jwt.sign('规则', '加密名称', '过期时间', '箭头函数')
        jwt.sign(
          rule,
          keys.secretOrKey,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err
            //最初版本
            // res.json({
            //   success: true,
            //   token: 'Bearer ' + token //必须写bearer
            // })
            //前端版本
            res.json({
              code: '200',
              data: {
                username: user.name,
                userId: user._id,
                avatar: user.avatar,
                token: 'Bearer ' + token
              },
              desc: '成功'
            })
          }
        )
      } else {
        return res.status(400).json('密码错误')
      }
    })
  })
})

// // $route GET api/users/current
// // @desc 根据 token 返回请求的 current user数据
// // @access private
// // router.get('/current','验证 token','箭头函数’)
// router.get(
//   '/current',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     // res.json({ msg: 'token success' })
//     // res.json(req.user)
//     res.json({
//       id: req.user.id,
//       name: req.user.name,
//       phone: req.user.phone,
//       role: req.user.role
//     })
//   }
// )

// $route GET api/users/:id
// @desc a
// @access public
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    try {
      // res.json({ msg: 'token success' })
      // res.json(req.user)
      res.json({
        code: '200',
        data: {
          id: req.user.id,
          name: req.user.name,
          phone: req.user.phone,
          role: req.user.role
        }
      })
    } catch (error) {
      console.error('Error retrieving user:', error)
      res.status(500).json({ code: '9999', desc: '服务器内部错误' })
    }
  }
)

module.exports = router
