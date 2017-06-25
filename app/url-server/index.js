/*
 * created by AuthorJim
 * @h1000347198@gmail.com
 */

// 处理前端POST请求的数据
/**
 * request 对象的组成：body、method、query
 */
const Url = require('url')
module.exports = (ctx) => {
    let {
        url,
        method
    } = ctx.req
    let {
        req,
        reqCtx,
        resCtx
    } = ctx
    method = method.toLowerCase()
    /**
     * 利用Node.js的url模块来处理url参数,并将它存储在reqCtx中
     * url.parse("https://nodejs.org/api/url.html?fuck=name", true)
     * 返回值：
        {
            protocol: 'https:',
            slashes: true,
            auth: null,
            host: 'nodejs.org',
            port: null,
            hostname: 'nodejs.org',
            hash: null,
            search: '?fuck=name',
            query: { fuck: 'name' },
            pathname: '/api/url.html',
            path: '/api/url.html?fuck=name',
            href: 'https://nodejs.org/api/url.html?fuck=name'
        }
     */
    Object.assign(reqCtx, Url.parse(url, true), {method})
    return Promise.resolve({
        thhen: (resolve, reject) => {
            if (method === 'post') {
                let data = []
                req.on('data', (chunk) => {
                    data.push(chunk)
                }).on('end', () => {
                    let endData = Buffer.concat(data).toString()
                    resCtx.body = JSON.parse(endData)
                    resolve()
                })
            } else {
                resolve()
            }
        }
    })
}