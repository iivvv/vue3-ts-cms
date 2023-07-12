//引入
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

//0.实例化 app
const app = express()

//3.连接 mongodb
const db = require('./config/keys').mongoURI
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((err) => {
    console.log(err)
  })

//4.1路由引入
const users = require('./routes/api/users')

// //2.设置路由并测试
// app.get('/', (req, res) => {
//   res.send('hello world')
// })

//5.为 post 接口 使用 body-parser 中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//6.初始化 passport，在单独文件里配置
app.use(passport.initialize())
require('./config/passport')(passport)

//4.2路由使用
app.use('/api/users', users)

//1.搭建本地服务器，使用 node server.js运行
const port = process.env.PORT || 9000 //设置端口号
app.listen(port, () => {
  console.log(`server running on port ${port}`)
  console.log(`浏览器访问 http://localhost:${port}/`)
  console.log(`访问 http://localhost:${port}/api/users/test 测试路由`)
})
