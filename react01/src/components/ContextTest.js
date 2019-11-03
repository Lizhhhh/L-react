import React, { useContext } from 'react'

// 1.创建上下文
const MyContext = React.createContext()
const { Provider, Consumer } = MyContext

function Child(prop) {
  return <div>Child: {prop.foo}</div>
}

function Child2(){
  const ctx = useContext(MyContext);
  return <div>
    <p>Child2: {ctx.foo}</p>
    <p>使用ctx消费</p>
  </div>
}

class Child3 extends  React.Component{
  static contextType = MyContext;
  render(){
    return <div>
      Child3:  {this.context.foo}
    </div>
  }
}

export default function ContextTest() {
  return (
    <div>
      <Provider value={{ foo: 'bar' }}>
        <Consumer>{value => <Child {...value} />}</Consumer>
        <Child2></Child2>
        <Child3></Child3>
      </Provider>
    </div>
  )
}
