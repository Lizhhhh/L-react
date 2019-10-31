import React, { Component } from 'react'

export class StateTest extends Component {
  state = {
    counter: 1
  }

  componentDidMount() {
    // 1. 不要直接修改状态值(不会生效)
    // this.state.counter += 1

    // 2.使用setState才能生效
    // this.timer = setInterval(() => {
    //   this.setState({ counter: this.state.counter + 1 })
    // }, 1 * 1000)

    // 3.函数式实现
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }))
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return <div>{this.state.counter}</div>
  }
}
