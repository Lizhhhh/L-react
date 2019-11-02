import React from 'react'
// Dialog作为容器不关心内容和逻辑
// 等同于vue中的slot
function Dialog(props) {
  return (
    <div style={{ border: `4px solid ${props.color || 'blue'}` }}>
      {props.children}
      <div className="footer">{props.footer}</div>
    </div>
  )
}

// WelcomeDialog通过复合提供内容
function WelcomeDialog(props) {
  return (
    <Dialog {...props}>
      <h1>欢迎光临</h1>
      <p>感谢使用react</p>
    </Dialog>
  )
}

const Api = {
  getUser() {
    return { name: 'jerry', age: 20 }
  }
}

function Fetcher(props) {
  const user = Api[props.name]()
  return props.children(user)
}

function Filter({ children ,type }) {
  return (
    <div>
      {React.Children.map(children, child => {
        if (child.type !== type) {
          return
        } else {
          return child
        }
      })}
    </div>
  )
}

export default function() {
  const footer = (
    <button onClick={() => console.log('确定!')}>相当于 -- 具名插槽</button>
  )
  return (
    <div>
      <WelcomeDialog color="red" footer={footer}></WelcomeDialog>

      <Fetcher name="getUser">
        {({ name, age }) => (
          <p>
            {name} - {age}
          </p>
        )}
      </Fetcher>

      {/* 解析出想要的标签 */}
      <Filter type="p">
        <h1>react</h1>
        <p>react很不错</p>
        <h1>Vue</h1>
        <p>vue很棒!</p>
      </Filter>

    </div>
  )
}
