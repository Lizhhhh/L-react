import { createElement, render, renderDom } from './element';
import diff from './diff';
import patch from './patch';
let vertualDom1 = createElement('ul', { class: 'list', style: 'border:1px solid black' }, [
    createElement('li', { class: 'list' }, ['a']),
    createElement('li', { class: 'list' }, ['b']),
    createElement('li', { class: 'list' }, ['c']),
])

let vertualDom2 = createElement('ul', { class: 'list-group' }, [
    createElement('li', { class: 'list' }, ['1']),
    createElement('li', { class: 'list' }, ['b']),
    createElement('div', { class: 'list' }, ['3']),
])
// 将虚拟dom转化成真实DOM渲染到页面
let el = render(vertualDom1);
renderDom(el, window.root);

let patches = diff(vertualDom1, vertualDom2);

// 根据补丁包,更新dom
patch(el, patches);


// DOM Diff 找到两个虚拟DOM的区别(两个对象的比较)
// dom diff 的作用,根据两个虚拟对象,创建出补丁(描述改变的内容),将这个补丁用来更新dom