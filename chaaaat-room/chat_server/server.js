const Koa = require('koa');
const body = require('koa-body');
const koaStatic = require('koa-static');
const cors = require('koa-cors');
const compress = require('koa-compress');
const cacheControl = require('koa-cache-control');
const onerror = require('koa-onerror');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const http = require('http');
const socket = require('socket.io');
// import Koa from 'koa'
// import body from 'koa-body'
// import koaStatic from 'koa-static'
// import cors from 'koa-cors'
// import compress from 'koa-compress'
// import cacheControl from 'koa-cache-control'
// import onerror from 'koa-onerror'
// import logger from 'koa-logger'
// import helmet from 'koa-helmet'
// import http from 'http'
// import socket from 'socket.io'


// 导入 rouer.js 文件
// import router from './app/router'

const app = new Koa()



// 将捕获的错误消息生成友好的错误页面（仅限开发环境）
onerror(app)


app
// 在命令行打印日志
  .use(logger())
  // 缓存控制
  .use(cacheControl({ maxAge: 60000 }))
  // 开启 gzip 压缩
  .use(compress())
  // 跨域（允许在 http 请求头中携带 cookies）
  .use(cors({ credentials: true }))
  // 安全
  .use(helmet())
  // 静态资源服务器
  .use(koaStatic(__dirname+'/app/public'))
  // 解析 sequest body
  // 开启了多文件上传，并设置了文件大小限制
  .use(body({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024
    }
  }))
const server = http.createServer(app.callback())
const io = socket(server)
const SYSTEM = '系统'
io.on('connection', socket => {
  let userName;
  socket.on('message',msg => {
    if(userName){
      //全部 socket为个人
      io.emit('message', {
        id: socket.id,
        userName,
        content: msg.content,
        createAt: new Date(),
      });
    }else{
      userName = msg.userName;
      //除自己之外
      socket.broadcast.emit('message',{
        userName: SYSTEM,
        content: `${userName}加入了聊天`,
        createAt: new Date()
      })
    }
  });
  socket.send('终于等到你');
})
  // 载入路由
  // .use(router.routes(), router.allowedMethods())
  // 启动一个 http 服务器，并监听 3000 端口
server.listen(8889)
// 导出 koa 实例（用于测试）


