import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Welcome1, Welcome2 } from './components/CompType'
import { Clock } from './components/Clock'
import { StateTest } from './components/StateTest'
import { CartSample } from './components/CartSample'
import { LifeCycle } from './components/LifeCycle'
import { AntdTest } from './components/AntdTest'
import { CommentList } from './components/CommentList'
import { Hoc } from './components/Hoc'
import Composition from './components/Composition'

class App extends Component {
  state = {
    prop: 'some prop'
  }
  componentDidMount() {
    this.timer1 = setTimeout(() => {
      this.setState({ prop: 'a new prop' })
    }, 2000)
    this.timer2 = setTimeout(() => {
      this.setState({ prop: '' })
    }, 3000)
  }
  formatName(user) {
    return user.firstName + ' ' + user.lastName
  }
  render() {
    const name = 'jerry'
    const user = { firstName: 'lz', lastName: 'hhh' }
    const jsx = <p> hello, jerry </p>

    return (
      <div>
        {' '}
        {/* 表达式 */} <h1> {name} </h1> <h1> {this.formatName(user)} </h1>
        {/* 属性 */} <img src={logo} alt="" style={{ width: '100px' }} />
        {/* jsx也是表达式 */} {jsx}
        {/* 使用其他组件 */} <Welcome1 name="lzhhhh"> </Welcome1>{' '}
        <Welcome2 name="odd marron"> </Welcome2> <Clock> </Clock>{' '}
        <StateTest> </StateTest>
        {/* 条件与循环 */} <CartSample title="奇怪的栗子"> </CartSample>
        {this.state.prop && <LifeCycle prop={this.state.prop}> </LifeCycle>}
        <AntdTest></AntdTest>
        <CommentList></CommentList>
        <Hoc></Hoc>
        <Composition></Composition>
      </div>
    )
  }
}
export default App
