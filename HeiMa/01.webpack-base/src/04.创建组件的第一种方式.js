import React from 'react';
import ReactDOM from 'react-dom';

function Hello(props) {
	// 如果在一个组件中return null,则表示此组件什么都不渲染.是空的.
	return (
		<h1>
			这是一个动物园 -> 姓名:{props.name} - 年龄:{props.age}
		</h1>
	);
}

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
