// /*
//  * created by AuthorJim
//  * @h1000347198@gmail.com
//  */

// /**
//  * 处理前端静态资源
//  * js css img font
//  */

// const path = require('path')
// const fs = require('fs')
// const mime = require('mime')
// module.exports = (ctx) => {
//     let {
//         reqCtx,
//         resCtx
//     } = ctx
//     let {
//         pathname
//     } = reqCtx
//     let getPath = pathname => path.resolve(process.cwd(), 'public', `${pathname}`)
//     return Promise.resolve({
//         then: (resolve, reject) => {
//             if (pathname.match(/\./) && !pathname.match('.action')) {
//                 let _path = getPath(pathname)
//                 resCtx.headers = Object.assign(resCtx.headers, {
//                     'Content-Type': mime.lookup(_path)
//                 })
//                 fs.readFile(_path, (err, data) => {
//                     if (err) {
//                         resolve(`Not Found ${err.stack}`)
//                     } else {
//                         resCtx.body = data
//                     }
//                     resolve()
//                 })
//             } else {
//                 resolve()
//             }
//         }
//     })
// }

/*
 * 静态资源服务 
 */
//express框架 app.use(static('public'))绝对路径
const path = require('path');
const fs = require('fs');
const mime = require('mime');
let getPath = pathname=>path.resolve(process.cwd(),'public',`.${pathname}`);
let staticFunc = (ctx)=>{
		let { pathname } = ctx.reqCtx;
		let { resCtx } =  ctx;
		return new Promise((resolve,reject)=>{
			if(pathname.match(/\./) && !pathname.match('action')){
				let _path=getPath(pathname);
				resCtx.headers = Object.assign(resCtx.headers,{
					'Content-Type':mime.lookup(_path)
				});
				let body = fs.readFile(_path,(err,data)=>{
					if(err){
						resCtx.body = `NOT FOUND${err.stack}`
					}
					resCtx.body = data;
					resolve()
				})	
			}else{
				resolve()
			}
		})
	};

module.exports = staticFunc
