# 学习目标: 熟悉React常用语法及与之相关的概念

# JSX
````
ReactDOM.render(<APP />, document.querySelector('#root'));
````
  - 看起来是js和html的混合体,被称之为jsx,实际核心的逻辑完全是js实现的

# 函数方式定义组件
````
export function Welcome1() {
  return <div>Welcome1</div>
}
````

# 类方式定义组件
````
export class Welcome2 extends React.Component {
  render() {
    return <div>Welcome2</div>
  }
}
````

# State和setState
  - 在app组件里,我们可以通过{}在jsx中渲染变量
````
import React from 'react'

class MarronCart extends React.Component{
  render(){
    const name = '奇怪的栗子'
    return <div>
    <button>{name}</button>
    </div>
  }
}

export default MarronCart
````

# 双向绑定的实现
  - /src/components/CartSample.js
````
import React, { Component } from 'react'

export class CartSample extends Component {
  // 状态的初始化一般放在构造器中
  constructor(props) {
    super(props)

    this.state = {
      goods: [
        { id: 1, msg: 'web全栈架构师' },
        { id: 2, msg: 'python全栈架构师' }
      ],
      msg: ''
    }
  }

  // 回调函数声明为箭头函数
  textChange = event => {
    this.setState({ msg: event.target.value })
  }

  addGood = () => {
    this.setState(prevState => {
      return {
        goods: [
          ...prevState.goods,
          {
            id: prevState.goods.length + 1,
            msg: prevState.msg
          }
        ]
      }
    })
  }

  render() {
    return (
      <div>
        {/* 条件渲染 */}
        {this.props.title && <h1>{this.props.title}</h1>}

        {/* 列表渲染 */}
        <div>
          <input
            type="text"
            value={this.state.msg}
            onChange={this.textChange}
          />
          <button onClick={this.addGood}>添加</button>
        </div>
        <ul>
          {this.state.goods.map(good => (
            <li key={good.id}>{good.msg}</li>
          ))}
          <li>{this.state.msg}</li>
        </ul>
      </div>
    )
  }
}
````

# 父组件引用子组件方法
  - 例如有子组件Welcome
  - /src/components/CompType.js
````
import React,{Component} from 'react'

export class Welcome extends Component{
  render() {
    return <div>Welcome,{this.props.name}</div>
  }
}
````
  - 在父组件(App.js)中调用
  - /src/App.js
````
import React, { Component } from 'react'
import { Welcome } from './components/CompType.js'

class App extends Component {
  render() {
    return(
      <div>
        <Welcome name="奇怪的栗子">
      </div>
    )
  }
}
````

# 生命周期 (16.0之前)
  - 开始 -> static defaultProps ={} static propTypes={}
         -> constructor(){
                super();
                this.state={}
            }
         -> componentWilllMount()
         -> render()
         -> componentDidMount()
  - src/components/LifeCycle.js
````
import React, { Component } from 'react'

export default class Lifecycle extends Component {
  constructor(props) {
    super(props);
    // 常用于初始化状态(状态初始化、属性初始化)
    console.log("1.组件构建函数执行");
  }
  componentWillMount(){
    // 此时可用访问状态和属性,可进行api调用等
    console.log("2.组件将要挂载");
  }
  componentDidMount(){
    // 组件已挂载,可用进行状态更新操作
    console.log("3.组件已挂载");
  }
  componentWillReceiveProps(){
    // 父组件传递的属性有变化,做相应相应
    console.log("4.将要接收属性传递");
  }
  shouldComponentUpdate(){
    // 组件是否需要更新,需要返回布尔值结构,优化点
    console.log("5.组件是否需要更新?");
    return true;
  }
  componentWillUpdate(){
    // 组件将要更新,可做更新统计
    console.log("6.组件将要更新");
  }
  componentDidUpdate(){
    // 组件更新
    console.log("7.组件已更新")
  }
  componentWillUnmount(){
    // 组件将要卸载,可做清理工作
    console.log("8.组件将要卸载");
  }
  render(){
    console.log("x.组件渲染");
    return <div>生命周期探究</div>
  }
}
````
# 生命周期 (Fiber出来之后、React v16推出之后)
  - 移出部分状态
    + componentWillMount
    + componentWillReceiveProps
    + componentWillUpdate
    + componentWillUnmount
  - 新增getSnapshotBeforeUpdate
  - 用法如下
