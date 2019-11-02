import React, { Component } from 'react'

// 容器组件
export class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        comments: [
          { body: '奇怪的栗子', author: 'odd marron' },
          { body: '好吃的栗子', author: 'nice marron' }
        ]
      })
    }, 1000)
  }
  render() {
    return (
      <div>
        {this.state.comments.map((c, i) => (
          <Comment key={i} {...c} />
        ))}
      </div>
    )
  }
}
// 展示组件
const Comment = React.memo(props => {
  console.log('render comment');
  return (
    <div>
      <p>{props.body}</p>
      <p> --- {props.author}</p>
    </div>
  )
})

// class Comment extends React.PureComponent {
//   render() {
//     console.log('render comment');
//     return (
//       <div>
//         <p>{this.props.body}</p>
//         <p>--- {this.props.author}</p>
//       </div>
//     )
//   }
// }
