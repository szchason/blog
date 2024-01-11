---
title: Webpack
description: Webpack
sidebar_label: Webpack配置和使用
hide_title: true
last_update:
  date: 2023-02-26
  author: Chason
---

## 一、Webpack基础使用

> webpack是一个静态资源打包工具，它会以一个或多个文件作为打包的入口，将我们整个项目所有文件编译组合成一个或多个文件输出出去，输出的文件就是编译好的文件，就可以在浏览器运行了

### 1.1、项目初始化

执行命令：

```bash
npm init -y
```

### 1.2、下载相关依赖

使用npm下载相关依赖：

```bash
npm i webpack webpack-cli -D
```

相关目录结构：

![1663490396858](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368590-bf378a.png)

### 1.3、启用webpack

- 开发模式：仅能编译JS中的ES Module 语法

  ```bash
  npx webpack ./src/main.js --mode=development
  ```

- 生产模式：能编译JS中的ES Module语法，还能压缩JS代码

  ```bash
  npx webpack ./src/main.js --mode=production
  ```

## 二、Webpack核心概念

### 2.1、基本配置

1. entry（入口）

   指示Webpack从那个文件开始打包

2. output（输出）

   指示Webpack打包完的文件输出到哪里去，如何命名等

3. loader（加载器）

   Webpack本身只能处理js、json等资源，其他资源需要借助loader，Webpack才能解析

4. plugins（插件）

   扩展Webpack的功能

5. mode（模式）

   主要由两种模式：

   (1)、开发模式：development

   (2)、生产模式：production

### 2.2、webpack配置文件

在项目根目录新建文件：webpack.config.js

![1663491734075](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368595-5a2114.png)

## 三、Webpack基础

### 3.1、开发服务器搭建

#### 3.1.1、开发服务器和自动化

安装相关依赖：

```bash
npm i webpack-dev-server -D
```

webpack.config.js配置devServer

```js
 // 开发服务器
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    static: './dist',
  }
```

展示效果：

![1663493746999](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368600-94fdc8.png)

#### 3.1.2、处理html资源

> 处理html资源使用插件 `html-webpack-plugin`
>
> 作用：
>
> - 自动引入打包后的js文件
> - 不同js可以配置不同的html文件

下载相关依赖包：

```bash
npm i html-webpack-plugin -D
```

webpack.config.js配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入

// 插件
  plugins: [
    new HtmlWebpackPlugin({
        // 指定html文件
      template: path.resolve(__dirname,'public/index.html'),
    })
  ],
```

`html-webpack-plugin`还有很多相关其他配置，可以参考官网地址：https://github.com/jantimon/html-webpack-plugin

#### 3.1.3、处理样式资源

1. 处理css样式资源

下载相关依赖：

```bash
npm i style-loader css-loader -D
```

创建css文件，并且在main.js进行引入：

![1663495367607](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368604-0e3d41.png)

同时webpack.config.js的配置

```js
  // 加载器
  module: {
    rules: [
      {
        test: /\.css$/, // 自检测.css文件
        // use的执行顺序：从右到左（从下到上）
        use: [
          "style-loader", // 将js中的css通过创建style标签添加html文件生效
          "css-loader" // 将css资源编译成common.js模块到js中
        ]
      }
    ]
  },
```

引入的css此时不会单独生成css文件，而是被js动态创建style标签引入

![1663496233944](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368608-d95947.png)

👋注意： <u>use的执行顺序：从右到左（从下到上）</u>

2. 处理sass资源

下载相关依赖：

```bash
npm i sass-loader sass -D
```

webpack.config.js配置，同时注意在入口文件引入scss文件

```js
 {
        test: /\.s[ac]ss/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader", // 将sass编译成css文件
        ]
}
```

#### 3.1.4、处理图片资源

html中的引入div

```html
<body>
  <div class="box"></div>
  <div class="box1"></div>