````
getSnapshotBeforeUpdate(prevProps, prevState){
  // 我们是否要添加新的items到列表?
  // 捕捉滚动位置,以便我们可用稍后调整滚动
  if(prevProps.list.length < this.props.list.length ){
    const list = this.listRef.current;
    return list.scrollHeight - list.scrollTop;
  }
  return null;
}

componentDidUpdate(prevProps, prevState, snapshot) {
  // 如果我们有snapshot值,我们已经添加了新的items.
  // 调整滚动以至于这些新的items不会将旧items推出视图
  // (这边的snapshot是getSnapshotBeforeUpdate方法的返回值)
  if(snapshot !== null ){
    const list = this.listRef.current;
    list.scrollTop = list.scrollHeight - snapshot;
  }
}
render() {
  return (
    <div ref={this.listRef}>
  );
}
````
  - 新增componentDidCatch(error, info)
  - /src/compoents/ErrorBoundary.js
````
import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info){
    // console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong. </h1>;
    }

    return this.props.children;
  }
}
````

# React 和 ReactDom
  - React逻辑控制,最终会生成虚拟DOM -> React.createElement()
  - ReactDom是DOM渲染器.渲染出来的是DOM最终可用在浏览器运行
  - 如果使用RN那么最终渲染出来的可用在移动端运行.

# JSX
  - 对JS进行扩展,在JS中编写UI,使用不同的渲染器,渲染成不同的结果
  - 常见语法:
    + 表达式: {expr}
    + 属性: <div id={expr}> </div>
    + jsx也是表达式: <p>{jsx}</p>

# 组件
  - 两种写法:
    1. 函数式:
````
function Comp(props){
  return (...)
}
````
    2. 类的写法
````
class Comp extends Reac.Component {
  render() {
    return (...)
  }
}
````

# 属性
````
<Comp name="" style={{...}} />>
````

# 状态
````
class Comp{
  state ={}

  componentDidMount(){
    // 注意是批量异步的
    this.setState(
      {
        prop:val
      }
    )
  }
}
````

# 条件和循环
````
// 三元表达式写法
{this.state.isLogin ? <p>{userInfo.name}</p>:登录}

// 短路写法
{this.state.message && <p>{this.state.message}</p>}

// 循环
{this.state.list.map(u=><li>{u.name}</li>)}
````

# 事件
````
// 注意: 此处应该写为箭头函数,将作用域绑定为当前词法作用域
onChange = () =>{

}
<input onChange={this.onChange} />

// 采用以下写法,将当前作用域保存起来
// 这种写法可用来传递参数
<input onChange={()=>this.onChange()} />
````

# 通信
````
<Comp title={} onSubmit={this.onSubmit}>
````

# 使用ant-design组件库
  - 安装: npm install antd --save
  - 使用button
````
import React, { Component } from 'react';
import Button from 'antd/lib/button';
import 'antd/dist/antd.css'

class App extends Compoent {
  render() {
    return(
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    )
  }
}

export default App
````

# 配置按需加载
  - 1. 安装 react-app-rewired取代 react-scripts, 可以扩展webapack 的配置, 类似vue.config.js
  - npm install react-app-rewired@2.0.2-next.0 babel-plugin-import --save
  - /config-overrides.js
````
const { injectBabelPlugin } = require('react-app-rewired');
module.exports = function override(config, env) {
  config = injectBabelPlugin(   // 在默认配置基础上注入
    // 插件名, 插件配置
    ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
    config
  );
  return config;
}
````
  - 2. 改启动脚本
  - /package.json
  - 将"scripts"中的 react-scripts 全部改为 react-app-rewired
````
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
````
  - 3. 使用按需导入
````
// import Button from 'antd/lib/button'
// import 'antd/dist/antd.css'
import { Button } from 'antd'
````

# 容器组件 VS 展示组件
  - 基本原则: 容器组件负责数据获取, 展示组件负责根据props显示信息
  - 优势
    1. 如何工作和如何展示分离
    2. 重用性高
    3. 更高的可用性
    4. 更易于测试
````
import React, { Component } from 'react';

