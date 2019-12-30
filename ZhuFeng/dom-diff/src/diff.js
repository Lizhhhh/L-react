const diff = (oldTree, newTree) => {
    let patches = {};
    let index = 0;

    // 递归树,比较后的结果放到补丁包中
    walk(oldTree, newTree, index, patches);
    return patches;
}


// index 被私有化到了walk作用域内
const walk = (oldNode, newNode, index, patches) => {
    let currentPatch = []; // 每个元素都有一个补丁对象

    if (!newNode) { // 节点不存在
        currentPatch.push({ type: 'REMOVE', index });
    } else if (isString(oldNode) && isString(newNode)) {
        if (oldNode !== newNode) { // 判断文本是否变化了
            currentPatch.push({ type: 'TEXT', text: newNode });
        }

    } else if (oldNode.type === newNode.type) { // 节点类型没有改变
        // 看旧节点和新节点的节点类型改变了没有
        // 比较属性是否有更改
        let attrs = diffAttr(oldNode.props, newNode.props);
        if (Object.keys(attrs).length > 0) { // 属性值改变了.
            currentPatch.push({ type: 'ATTRS', attrs })
        }
        // 如果有儿子节点,遍历儿子
        diffChildren(oldNode.children, newNode.children, index, patches);
    } else {
        // 说明节点被替换了
        currentPatch.push({ type: 'REPLACE', newNode });
    }

    if (currentPatch.length > 0) { // 当前元素确实有补丁
        // 将元素和补丁对应起来 放到大补丁包当中
        patches[index] = currentPatch;
    }
}

const isString = node => {
    return Object.prototype.toString.call(node) === '[object String]';
}

let layer = 0;
const diffChildren = (oldChildren, newChildren, index, patches) => {
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child, idx) => {
        // 索引不应该是index了...
        // index每次传递walk时,index是递增的,所有的节点都基于一个序号来实现
        walk(child, newChildren[idx], ++layer, patches);
    })
}



const diffAttr = (oldAttrs, newAttrs) => {
    let patch = {};
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key];
        }
    }
    for (let key in newAttrs) {
        // 老节点没有新节点的属性
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }
    return patch
}

export default diff