import React from 'react';
import ReactDOM from 'react-dom';

import '@/08.class-继承';

// class关键字创建组件
class Movie extends React.Component {
	constructor() {
		// 由于 Movie 组件,继承了 React.Component 这个父类,所有,自定义的构造器中,必须调用 super()
		super();
		// 只有调用了 super() 以后,才能使用 this 关键字
		this.state = {
			// 这个this.state = {} 就相当于 Vue 中的 data() { return {} }
			msg: '大家好, 我是 class 创建的 Movie'
		};
	}
	// render 函数的作用,渲染当前组件所对应的 Render 函数
	// 在 class 关键字创建的组件中,如果想使用外界传递过来的props参数, 不需要接收,直接通过 this.props 访问即可
	render() {
		// 注意: 不论是 class 还是普通 function 创建的组件, 他们的props 都是只读的.
		return (
			// 注意: 在 class 组件内部, this 表示当前组件的实例对象
			<div>
				这是 Movie 组件 {this.props.name} -> {this.props.age} ->{' '}
				{this.props.gender}
				<h1>{this.state.msg}</h1>
			</div>
		);
	}
}

const user = {
	name: 'zs',
	age: 22,
	gender: '男'
};

ReactDOM.render(
	<div>
		{/* 这里的Movie 标签,其实就是Movie类的一个实例对象 */}
		<Movie {...user}></Movie>
		<hr />
		<Movie></Movie>
	</div>,
	document.getElementById('app')
);