// 容器组件
export class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  componentDidMount() {
    setTimeout(() =>{
      this.setState({
        comments: [
          { body: "react is very good" , author: "facebook" },
          { body: "vue is very good", author: "youyuxi" }
        ]
      });
    }, 1000)
  }
  render() {
    return (
      <div>
      {this.state.comments.map((c,i) => (
        <Comment key={i} data={c} />
      ))}
      </div>
    );
  }
}
// 展示组件
function Comment({ data }) {
  return (
    <div>
      <p>{data.body}</p>
      <p> --- {data.author}</p>
    </div>
  )
}
````

# 将函数组件转换成类的组件
  - 函数
````
function Comment({ data }) {
  return (
    <div>
      <p> {data.body} </p>
      <p> --- {data.author} </p>
    </div>
  )
}
````
  - 组件
````
class Comment extends React.Component{
  render() {
    return (
      <div>
        <p> {this.props.data.body} </p>
        <p> --- {this.props.data.author} </p>
      </div>
    );
  }
}
````

# render频繁调用耗费资源解决方案
  - React 15.3之前(无PureComponent)
  - 使用shouldComponentUpdate
````
class Comment extends React.Component{

  shouldComponentUpdate(nextProps) {
    if(nextProps.data.body === this.props.data.body &&
      nextProps.data.author === this.props.data.author) {
        return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <p> {data.body} </p>
        <p> --- {data.author} </p>
      </div>
    );
  }
}
````
  - PureComponent解决方案
````
class Comment extends React.PureComponent{

}
````

# PureComponent源码
````
import shallowEqual from './shallowEqual'
import Component from './Component'

export default function PureComponent(props, context) {
  Component.call(this, props, context);
}

PureComponent.prototype = Object.create(Component.prototype);
PureComponent.prototype.constructor = PureComponent
PureComponent.prototype.isPureReactComponent = true
PureComponent.prototype.shouldComponentUpdate = shallowCompare

function shallowCompare (nextProps, nextState) {
  return !shallowEqual(this.props, nextProps) ||
          !shallowEqual(this.state, nextState)
}

export default function shallowEqual(objA, objB) {
  // 比较引用地址
  if(objA === objB){
    return true
  }

  // 只检查了一层
  if(typeof objA !== 'object' || objA === null || typeof objB !== 'objB' || objB === null) {
    return false
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length ){
    return false
  }

  // Test for A`s keys different from B.
  for (var i = 0; i< keysA.length; i++) {
    if (!objB.hasOwnproperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]] ){
      return false
    }
  }
  return true
}
````
  - 根据源码可知,PureComponent只对基本数据类型的数据和数据只有一层的生效.
  - 对上面代码修改后如下
````
import React, { Component } from 'react';

// 容器组件
export class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  componentDidMount() {
    setTimeout(() =>{
      this.setState({
        comments: [
          { body: "奇怪的栗子" , author: "odd marron" },
          { body: "好吃的栗子", author: "nice marron" }
        ]
      });
    }, 1000)
  }
  render() {
    return (
      <div>
      {this.state.comments.map((c,i) => (
        <Comment key={i} {...c} />
      ))}
      </div>
    );
  }
}
// 展示组件
class Comment extends React.PureComponent{
  render() {
    console.log('render comment');

    return (
      <div>
        <p>{this.props.data.body}</p>
        <p>--- {this.props.data.author}</p>
      </div>
    )
  }
}
````

# React.memo
  - 在React v16.6.0之后的版本,可以使用一个新功能React.demo来完美实现React组件,让函数式的组件也有了PureComponent
````
const Joke = React.memo(() => (
  <div>
    {this.props.value || 'loading...' }
  </div>
));
````
  - 更改上面Comment
````
const Comment = React.memo((props) => {
  console.log('render comment');
  return (
    <div>
      <p>{props.body}</p>
      <p> --- {props.author}</p>
    </div>
  )
});
````

# 高阶组件
  - 提高组件复用率,首先想到的就是抽离相同的逻辑,在React里面就有了HOC(Higher-Order Components)的概念
  - 高阶组件也是一个函数,但是他返回另外一个组件,产生新的组件可以对属性进行包装,也可以重写部分生命周期钩子
````
const withMarron = (Component) => {
  const NewComponent = (props) => {
    return <Component {...props} name='奇怪的高阶组件' />;
  };
  return NewComponent;
}
````
  - 上面withMarron组件,代理了Component,只是多传递了一个name参数
  - 体验
  - /src/components/Hoc.js
````
import React, { Component } from 'react'

