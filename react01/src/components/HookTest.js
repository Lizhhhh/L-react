import React, { useState, useEffect } from 'react'

export default function HookTest() {
  // useState(initState)
  const [count, setCount] = useState(0)

  // 副作用钩子会在每次渲染时都执行
  useEffect(() => {
    console.log('count依赖')
    document.title = `您点击了${count}次`
  }, [count])

  // 副作用的钩子,只打算执行一次,则传递的第二个参数为[]
  // componentDidMount
  useEffect(() => {
    console.log('api --- 调用')
  }, [])

  // 多个状态
  const [fruit, setFruit] = useState('banana')
  const [input, setInput] = useState('')
  const [fruits, setFruits] = useState(['apple', 'banana'])

  // 自定义钩子
  function useAge() {
    const [age, setAge] = useState(0)
    useEffect(() => {
      setTimeout(() => {
        setAge(20)
      }, 2000)
    })
    return age
  }

  const age = useAge();

  return (
    <div>
      <p>点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点击</button>

      <p>年龄: {age ? age : 'loading...'}</p>
      <p>选择的水果: {fruit}</p>
      <p>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          onClick={() => {
            setFruits([...fruits, input])
            setInput('')
          }}
        >
          新增水果
        </button>
      </p>
      <ul>
        {fruits.map(f => (
          <li key={f} onClick={() => setFruit(f)}>
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}
