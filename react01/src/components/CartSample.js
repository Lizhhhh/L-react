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
      msg: '',
      cart: []
    }
  }

  // 回调函数声明为箭头函数
  textChange = event => {
    this.setState({ msg: event.target.value })
  }

  // 添加商品
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

  // 添加到购物车
  addToCart = good => {
    // 创建新购物车
    const newCart = [...this.state.cart]
    const idx = newCart.findIndex(c => c.id === good.id)
    const item = newCart[idx]
    if (item) {
      newCart.splice(idx, 1, { ...item, count: item.count + 1 })
    } else {
      newCart.push({ ...good, count: 1 })
    }
    // 更新
    this.setState({ cart: newCart })
  }

  // 增加数量
  add = good => {
    // 增加购物车里面的数量
    const newCart = [...this.state.cart]
    const idx = newCart.findIndex(c => c.id === good.id)
    const item = newCart[idx]
    newCart.splice(idx, 1, { ...item, count: item.count + 1 })

    // 更新
    this.setState({ cart: newCart })
  }

  // 减少数量
  minus = good => {
    // 减少购物车里面的数量
    const newCart = [...this.state.cart]
    const idx = newCart.findIndex(c => c.id === good.id)
    const item = newCart[idx]
    newCart.splice(idx, 1, { ...item, count: item.count - 1 })

    // 更新
    this.setState({ cart: newCart })
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
            <li key={good.id}>
              {good.msg}
              <button onClick={() => this.addToCart(good)}>添加到购物车</button>
            </li>
          ))}
        </ul>

        {/* 购物车 */}
        <Cart data={this.state.cart} minus={this.minus} add={this.add} />
      </div>
    )
  }
}

function Cart({ data, minus, add }) {
  return (
    <table>
      <tbody>
        {data.map(d => (
          <tr key={d.msg}>
            <td>{d.msg}</td>
            <td>{d.price}</td>
            <td>
              <button onClick={() => minus(d)}>-</button>
              {d.count}
              <button onClick={() => add(d)}>+</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
