# React 简介

- React 起源于 Facebook 的内部项目,因为该公司对市场上所有 JavaScript MVC 框架,都不满意,就决定自己写一套,用来架设 Instagram(照片交友)的网站。做出来以后,发现这套东西很好用,就在 2013 年 5 月开源了
- 由于 React 的`设计思想及其独特`,属于革命性创新,性能出众,代码逻辑却非常简单。所以越来越多的人开始关注和使用,认为它可能是将来 Web 开发的主流工具
- 清除两个概念:
  - library(库): 小而巧, 可以很方便的从 1 个库,切换到另外一个库,代码基本上不改变.指提供了特定的 API
  - FrameWork(框架): 大而强, 提供了一整套的解决方案,如果在项目中,想切换到另外的框架是比较困难的.

# 前端三大主流框架

- Angular.js: 出来较早的前端框架, 学习曲线比较陡峭,NG1 学起来比较麻烦,NG2~NG5 开始,进行了一系列改革,也提供了组件化开发的概念;从 NG2 开始,也支持使用 TS(Type Script)进行编程;
- Angular1: 2009 年(Google 开发), MVC 不支持 组件化开发
- Vue.js: 最火的一门前端框架,它是中国人开发的,对我们来说,文档要友好一些
- React.js: 最流行的一门框架,它的设计很优秀....

# React 与 Vue 的对比

- 组件化方面:

1. 什么是模块化: 是从代码的角度来进行分析的,把一些可复用的代码抽离为单个的模块,便于项目的维护和开发
2. 什么是组件化: 从 UI 界面的角度来进行分析的,把一些可复用的 UI 元素,抽离为单独的组件
3. 组件化的好处: 随着项目规模的增大,组件会越来越多.可复用的 UI 界面也越来越多
4. Vue 是如何实现组件化的: 通过`.vue`文件,来创建对应的组件;

   - template 结构
   - script 行为
   - style 样式

   [注]: webpack 会编译`.vue`文件,形成组件.

5. React 如何实现组件化: 一切都是以 JS 来创建的.

# 开发团队

- React 是由 FaceBook 前端官方团队进行维护和更新的;因此,React 的维护开发团队,技术实力比较雄厚;
- Vue: 第一版,主要是由作者 尤雨溪 专门进行维护的, 当 Vue 更新到 2.x 版本后,也有了一个以 尤雨溪 为主导的开源小团队,进行相关的开发和维护;

# 社区方面:

- 在社区方面, React 由于诞生的较早, 所以社区比较强大,一些常见的问题、坑、最优解决方案,文档、博客在社区中都是可以很方便就能找到的;
- Vue 最近几年才火起来,所以,它的社区相对于 React 来说要小一些,可能有的坑没人踩过

# 移动 App 开发体验方面

- Vue,结合 Weex 这门技术,提供了迁徙到 移动 App 开发的体验
- React,结合 ReactNative,也提供了无缝迁移到移动 App 的开发体验

# 为什么要学习 React

1. 和 Angular1 相比, React 设计很优秀, 一切基于 JS 并且实现了组件化开发的思想;
2. 开发团队实力强悍, 不必担心断更的情况
3. 社区强大, 很多问题都能找到对应的解决方案
4. 提供了无缝转到 ReactNative 上的开发体验,让我们技术能力得到了扩展,增加核心的竞争力
5. 很多企业在,前端项目的技术选型采用的是 React.js

# React 中的几个核心的概念呢

# 虚拟 DOM (Virtual Document Object Model)

- DOM 的本质是什么: 浏览器的概念, 用 JS 对象来表示页面上的元素, 并提供了操作 DOM 对象的 API;
- 什么是 React 中的虚拟 DOM: 用 JS 对象来模拟页面上的 DOM 和 DOM 嵌套
- 为什么要实现虚拟 DOM(虚拟 DOM 的母的): 为了实现页面中,DOM 元素的高效更细

普通的模板引擎渲染,当数据变换时,会重绘整个 DOM 页面,但经常的情况是: 页面中的数据,仅部分更细.因此整体重新渲染会带来性能损耗.因此急需一种方法来做到按需渲染

[本质]: 用js对象来模拟页面上DOM嵌套关系.
[目的]: 减少DOM渲染,提高页面元素的高效更新

# DOM 树的概念:

一个网页呈现的过程:

