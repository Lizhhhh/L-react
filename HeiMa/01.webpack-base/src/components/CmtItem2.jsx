import React from 'react';

function CmtItem(props) {
	return (
		<div>
			<h1>评论人: {props.user}</h1>
			<p>评论内容: {props.content}</p>
		</div>
	);
}

export default CmtItem;
