/*
 * created by _
 * @h1000347198@gmail.com
 */

// 利用cookie设置白名单
const cookie_parser = require('cookie')
module.exports = (ctx) => {
    let {
        reqCtx,
        req,
        res,
        resCtx
    } = ctx
    let {
        pathname
    } = reqCtx
    let {
        cookie
    } = req.headers
    let cookieObj = cookie_parser.parse(cookie || '')
    return Promise.resolve({
        then: (resolve, reject) => {
            let cookieStr = time => `fuck=name;Max-Age=${time}`
            const whiteList = ['/author_jim']//设置白名单
            if (cookieObj['fuck']) {
                resCtx.hasUser = true
                res.setHeader('Set-Cookie', cookieStr(6000))
            }   
            if (whiteList.indexOf(pathname) > -1) {
                res.setHeader('Set-Cookie', cookieStr(6000))
            }
            if (pathname === '/logout') {
                res.setHeader('Set-Cookie', cookieStr(0))
            }
            resolve()
        }
    })
}