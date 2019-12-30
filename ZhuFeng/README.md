# 虚拟DOM
- virtual dom,也就是虚拟节点.它通过JS的Object对象模拟DOM中的节点,然后通过特定的render方法将其渲染成真实的DOM节点.
- 当修改dom的时候,不会真正修改dom,而是先使用diff算法先对js对象进行计算,在通过render方法,将其渲染.
- 原则: 以最小的代价来操作DOM
- 语法如下:
````javascript
const vdom1 = createElement('ul', {class: 'list'}, [
  createElement('li', {class: 'item'}, ['1']),
  createElement('li', {class: 'item'}, ['2']),
  createElement('li', {class: 'item'}, ['3'])
])
render(vdom1);
````

# 生成项目
```
npm install -g create-react-app
create-react-app dom-diff
```

## 虚拟dom
createElement => {type, props, children}

# diff算法的规则
- 当节点类型相同时,去看一下属性是否相同,产生一个属性的补丁包 {type: 'ATTRS', attrs: {class:'list-group'} }
- 新的dom节点不存在 { type: 'REMOVE', index: xxx}
- 节点类型不相同: 直接采用替换模式 {type:'REPLACE', newNode:newNode}
- 文本变化(type): { type:"TEXT", text: 1}

