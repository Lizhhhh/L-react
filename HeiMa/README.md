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

# 在项目中使用react
1. 运行`cnpm i react react-dom -S` 安装包
  - react: 专门用于创建组件和虚拟DOM,同时组件的生命周期都在这个包中
  - react-dom: 专门进行DOM操作的,最主要的应用场景, 就是ReactDOM.render() [ps]: 通过react包创建的dom是在内存中的.因此需要react-dom来获得内存中的DOM
  - `-S`: 代表项目从开发到上线都要用到的包
  - `-D`: 开发时用到的工具
2. 在index.html页面中,创建容器:
````html
<!-- 容器,将来使用 React 创建的虚拟DOM元素,都会被渲染到这个指定的容器中 -->
<div id="app"></div>
````
3. 导入包:
````javascript
import React from 'react'
import ReactDOM from 'react-dom'
````
4. 创建虚拟DOM元素:
````javascript
const myh1 = React.createElement('h1', { title:'啊,栗子', id: 'myh1'}, '糖炒栗子')
````
5. 渲染:
````javascript
ReactDOM.render(myh1, document.getElementById('app'));
````

# 使用模板字符串
1. 对于复杂的UI结构来说,使用React.createElement创建虚拟DOM的写法会很复杂.
2. HTML是最优秀的标记语言.
3. 联想到,手写标签的形式来创建虚拟DOM.
如果直接采用下面的形式来书写,会报错:
[书写]: `const mydiv = <div id="mydiv" title="div aaa">这是一个div元素</div>`
[报错]: `You may need an appropriate loader to handle this file type`
[原因]: 在js文件中,默认不能写类似于HTML的标记,否则打包会失败.
[解决办法]: 可以使用各种包来转换这些JS中的标签.

# JAX语法:
- 在JS中,混合写入类似于HTML的语法,符合XML规范的JS
- JSX语法的本质,还是在运行的时候,被转码器转换成 React.createElement 形式来执行
[面试]: JSX是直接在页面中渲染的嘛? 不,会先经过转码器转换成 React.createElement形式来执行

