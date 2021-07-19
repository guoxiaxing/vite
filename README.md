# vite 2.0

[中文官网](https://cn.vitejs.dev/)

## 搭建第一个 vite 项目

```
npm init vite@latest vite-demo --template react-ts
```

## css module 自动支持

任何以 .module.css 为后缀名的 CSS 文件都被认为是一个 CSS modules 文件。导入这样的文件会返回一个相应的模块对象

About.module.css

```
.red {
  color: red;
}
```

About.tsx

```
import * as React from "react";
import { FC } from "react";
// 将css文件作为模块引入
import classes from "./About.module.css";

export const About: FC = () => {
  return (
    <>
      <h1>About</h1>
      <p className={classes.red}>red</p>
    </>
  );
};
```

## sass 支持

css 预处理器的模块化支持，不需要进行配置

Vite 也同时提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持。没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖：

```
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus
```

你还可以通过在文件扩展名前加上 .module 来结合使用 CSS modules 和预处理器，例如 style.module.scss。

About.module.scss

```
.green {
    color: green
}
```

About.tsx

```
import * as React from "react";
import { FC } from "react";
import classes from "./About.module.scss";

export const About: FC = () => {
  return (
    <>
      <h1>About</h1>
      <p className={classes.green}>green</p>
    </>
  );
};
```

## antd 使用

可以直接安装使用 无需多余的配置

## react-router-dom 使用

可以直接安装使用 无需多余配置

## 插件

Vite 插件扩展了设计出色的 Rollup 接口，带有一些 Vite 独有的配置项。因此，你只需要编写一个 Vite 插件，就可以同时为开发环境和生产环境工作。

也就是说一个标准的 rollup 插件是可以直接用在 vite 中的

## vite 生产环境使用 rollup 打包

## vite 优势

- 打包方面

Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。所以 vite 在开发过程中其实是不需要进行打包的。使用 ES6 模块化的加载规则。因为它不打包，所以我们由入口文件解析到的所有资源都需要进行请求。而且可以从浏览器的 Network 面板里面看到，我们请求过来的文件是完全没有经过压缩处理的，和我们本地代码里的格式完全一致。甚至连后缀名(tsx/vue)都不会修改，直接返回，但是 Content-Type: application/javascript 帮助浏览器识别我们的代码；vite 是会直接启动一个开发服务器，浏览器向这个开发服务器发送请求，开发服务器编译请求的文件然后响应给浏览器，没有打包的过程

webpack 则是需要先打包才可以运行，当我们的模块发生改变的时候请求 devServer，会重新 build，然后替换内存中的模块，再重新启动 devServer

- 热更新方面

Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。=》所以 vite 是依赖缓存进行热更新

webpack 支持了动态模块热重载（HMR）：允许一个模块 “热替换” 它自己，而不会影响页面其余部分。这大大改进了开发体验 —— 然而，在实践中我们发现，即使采用了 HMR 模式，其热更新速度也会随着应用规模的增长而显著下降。

## 特点

1. 快速启动

2. 按需编译

3. 模块热更新

## 为什么生产环境仍需打包 vite build

尽管原生 ESM 现在得到了广泛支持，但由于嵌套导入会导致额外的网络往返，在生产环境中发布未打包的 ESM 仍然效率低下（即使使用 HTTP/2）。为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。

vite 之所以很快，是因为它利用了浏览器对原生 ESModule 的支持，所以不需要打包

但是在生产环境中 我们还是需要对代码进行压缩合并等操作来减少浏览器的请求

## 打包工具出现的原因

1. 解决 ES Module 的浏览器兼容性问题

2. 模块文件过多导致频繁发送网络请求

3. 资源文件模块化问题

打包后的文件可以支持多种模块化规范

浏览器一般就是 esm
