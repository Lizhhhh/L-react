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

