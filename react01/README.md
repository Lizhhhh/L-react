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