1. 浏览器请求服务器获取页面的 HTML 代码
2. 浏览器先在内存中,解析 DOM 结构,并在浏览器内存中,渲染出一棵 DOM 树
3. 浏览器把 DOM 树,呈现在页面上.

# 如何实现页面的按需更新:

获取新/旧两棵 DOM 进行对比,得到需要被按需更新的 DOM 元素.

# 如何获取 DOM 树

- 浏览器中,并无直接获取 DOM 树的 API;因此,我们无法拿到浏览器内存中的 DOM 树.
- 自己手动模拟新\旧两个 DOM 树

```html
<div id="myDiv" title="Marron" data-index="0">
	<p>栗子好好吃</p>
</div>

<script>
	// 模拟
	var div = {
		tagName: 'div',
		attrs: {
			id: 'myDiv',
			title: 'Marron',
			'data-index': '0'
		},
		childrens: [
			{
				tagName: 'p',
				attrs: {},
				childrens: ['栗子好好吃']
			}
		]
	};
</script>
```

# Diff 算法:

- tree diff: 新旧两棵 DOM 树,逐层对比的过程, 就是 Tree Diff, 当整棵 DOM 逐层对比完毕,则所有需要被按需的元素,必然能够找到
- component diff: 在进行 Tree Diff 的时候, 每一层中,组件级别的对比,叫做 Component Diff
  - 如果对比前后,组件的类型相同,则暂时认为此组件不需要被更新;
  - 如果对比前后,组件类型不同,则需要移除旧组件,创建新组件,并追加到页面上;
- element diff: 在进行组件对比的时候,如果两个组件类型相同,则需要进行元素级别的对比,这叫做 Element Diff

# 创建基本的 webpack4.x 项目
- 1.快速初始化一个项目: `npm init -y`
- 2.在项目根目录创建 `src`源代码目录和`dist`产品目录
- 3.在 src 目录下创建`index.html`
- 4.使用 cnpm 安装 webpack,运行`cnpm i webpack -D`
- 5.使用 cnpm 安装 webpack-cli,运行`cnpm i webpack-cli -D`

# `webpack`常见报错

`The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.`
- 原因是缺少`mode`
- 4.x中新增了`mode`. production属性,会默认对文件进行压缩.

`ERROR in Entry module not found: Error: Can not resolve './src' in 'D:\L-react\HeiMa\01.webpack-base'`
- 入口文件未找到,在 webpack 4.x 中,不需要配置入口文件, 采用约定大于配置原则. 默认的打包入口路径是 src -> index.js.

[注]: 采用约定大于配置的概念,目的是尽量减少配置文件的体积

- 默认约定了
- 打包入口文件 `./src/index.js`
- 打包的输出文件是 `./dist/main.js`

# 新建 webpack.config.js

- 向外暴露成员: `mopdule.exports` or `export default`

# 配置好模式和入口文件后

- 手动在最开始的页面中引入 js 文件

```html
<script src="../dist/main.js"></script>
```

# webpack-dev-server
- `cnpm i webpack-dev-server -D`
- 每次写完代码手动调用webpack去打包代码太麻烦,因此使用 webpack-dev-server来进行自动打包构建
- 使用 `webpack-dev-server`启动.
- `Project is running at http://localhost:8080`: 项目正在8080端口运行(此时是一个小型的服务器)
- `webpack output is served from /`: 托管的的路径是根路径. 在此项目中即: 01.webpack-base
- 通过webpack-dev-server打包生成的main.js为了提高性能,是放在内存中的.

[所做事情]
1. 保存时,自动打包生成一个main.js在内存中(注意,不是在磁盘)
2. `--open`: 自动打开浏览器
3. `--port 3000`: 指定端口
4. `--hot`: 热更新
5. `--progress`: 打包记录
6. `--compress`: 压缩
7. `--host 127.0.0.1`: 指定主机ip

# html-webpack-plugin
- `cnpm i html-webpack-plugin -D`
- 未配置html-webpack-plugin的主页是在磁盘上面的,磁盘的读取速度不如内存
- 使用
````javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'),   // 源文件
  filename: 'index.html'  // 生成在内存中首页的名称
})

module.exports = {
  mode： 'development',
  plugins: [
    htmlPlugin
  ]
}
````
[所做事情]:
1. 根据给定模板,在给定路径下生成内存中的主页
2. 会自动添加`<script type="text/javacript" src="main.js"></script>`
