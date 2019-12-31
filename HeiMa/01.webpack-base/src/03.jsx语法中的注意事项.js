import React from 'react';
import ReactDOM from 'react-dom';

let a = 10;
let str = '你好,中国';
let boo = false;
let title = '999';
const h1 = <h1>红红火火恍恍惚惚</h1>;
const arr = [<h2>这是h2</h2>, <h3>这是h3</h3>];
const arrStr = ['毛利', '柯南', '小兰', '灰原哀'];

//  定义一个空数组,将来用来存放名称标签
const nameArr = [];
arrStr.forEach(item => {
	const temp = <h5 key={item}>{item}</h5>;
	nameArr.push(temp);
});

ReactDOM.render(
	<div>
		{a + 2}
		<hr />
		{str}
		<hr />
		{boo ? `条件为真` : `条件为假`}
		<hr />
		<p title={title}>这是p标签</p>
		<hr />
		{h1}
		<hr />
		{/* {arr} */}
		<hr />
		{nameArr}
		<hr />
		{arrStr.map(item => (
			<h3 key={item}>{item}</h3>
		))}
		<hr />
		<p className="hello">!!!!我是一个p元素</p>
	</div>,
	document.getElementById('app')
);
