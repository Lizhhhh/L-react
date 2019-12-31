import React from 'react';
import ReactDOM from 'react-dom';


// 导入 Hello 组件

// 注意: 这里的 @ 符合,表示项目根目录中的 src 这一层目录
import Hello from '@/components/Hello'

const dog = {
	name: '大黄',
	age: 3
};
const cat = {
	name: '小猫',
	age: 1
};

ReactDOM.render(
	<div>
		123
		<Hello {...dog}></Hello>
		<Hello {...cat}></Hello>
	</div>,
	document.getElementById('app')
);

const o2 = {
	age: 22,
	address: '中国北京',
	phone: '139999'
};

const o1 = {
  name: 'zs',
  ...o2
};
