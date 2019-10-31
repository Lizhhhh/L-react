import React, { Component } from 'react'

export class CartSample extends Component {
  // 状态的初始化一般放在构造器中
  constructor(props) {
    super(props)

    this.state = {
      goods: [
        { id: 1, msg: 'web全栈架构师' },
        { id: 2, msg: 'python全栈架构师' }
      ]
    }
  }

  render() {
    return (
      <div>
        {/* 条件渲染 */}
        {this.props.title && <h1>{this.props.title}</h1>}

        {/* 列表渲染 */}
        <ul>
          {this.state.goods.map(good => (
            <li key={good.id}>{good.msg}</li>
          ))}
        </ul>
      </div>
    )
  }
}
