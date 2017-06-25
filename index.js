/*
 * created by AuthorJim
 * @h1000347198@gmail.com
 */


const http = require('http') 
const PORT = 8080
const App =require('./app')
const server = new App()
//中间件
const cookieParser = require('./app/cookie-parser')
const staticServer = require('./app/static-server')
const apiServer = require('./app/api-server')
const urlServer = require('./app/url-server')
const viewServer = require('./app/view-server')
server.use(urlServer)
server.use(cookieParser)
server.use(apiServer)
server.use(staticServer)
server.use(viewServer)


//引入mongoose
const mongoose = require('mongoose')
// Use native promises
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/blogDB')
mongoose.connection.on('error', ()=>{console.log(`error happend for db`)})
		.once('open', ()=>{console.log(`we're fucking connected!`)})

//启动app
http.createServer(server.initServer()).listen(PORT,()=>{
	console.log(`server listening on port ${PORT}`)
})