</body>
```

css的文件样式：

![1663499461450](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368611-fbb2e5.png)

webpack.config.js的文件

```js
{
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 小于10kb的图片转base64
            // 优点：减少请求数量， 缺点：体积会更大，并且打包后不会输出对应图片
            // 推荐：对应几kb的可以转base64
            maxSize: 10*1024 // 10kb
          }
        },
        generator: {
          // 输出图片的路径
          // [hash:10] hash取前10位
          filename: "module_img/[hash][ext][query]"
        }
      }
```

#### 3.1.5、处理字体图标资源

在webpack中的module的rule中代码：

```js
{
  test: /\.(ttf|woff2?)$/,
  type: "asset/resource",
  generator: {
    // 输出字体图标的路径
    // [hash:10] hash取前10位
    filename: "fonts/[hash:10][ext][query]"
  }
}
```

在public目录下html的使用：

![1666528206531](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368617-2d8175.png)

👋注意： <u>字体图标使用iconfont.css对应字体文件目录</u>

![1666528342334](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368621-3ff853.png)

#### 3.1.6、处理其他资源

![1666527988131](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368626-d6f492.png)

#### 3.1.7、处理js资源

在处理js涉及js的语法兼容性处理和压缩处理，详细的可以参考babel的使用和babel在webpack中的使用，这里不做详细的解析

#### 3.1.8、其他

1. 修改输出文件目录

   ![1666527479948](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368630-60cd7f.png)

2. 自动清空上次打包的目录

   ![1666527522325](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368633-527ca1.png)

### 3.2、生产模式搭建

> 生产模式要求我们的对html文件、css样式文件、js文件等进行兼容和压缩处理，基于这个需要针对兼容和压缩这两个操作而作一些处理

#### 3.2.1、提取css成单独文件

安装相关依赖：

```bash
npm i mini-css-extract-plugin -D
```

在匹配css或者scss、less中添加：

![1666528789283](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368637-4e6878.png)

在plugins的使用：

![1666528920167](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368640-6a702f.png)

打包后的结果：

![1666528950979](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368644-20f4c6.png)

#### 3.2.2、样式兼容性处理

安装相关依赖包：

```bash
npm i postcss-loader postcss- postcss-preset-env -D
```

使用：

![1666529351021](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368647-5a6030.png)

在package.json设置兼容版本(设置兼容版本形式多样，这里不做详细讲解)：

![1666529673359](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368653-50943d.png)

实现的结果:

![1666529654676](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368656-4d317b.png)

👋注意： <u>要放在css-loader之后，sass-loader和less-loader之前</u>

#### 3.2.3、css压缩

安装相关依赖：

```bash
npm i css-minimizer-webpack-plugin -D
```

直接引用：

```js
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
```

![1666530122178](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368660-eb24b9.png)

#### 3.2.4、html和js的压缩

webpack开启生产模式时，默认开启js和html的压缩

如果需要对js压缩配置选项：

可以在optimization中minimizer配置插件

![1667739507743](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368663-b29c00.png)

#### 3.2.5、统一命名

js命名:

![1667742319662](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368666-a257a8.png)

资源文件命名:

![1667742356257](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368670-bb4939.png)

css命名:
![1667742384554](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368674-19f1e6.png)

## 四、Webpack高级

### 4.1、SourceMap

以下是开发环境和生产环境的推荐:

开发环境: eval-cheap-source-map

生产环境: hidden-source-map

详情参考:https://webpack.docschina.org/configuration/devtool/#qualities

### 4.2、HMR

> 热模块替换，修改某个模块代码，就只有这个模块代码需要重新打包编译，其他模块不变，这样打包速度就能很快

配置：

![1667719385831](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368678-2692ef.png)

### 4.3、OneOf

> 作用：让文件只被其中一个配置进行处理

```js
rules: [
  {
    oneOf: [
      {
        test: /\.js/,
        include: path.resolve(__dirname, './src'),
        use: [
          {
            loader: 'thread-loader', // 多进程打包
            options: {
              works: threads,
            },
          },
        ],
      },
      {
        test: /\.css$/, // 自检测.css文件
        // use的执行顺序：从右到左（从下到上）
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader", // 将js中的css通过创建style标签添加html文件生效
          'css-loader', // 将css资源编译成common.js模块到js中
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env', // 处理样式兼容性问题
                ],
              },
            },
          },
        ],
      },
    ],
  },
];
```

### 4.4、Include-Exclude

> include：包含，只处理xxx文件
>
> exclude：排除，除了xxx文件其他文件都处理
>
> 两个只能写一个

使用：

![1666534330587](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368683-ccbf1c.png)

### 4.5、多进程打包

> 当项目越来越大时，打包速度越来越慢。
>
> 多进程打包：开启电脑的多个进程同时干一件事
>
> 👋注意： <u>请仅在特别耗时的操作中使用，因为每个进程启动就有大约600ms左右的开销</u>

安装依赖包

```bash
npm i thread-loader -D
```

同时需要node的os模块获取电脑的cpu核数

```js
const os = require('os');
const threads = os.cpus().length;
```

使用：

```js
      {
        test: /\.js/,
        include: path.resolve(__dirname,'./src'),
        use: [
          {
            loader: "thread-loader", // 多进程打包
            options: {
              works: threads
            }
          }
        ]
      },
