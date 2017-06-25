/*
 * created by AuthorJim
 * @h1000347198@gmail.com
 */

// 核心逻辑入口

const fs = require('fs')
const path = require('path')
class App {
    constructor() {
        this.middlewareArray = [] // 处理url中间件数组集合集合
        this.middlewareChain = Promise.resolve() // 设计一个空的Promise对象
    }
    use(middleware) {
        this.middlewareArray.push(middleware) // 将每一个中间件推入到集合中
    }
    // 创建Promise链条
    composeMiddleware(context) {
        let {
            middlewareArray
        } = this
        for (let middleware of middlewareArray) {
            this.middlewareChain = this.middlewareChain.then(() => {
                return middleware(context)
            })
        }
        return this.middlewareChain
    }
    initServer() {
        return (requst, response) => {
            let context = { // 设计一个对象用于保存每一个中间件中的状态
                req: requst,
                reqCtx: {
                    body: '', //POST请求的数据
                    query: {} //客户端的get请求
                },
                res: response,
                resCtx: {
                    // 白名单设置
                    hasUser: false,
                    statusMessage: 'resolve ok', //服务端返回的状态信息
                    statusCode: 200, //服务端返回的状态码
                    headers: {}, //服务端返回的报文头，
                    body: '' //服务端返回的数据
                }
            }
            /**
             * 1、 每一块中间件只需要关注修改context对象即可，彼此独立
             * 2、 设计了use和composeMiddleware这两个api用来创建Promise链
             * 3、 开发者可以专注于中间件开发
             */
            this.composeMiddleware(context).then(() => {
                let {
                    body,
                    statusMessage,
                    statusCode,
                    headers
                } = context.resCtx
                let base = {
                    'X-powered-by': 'Node.js'
                }
                response.writeHead(statusCode, statusMessage, Object.assign(headers, base))
                response.end(body)
            })
        }
    }
}

module.exports = App