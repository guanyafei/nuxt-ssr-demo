## 项目介绍

**整合 vue + nuxt + axios + vuex + vue-router (nuxt 自带 vuex 和 vue-router)，一个基于 Nuxt 的服务器端渲染 Demo**

## 项目构建步骤

``` bash
# 安装依赖
$ npm install # Or yarn install

# 启动服务，访问 localhost:3000
$ npm run dev

# 生成环境打包
$ npm run build
$ npm start

# 打包需要部署的静态页面
$ npm run generate
```

访问 http://localhost:3000 ，现在我们来看下初始化好的项目目录

```shell
├── assets						css，图片等资源都在这
├── components                  组件相关
├── layouts                     路由布局
├── middleware                  中间件
├── pages                  		路由页面
├── static                  	静态资源
├── pages                  		路由页面
├── store              	      	vuex 相关
├── nuxt.config.js              nuxt 相关配置
├── package.json              	依赖相关
├── README.md              	    项目介绍
```

## 项目部署

| 命令            | 描述                                       |
| ------------- | ---------------------------------------- |
| nuxt          | 启动一个热加载的 Web 服务器（开发模式） [localhost:3000](http://localhost:3000/) |
| nuxt build    | 利用 webpack 编译应用，压缩 JS 和 CSS 资源（发布用）      |
| nuxt start    | 以生成模式启动一个 Web 服务器 (`nuxt build` 会先被执行)   |
| nuxt generate | 编译应用，并依据路由配置生成对应的 HTML 文件 (用于静态站点的部署)    |

### 服务器端渲染部署

看到上面静态化页面部署，详细有同学会问。进行静态化页面部署，岂不是没有了服务器端渲染的优势了。

对的，如果你的项目只是静态页面的话，做静态化部署是完全 OJBK 的。但如果牵扯到请求，还是乖乖的进行服务器端的部署吧 ~ 

开始前，请确保你的服务器上已经搭建好了 node 环境。没有的同学，我建议使用 [nvm](https://github.com/creationix/nvm/blob/master/README.md) 安装 node 。接下来，开始部署

#### i. 进行服务代理

第一步，将之前 clone 下面的 git 项目切换到主开发分支，然后为了之后的方便修改一下你的 ` package.json` 

```json
"scripts": {
  "build": "npm run lint && nuxt build && npm start",
  "start": "nuxt start"
}
```

第二步，启动服务

```shell
npm run build
```

第三步，配置你的 nginx 文件

```nginx
# 通过 upstream nodejs 可以配置多台 nodejs 节点，做负载均衡
# keepalive 设置存活时间。如果不设置可能会产生大量的 timewait
# proxy_pass 反向代理转发 http://nodejs

upstream nodenuxt {
    server 127.0.0.1:3000; # nuxt 项目监听端口
    keepalive 64;
}
server {
  listen 80;
  server_name expswl.gome.com.cn;
  
  location / {
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_cache_bypass $http_upgrade;
    proxy_pass http://nodenuxt; # 反向代理
  }
}
```

最后，重新启动 nginx 服务

```shell
sudo service nginx restart
```

#### 使用 pm2 做进程守护

使用 pm2 对进程进行守护

首先全局安装 pm2

```shell
npm i pm2 -g
```

然后进入到项目目录，执行

```shell
pm2 start npm --name "nuxt-ssr-demo" -- run build
```
