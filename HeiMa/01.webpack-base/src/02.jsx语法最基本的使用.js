// 1. 导入包
import React from 'react'
import ReactDOM from 'react-dom'

// 2. 创建虚拟DOM元素
// 虚拟DOM: 用JS对象的形式,来表示DOM和DOM之间的嵌套关系
// const mydiv = React.createElement('div', {id: 'mydiv', title:'div aaa'}, '这是一个div元素');

const mydiv =
<div id="mydiv" title="div aaa">
  这是一个div元素
  <h1>Hi, Marron</h1>
</div>



// 3. 调用render元素
ReactDOM.render(mydiv, document.getElementById('app'));