function Marron(props) {
  return (
    <div>
      {props.stage}-{props.name}
    </div>
  )
}

const withMarron = Comp => {
  // 获取name
  const name = "高阶组件"
  return props => <Comp {...props} name={name}> </Comp>
}

const NewMarron = withMarron(Marron);

export class Hoc extends Component {
  render() {
    return (
      <div>
        <NewMarron stage="React"></NewMarron>
      </div>
    )
  }
}
````

# 高阶函数修饰器写法
  - 链式写法的逻辑是比较绕的,ES7中有一个优秀的语法 -> 修饰器
  - 安装: npm install --save-dev babel-plugin-transform-decorators-legacy
  - 语法:
````
const { injectBabelPlugin } = require('react-app-rewird');

module.exports = function override(config) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    config
  )

  config = injectBabelPlugin(
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    config
  )

  return config
}
````

# 组件复合
  - 复合组件给予你足够的灵活去定义组件的外观和行为,而且是以一种明确和安全的方式进行.
  - 如果组件间有公用的非UI逻辑,将它们抽取为JS模块导入使用而不是继承它
  - /src/components/Composition.js
````
// Dialog作为容器不关心内容和逻辑
function Dialog(props){
  return <div style={{ border: "4px solid blue" }}>{props.children}</div>
}

// WelcomeDialog通过复合提供内容
function WelcomDialog() {
  return (
    <Dialog>
      <h1>欢迎光临</h1>
      <p>感谢使用react</p>
    </Dialog>
  )
}

export default function (){
  return <WelcomDialog></WelcomDialog>
}
````

# 解析出想要的标签
````
<Filter type="p">
  <h1>react</h1>
  <p>react很不错</p>
  <h1>Vue</h1>
  <p>vue很棒!</p>
</Filter>

function Filter({ children ,type }) {
  return (
    <div>
      {React.Children.map(children, child => {
        if (child.type !== type) {
          return
        } else {
          return child
        }
      })}
    </div>
  )
}
````

# Hook
  - 是React16.8一个新增项,它可以让你在不编写class的情况下使用state以及其他的React特性
  - 特点:
    1. 无需修改组件结构的情况下复用状态逻辑
    2. 将组件相互关联的部分拆分成更小的函数,复杂组件将变得更容易理解
    3. 更简洁、更易理解的代码
# 使用Hook的栗子
````
import React, { useState } from 'react'

export default function HookTest() {
  // useState(initState)
  const [count, setCount] = useState(0)

  // 多个状态
  const [age] = useState(20)
  const [fruit, setFruit] = useState('banana')
  const [input, setInput] = useState('')
  const [fruits, setFruits] = useState(['apple', 'banana'])

  return (
    <div>
      <p>点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点击</button>

      <p>年龄: {age}</p>
      <p>选择的水果: {fruit}</p>
      <p>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={()=>{setFruits([...fruits, input]);setInput('')}}>新增水果</button>
      </p>
      <ul>
        {fruits.map(f => (
          <li key={f} onClick={() => setFruit(f)}>{f}</li>
        ))}
      </ul>
    </div>
  )
}
````

# 副作用钩子 - Effect Hook
  - useEffect就是一个Effect Hook,给函数组件增加了操作副作用的能力.
  - 它跟class组件中的componentDidMount、componentDidUpdate和componentwillUnmount具有相同作用(只不过是合并了)
  - 栗子: 更新 HooksTest.js
````javascript
import React, {useState, useEffect } from 'react';
useEffect(() => {
  // Update the document title using the browser API
  document.title = `您点击了 ${count}次`
})

// 监听count的变化
useEffect(() => {
  console.log('count依赖');
  document.title = `您点击了${count}次`
},[count]);
// 此时只有count发生改变时才触发这个副作用钩子
````
  - 注:
    1. 相当于是观察数据,当观察的数据发生变化时执行
    2. 第二个参数用于收集观察的数据

# 自定义钩子 - Custom Hook
  - 自定义Hook是一个函数,其名称以"use"开头,函数内部可以调用其他的Hook.
````javascript
function useAge() {
  const [age, setAge] = useState(0);
  useEffect(() => {
    setTimeout(() =>{
      setAge(20)
    }, 2000)
  });
  return age;
}

// 使用
const age = useAge();
<p>年龄 {age? age: 'loading...' }</p>
````

