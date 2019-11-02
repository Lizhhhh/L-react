import React, { Component } from 'react'

// 输出
const withLog = Comp => {
  console.log(Comp.name + '渲染了')
  return props => <Comp {...props}></Comp>
}

// const withMarron = Comp => {
//   // 获取name
//   const name = "高阶组件"
//   return props => <Comp {...props} name={name}> </Comp>
// }

// 改变生命周期
const withMarron = Comp => {
  // 获取name
  const name = '高阶组件'
  return class extends React.Component {
    componentDidMount() {
      console.log('do something')
    }
    render() {
      return <Comp {...this.props} name={name} />
    }
  }
}

@withLog
@withMarron
@withLog
class Marron extends Component {
  render() {
    return (
      <div>
        {this.props.stage} - {this.props.name}
      </div>
    )
  }
}

// const NewMarron = withMarron(withLog(Marron))

export class Hoc extends Component {
  render() {
    return (
      <div>
        <Marron stage="React"></Marron>
      </div>
    )
  }
}
