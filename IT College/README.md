# 虚拟 DOM 学习

# 为什么要学习虚拟 DOM
1. 首先将浏览器中的 DOM 名称打印出来
```javascript
const div = document.createElement('div');
let ret = '';
for (let key in div) {
  ret += key + ''
};
console.log(ret);
```
可以发现,div的属性有上百个. 因此对DOM的操作,将会变的很慢

2. 使用js去描述html并不复杂,甚至可以说是很简单
- 例如我们要描述下面DOM
````html
<div id="app">
  <p class="item"> 节点1 </p>
</div>
````
- js代码如下:
````javascript
createElement() {
  return {
    tag:'div',
    data: {
      id: app
    },
    children:[
      {
        tag: 'p',
        data: {
          class: item
        }
      }
    ]
  }
}
````


# 虚拟DOM的设计
使用一种方法来描述DOM节点(要求:语法简洁、且能表达大部分的节点),看下面的栗子
- 我们想使用自己的方法来渲染下面的DOM结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191223084716954.png)
- 分为两个步骤:创建虚拟节点和渲染.
````javascript
<script src=".vnode.js"></script>
<script>
const dom = new VDOM();
// 创建虚拟DOM
// 参数:代表节点的类型,节点中的属性,以及子节点
let vdom = dom.create('div', { id: 'test' }, [
    dom.create('p', { key: 'a', style: 'color: blue;' }, '节点1'),
    dom.create('p', { key: 'b' }, '节点2'),
    dom.create('p', { key: 'c', class: 'item-header' }, '节点3'),
    dom.create('p', { key: 'd' }, '节点4')
]);
// 渲染
// 参数: 虚拟dom 和 挂载在页面上的地方
dom.render(vdom, 'app');
</script>
````
- 先使用console.log语句来输出,代表渲染成功.
````javascript
// vnode.js
class VDOM {
    create(tag, data, children) {
        console.log('虚拟节点创建成功');
        console.log(tag, data, children);

        return {
            tag,
            data,
            children
        }
    }
    render(vdom, dom) {
        let container = document.getElementById(dom);
        console.log('渲染成功');
        console.log('vdom: ', vdom);
        console.log('container: ', container);
    }
}
````
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191223090809211.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3BpYW5vOTQyNQ==,size_16,color_FFFFFF,t_70)
***

