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
