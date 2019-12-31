import React from 'react';
export default function Hello(props) {
	// 如果在一个组件中return null,则表示此组件什么都不渲染.是空的.
	return (
		<h1>
			这是一个动物园 -> 姓名:{props.name} - 年龄:{props.age}
		</h1>
	);
}

// // 把组件暴露出去
// export default Hello