# 组件跨层级通信 - Context
  - 上下文提供一种不需要每层设置props就能跨多级组件传递数据的方式
  - Context相关API
    + React.createContext
    + Context.Provider
    + Class.contextType
    + Context.Consumer

# 基本用法
  - Provider提供值
  - Consumer来消费传递的值
````javascript
import React from 'react';

// 创建一个上下文
const Mycontext = React.createContext();
const { Provider, Consumer } = MyContext;

function Child(prop) {
  return <div>Child: {prop.foo} </div>
}

export default function ContextTest() {
  return (
    <div>
      <Provider value ={ {foo: 'bar'} }>
        <Consumer>
          {value => <Child {...child} />}
        </Consumer>
      </Provider>
    </div>
  )
}
````
  - 使用hook来消费
````javascript
import React, {useContext} from 'react';
const { Provider } = MyContext;

const MyContext = React.createContext();

// 使用hook消费
function Child2(prop) {
  const ctx = useContext(MyContext);
  return <div>Child2: {ctx.foo} </div>
}

export default function ContextTest() {
  return (
    <div>
      <Provider value={{foo: 'bar'}}>
       <Child2></Child2>
      </Provider>
    </div>
  )
}
````
  - 使用class指定静态contextType
````javascript
import React from 'react'
const MyContext = React.createContext();

class Child3 extends React.Component{
  static contextType = MyContext;
  render(){
    return <div>
      Child3: {this.context.foo}
    </div>
  }
}
````

# 使用antd自定义一个登录组件
  - 1. 初始化.
    + 使用input和button
    + 该组件使用类的方式声明
````javascript
import React from 'react'
import { Input, Button } from 'antd'

export default class LForm extends React.Componet {
  render() {
    return (
      <div>
        <Input></Input>
        <Button></Button>
      </div>
    )
  }
}
````
  - 2. 扩展其功能
````
import React from 'react'
import { Input, Button } from 'antd'

// 创建一个高阶组件: 扩展现有表单(事件处理、数据收集、校验)
function LFormCreate(Comp) {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.options = {}
      this.state = {}
    }

    handleChange = e => {
      const { name, value } = e.target
      console.log(name, value)
      this.setState({ [name]: value }, () => {
        // 确保值发生变化在校验
        this.validateField(name)
      })
    }

    validateField = field => {
      // 1. 获取校验规则
      const rules = this.options[field].rules

      // 任意一项失败,返回false
      const ret = !rules.some(rule => {
        if (rule.required) {
          if (!this.state[field]) {
            // 校验失败
            this.setState({
              [field + 'Message']: rule.message
            })
            return true
          }
        }
      })
      if (ret) {
        this.setState({
          [field + 'Message']: ''
        })
      }
      return ret
    }

    // 校验所有字段
    validate = cb => {
      const rets = Object.keys(this.options).map(field =>
        this.validateField(field)
      )

      const ret = rets.every(v => v === true)
      cb(ret, this.state);
    }

    // 创建input包装器
    getFileDec = (field, option) => {
      // 保存当前输入项的配置
      this.options[field] = option

      return InputComp => (
        <div>
          {React.cloneElement(InputComp, {
            name: field,
            value: this.state[field] || '',
            onChange: this.handleChange
          })}

          {/* 校验错误信息 */}
          {this.state[field + 'Message'] && (
            <p style={{color:'red'}}>{this.state[field + 'Message']}</p>
          )}
        </div>
      )
    }

    render() {
      return <Comp getFileDec={this.getFileDec} validate={this.validate} />
    }
  }
}

@LFormCreate
class LForm extends React.Component {
  onSubmit = () => {
    console.log('submit')
    // 校验所有项
    this.props.validate((isValid, data) => {
      if (isValid) {
        // 提交登录
        console.log('登录: ', data)
        // 后续的登录逻辑
      } else {
        alert('校验失败')
      }
    })
  }

  render() {
    const { getFileDec } = this.props
    return (
      <div>
        {getFileDec('uname', {
          rules: [{ required: true, message: '用户名必填' }]
        })(<Input />)}

        {getFileDec('pwd', {
          rules: [{ required: true, message: '密码不能为空' }]
        })(<Input type="password" />)}
        <Button onClick={this.onSubmit}>登录</Button>
      </div>
    )
  }
}

export default LForm
````