# 使用Babel来将JSX转化成可以在浏览器上运行的DOM
1. 如何启用jsx语法?
  - 安装`babel`插件
    - 运行 `cnpm i babel-core babel-loader babel-plugin-transform-runtime -D`
    - 运行 `cnpm i babel-preset-env babel-preset-stage-0 -D`
  - 安装能够识别jsx语法的包 `babel-preset-react`
    - 运行 `cnpm i babel-preset-react -D`
  - 在`webpack.config.js`中添加匹配规则.
    - 在webpack中,默认只能打包处理`.js`后缀名类型的文件
    - 像 `.png、.vue` 无法主动处理
    - 所以要配置第三方的loader
  ````javascript
  // webpack.config.js
  module:{
    rules:[
      { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  }
  ````
  [注]: webpack在遇见处理不了的代码,会第一时间去webpack.config.js中的module中寻找匹配规则.
  - 添加 `.babelrc` 配置文件
  ````javascript
  {
    "presets": ["env", "stage-0", "react"],
    "plugins": ["transform-runtime"]
  }
  ````
# jsx语法的本质:
- 并不是直接把jsx渲染到页面上,而是内部先转换成了createElement形式,再渲染的;
- 在jsx中混合写入js表达式: 在jsx语法中, 要把JS代码写到 `{}`中:
  - 渲染数字
  - 渲染字符串
  - 渲染布尔值
  - 为属性绑定值
  - 渲染jsx元素
  - 渲染jsx元素数组: `Warning: Each child in a list should have a unique "key" props`
  - 将普通字符串数组转为jsx数组并渲染到页面上
    1. 第一种方案
    ````javascript
    const arrStr = ['毛利','柯南','小兰','灰原哀'];
    const nameArr = [];
    arrStr.forEach(item =>{
      const temp = <h5>{item}</h5>;
      nameArr.push(temp);
    });
    ````
    2. 第二种方案(数组的map方法)
    - map和forEach类似,但是map需要写返回值
    - 直接写在jsx中
    ````javascript
    const arrStr = ['毛利', '柯南', '小兰', '灰原哀'];

    {arrStr.map(item => <h5>item</h5>)}
    ````
# 渲染数组时,不带key的后果
- 注: vue和react的循环key中.
- DOM元素不会跟着数据一起改变

[注]:
1. 为jsx中的元素添加class类名: 需要使用className来替代class; htmlFor替换label的for属性
2. 在JSX创建DOM的时候,所以的节点,必须有唯一的根元素进行包裹

# 第1种 - 创建组件的方式
- 创建组件
````javascript
// 创建了一个Hello组件,以标签形式丢到页面上即可
function Hello (){
  // return null;
  return <div>Hello 组件</div>
}

ReactDOM.render(
  <div> 123 </div>
  <Hello></Hello>
, document.getElementById('app'))
````
[报错]:
  - `Nothing was returned from react-dom.development.js:15641 render. This usually means a return statement is missing. Or, to render nothing, return null`: 组件必须return一个合法的jsx虚拟DOM元素
  - `Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>' `: 组件传入的值是只读的无法修改.
  - `The tag <hello> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.`: 自定义组件的首字母应为大写字母.

- 为组件传递数据:
````javascript
// 使用组件,并用组件传递props数组
const dog = {
  name:'大黄',
  age: 3
}
<Hello name={dog.name} age={dog.age}></Hello>
// 在构造函数中接收外界传递过来的数据(props:形参)
function Hello(props){
  // props.name = 'zs';
  console.log(props);
  // 结论: 不论是 Vue 还是 React, 组件中的 props 永远都是只读的; 不能被重新赋值;
  return <div>这是 Hello 组件 --- {props.name} --- {props.age}</div>
}
````


# 使用展开运算符进行对象的赋值
- 首先看常规的赋值
````javascript
const o2 = {
  age:22,
  address:'中国北京',
  phone: '139999'
}
const o1 = {
  name: 'zs',
  age: o2.age,
  address: o2.address,
  phone: o2.phone,
}
````
- 使用展开运算符进行运算
````javascript
const o2 = {
  age:22,
  address:'中国北京',
  phone:'139999'
}
const o1 = {
  name:'zs',
  ...o2
}
````

# 将组件抽离为单独的.jsx文件
1. 新建 Hello.jsx 文件. (确保webpack.config.js中配置了 jsx 的匹配规则)
2. 将组件导出的2种方式
````javascript
export default function Hello(props) {
	// 如果在一个组件中return null,则表示此组件什么都不渲染.是空的.
	return (
		<h1>
			这是一个动物园 -> 姓名:{props.name} - 年龄:{props.age}
		</h1>
	);
}

// // 把组件暴露出去
// export default Hello
````
[报错]:
  - `Uncaught Error: Cannot find module "./components/Hello"`: 找不到模块,默认情况下后缀名不能省略
  - `Uncaught ReferenceError: React is not defined`: 在组件 Hello.jsx 中并未导入 React

# 配置webpack从而在导入组件的时候,省略.jsx后缀名
- 修改`webpack.config.js`配置文件:
````javascript
// 与mode平级
resolve: {
  extensions: ['.js', '.jsx', '.json']
}
````

# 配置webpack,设置根目录
- 修改`webpack.config.js`配置文件
````javascript
// 与mode平级
const path = require('path');
resolve: {
  alias: {
    '@': path.join(__dirname, './src')
  }
}
````

# 第2种 - 创建组件的方式
- 使用class关键字来创建组件
- ES6中class关键字,是实现面向对象编程的新形式
[代码说明]:
- `const p1 = new Person('王多多', 18)`:
  1. 在内存中申请一个堆空间
  2. 将 `name='王多多', age='18'` 数据放入内存中
  3. 将内存空间的引用给p1
- 实例属性: 通过 new 出来的实例,访问到的属性, 叫做[实例属性]; 在class内部,在constructor(){}中this赋值的属性
- 静态属性: 通过构造函数直接访问到的属性,叫做[静态属性]; 在class内部,通过static修饰的属性,就是静态属性
- 静态属性和实例属性的区别: 静态属性是通过给构造函数的属性赋值得到的, 实例属性是通过给new之后的实例属性赋值得到的.

[创建]:
1. 最基本的组件结构:
````javascript
// 如果要使用 class 定义组件,必须让自己的组件,继承子 React.Component
class 组件名称 extends React.Component {
  // 在组件内部,必须有render函数
  render() {
    // render函数中,必须返回合法的 JSX 虚拟DOM结构
    return <div> 这是 class 创建的组件 </div>
  }
}
````
[注意]:
1. 传递给组件的参数,可以直接使用 `this.props`
2. 数据写在 `this.state` 中


# 了解ES6中class关键字的使用
1. class中constructor的基本使用
2. 实例属性和实例方法
3. 静态属性和静态方法
4. 使用extends 关键字实现继承

[问题]:
1. 继承了什么? 实例属性和方法,静态属性和方法并未继承.
2. 父类可以理解为原型对象.
3. `A extends B`等同于 `A.prototype = new B()`
4. 为什么在constructor中调用super? 因为,如果一个子类通过extends关键字继承了父类,那么在子类的constructor构造函数中必须优先调用一次super(),这是语法规范.
5. super是什么? super是一个函数,而且是父类的构造器. 子类中的super其实是父类中constructor构造器的引用.

[报错]:
1. `missing super() call in constructor`: 在构造器中,忘记调用 super() 方法
2. `'this' is not allowed before super()`: super()方法一定要在this使用之前调用.

# 两种创建组件方式的对比:
注意: 使用 class 关键字创建的组件,有自己的私有数据和生命周期函数; 但是使用 function 创建的组件,只有props, 没有自己私有数据和生命周期函数;
1. 用构造函数创建出来的组件：叫做"无状态组件"[无状态组件今后用的不多]
2. 用 class 关键字创建出来的组件: 叫做"有状态组件(this.state)"
3. 什么情况下使用有状态组件? 什么情况下使用无状态组件?
  - 如果一个组件需要有自己的私有数据,则推荐使用 class 创建的有状态组件;
  - 如果一个组件不需要私有数据,则推荐使用: 无状态组件;
  - React官方说: 无状态组件, 由于没有自己的state和生命周期函数,所以运行效率回避有状态组件稍微高一些.
4. 组件中的 `props` 和 `state/data`之间的区别:
  - `props`中的数据,都是外界传递过来的;
  - `state/data`中的数据,都是组件私有的; (通过Ajax获取回来的数据, 一般都是私有数据);
  - `props`数据都是只读的,不能重新赋值
  - `state/data`中的数据,都是可读可写的

[ps]: 有状态组件和无状态组件之间的本质区别就是: 有无state属性和有无生命周期函数.