```

![1667720360115](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368688-c78b62.png)

多进程的压缩js代码
![1667720391319](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368692-3e2f26.png)

### 4.6、TreeShaking

> 实现目的：减少代码体积
>
> 通常用于描述移除JavaScript中的没有使用的代码，在mode：“production”下webpack默认开启

**使用：**

在math.js中导出 `mul`、`add` 两个函数

![1666531137930](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368697-df1b1b.png)

在入口的main.js中只使用`mul`函数

![1666531179104](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368701-917250.png)

👋注意：<u>设置sideEffects</u>

> 指的是：webpack在做tree-sharking的时候，发现模块没有被引用就会被删除
>
> sideEffects设置true，指定所有引用未使用的文件都是有作用的，不可以删除代码
>
> sideEffects设置false，指定所有引用未使用文件都是无作用的，可以删除代码

简单设置body的背景色

```css
html body {
  background: red;
}
```

同时在入口main.js引入

```js
main.js;
import count from './count';
import sum from './sum';
import { mul } from './math';
import './css/demo.css';
import './css/base.scss';
import './css/iconfont.css';
```

效果展示：

![1667736226254](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368705-450e1b.png)

设置sideEffects：true，css样式效果会一样起效果

当设置sideEffects：false时, 因为css不是js代码，引入时被webpack当作引入未使用，会剔除css代码

![1667736329006](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368710-755c7a.png)

所以，设置sideEffects：true时，虽然可以让css样式文件生效，但是js就无法做tree-shaking。这时，sideEffects单独设置副作用文件，sideEffects：["*.css","*.scss"]

![1667736834435](https://gitee.com/szchason/pic_bed/raw/main/notes/webpack/webpack_base/2023-05-29-1685368718-7819ef.png)

### 4.7、CodeSplit

> 打包代码时会将所有的js文件打包到一个文件中,体积太大了,我们如果只有渲染首页,就应该只加载首页的js文件, 其他文件不应该加载
>
> 所以我们需要将打包生成的文件进行代码分割, 生成多个js文件,渲染那个页面就只加载某个js文件,这样加载的资源就少,速度就更快

CodeSplit主要做了两件事:

1. 分割文件: 将打包生成的文件进行分割,生成多个js文件
1. 按需加载: 需要那个文件就加载那个文件

1、单入口

> 开发时我们可能是单页面应用（SPA）,只有一个入口（单入口）

一般设置以下即可：

```js
 splitChunks: {
      chunks: "all",
 }
```

2、多入口

详细解释如下：

```js
splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      /* 以下是默认值 */
      minSize: 20000, // 分割代码最小的大小
      minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      maxAsyncRequests: 30, // 按需加载时并行加载的文件最大数量
      maxInitialRequests: 30, // 入口js文件最大并行请求数量
      enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      cacheGroups: {
        defaultVendors: { // 组名
          test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
          priority: -10, // 权重（越大越高）
          reuseExistingChunk: true, // 如果当前chunk包含已从主bundle中拆分的模块，则它将被重用，而不是生成新的模块
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
```
