# my-blog-node.js

## 前言
本项目是基于Node.js打造的个人博客系统项目，不依赖任何第三方框架.

博客的前端项目可参考[my-blog-node.js-fe](https://github.com/AuthorJim/my-blog-node.js-fe)

## 项目架构

```bash

	|- app  node中间件及服务
	|	|
	|	|- 技术选型   promise + ejs(模板引擎)
	|
	|
	|- public  前端
	|	|
	|	|- 技术选型   ant-design + react项目
	|
	|
	|- db.sh   运行mongodb
	|	|
	|	|- 技术选型   mongoose
	|
	|- index.js  程序启动入口

```
## 项目运行

```bash

	git clone https://github.com/AuthorJim/my-blog-node.js

	# start mongodb
	sh ./db.sh

	# start node.js code
	npm start

	# 初始化前端项目
	git clone https://github.com/AuthorJim/my-blog-node.js-fe.git punblic

	#  start front-end code

	cd public
	
	# 开发环境 npm start
	# 生产环境 npm run build

```

## 项目截图

![首页](http://wx4.sinaimg.cn/mw690/006p2lMSgy1fgxhtus2vdj311c0hz783.jpg)
![管理页面](http://wx1.sinaimg.cn/mw690/006p2lMSgy1fgxhwy5te4j311j0i2ael.jpg)
![博客详情页](http://wx2.sinaimg.cn/mw690/006p2lMSgy1fgxhwxu5lij311e0hx77l.jpg)