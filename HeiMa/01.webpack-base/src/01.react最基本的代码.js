// 1. 这两个导入时候,接收的成员名称,必须这么写
import React from 'react' // 创建组件、虚拟DOM元素、生命周期
import ReactDOM from 'react-dom' // 把创建好的组件和虚拟DOM放到页面上展示


// 2. 创建虚拟DOM元素
// 此时创建的dom在内存中
const myh1 = React.createElement('h1', { title: '啊,糖炒栗子', id: 'myh1' }, '真好吃');

const mydiv = React.createElement('div', null, '这是一个div元素', myh1);

// 容器
const $r = document.getElementById('app');
// 将内存中的dom渲染到页面上
ReactDOM.render(mydiv, $r);