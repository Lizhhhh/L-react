import React, { Component } from 'react'

export class Clock extends Component {
  // state是固定写法,不要改变
  state = {
    date: new Date()
  }

  // componentDidMount固定写法
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1 * 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    return <div>{this.state.date.toLocaleTimeString()}</div>
  }
}
