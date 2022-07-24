const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const router = require('./router')
const errorHandler = require("./middleware/error-handler")


const app = express()

//日志输出
app.use(morgan('dev'))
//配置解析请求体

app.use(express.json())


//用任何客户端来请求接口服务资源
app.use(cors())
//通过环境变量使用端口号
const PORT = process.env.PORT || 3600

//挂载路由，所有路由以api为前缀
app.use('/api', router)
// 挂载统一处理服务端错误中间件
app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

