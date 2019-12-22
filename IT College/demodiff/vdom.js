const vnodeType = {
    HTML: 'HTML',
    TEXT: 'TEXT',

    COMPONENT: 'COMPONENT',
    CLASS_COMPONENT: 'CLASS_COMPONENT'
};

const childType = {
    EMPTY: 'EMPTY',
    SINGLE: 'SINGLE',
    MULTIPLE: 'MULTIPLE'
};

// 新建虚拟dom
// 名字, 属性, 子元素
function createElement(tag, data, children) {
    let flag;
    if (typeof tag === 'string') {
        // 普通的html标签
        flag = vnodeType.HTML;
    } else if (typeof tag === 'function') {
        // 组件
        flag = vnodeType.COMPONENT;
    } else {
        // 普通文本
        flag = vnodeType.TEXT;
    }
    let childrenFlag;
    if (children === null) {
        childFlag = childType.EMPTY;
    } else if (Array.isArray(children)) {
        let length = children.length;
        if (length === 0) {
            childrenFlag = childType.EMPTY;
        } else {
            childrenFlag = childType.MULTIPLE;
        }
    } else {
        // 其他情况认为是文本
        childFlag = childType.SINGLE;
        children = createTextVnode(children + '');
    }

    // 返回vnode
    return {
        flag, // vnode类型
        tag, // 标签, div文本没有tag,
        data,
        key: data && data.key,
        children,
        childrenFlag,
        el: null
    };
}

// 渲染
// 要渲染的虚拟dom, 容器
function render(vnode, container) {
    // 区分首次渲染和再次渲染
    if (container.vnode) {
        // 更新
        patch(container.vnode, vnode, container);
    } else {
        mount(vnode, container);
    }

    container.vnode = vnode;
}

function patch(prev, next, container) {
    let nextFlag = next.flag;
    let prevFlag = prev.flag;
    // prev是text, next是p, 直接替换
    if (nextFlag !== prevFlag) {
        replaceVnode(prev, next, container);
    } else if (nextFlag === vnodeType.HTML) {
        patchElement(prev, next, container);
    } else if (nextFlag === vnodeType.TEXT) {
        patchText(prev, next);
    }
}

function patchElement(prev, next, container) {
    if (prev.tag !== next.tag) {
        replaceVnode(prev, next, container);
        return;
    }
    let el = (next.el = prev.el);
    let prevData = prev.data;
    let nextData = next.data;
    // 实现更新和新建
    if (nextData) {
        for (let key in nextData) {
            let prevVal = prevData[key];
            let nextVal = nextData[key];
            patchData(el, key, prevVal, nextVal);
        }
    }
    // 实现删除
    if (prevData) {
        for (let key in prevData) {
            let prevVal = prevData[key];
            if (prevVal && !nextData.hasOwnProperty(key)) {
                patchData(el, key, prevVal, null)
            }
        }
    }
    // data更新完毕, 下面更新子元素
    // 虚拟DOM diff的过程
    patchChildren(
        prev.childrenFlag,
        next.childrenFlag,
        prev.children,
        next.children,
        el
    )
}

function patchChildren(prevChildFlag, nextChildFlag, prevChildren, nextChildren, container) {
    // 更新子元素
    // 仿照diff算法
    switch (prevChildFlag) {
        case childType.SINGLE:
            switch (nextChildFlag) {
                case childType.SINGLE:
                    patch(prevChildren, nextChildren, container);
                    break;
                case childType.EMPTY:
                    container.removeChild(prevChildren.el);
                    break;
                case childType.MULTIPLE:
                    container.removeChild(prevChildren.el);
                    for (let i = 0; i < nextChildren.length; i++) {
                        mount(nextChildren[i], container);
                    }
                    break;
            }
            break;
        case childType.EMPTY:
            switch (nextChildFlag) {
                case childType.SINGLE:
                    mount(nextChildren, container);
                    break;
                case childType.EMPTY:
                    break;
                case childType.MULTIPLE:
                    for (let i = 0; i < nextChildren.length; i++) {
                        mount(nextChildren[i], container)
                    }
                    break;
            }
            break;
        case childType.MULTIPLE:
            switch (nextChildFlag) {
                case childType.SINGLE:
                    for (let i = 0; i < prevChildren.length; i++) {
                        container.removeChild(prevChildren[i].el);
                    }
                    mount(nextChildren, container);
                    break;
                case childType.EMPTY:
                    for (let i = 0; i < prevChildren.length; i++) {
                        container.removeChild(prevChildren[i].el);
                    }
                    break;
                case childType.MULTIPLE:
                    // 众多虚拟dom 就在这里进行区分
                    // 老的是一个数组,新的也是一个数组

                    // 老:[abc], 新:[abc]
                    // 位置:相对递增,不修改


                    // 老:[abc], 新:[cab]
                    // 位置:不是相对递增,需要修改
                    let lastIndex = 0;
                    for (let i = 0; i < nextChildren.length; i++) {
                        let nextVnode = nextChildren[i];
                        let j = 0;
                        let findFlag = false;
                        for (; j < prevChildren.length; j++) {
                            let preVnode = prevChildren[j];
                            if (preVnode.key === nextVnode.key) {
                                findFlag = true;
                                // key 相同,我们认为是同一个元素
                                // [注]: 如果用索引的话, 索引每次都在变,即缓存一直在变. 因此用到key
                                patch(preVnode, nextVnode, container);
                                if (j < lastIndex) {
                                    // 需要移动, 移动元素
                                    // insertBefore实现: 把abc顺序中, a 移到b后面
                                    let flagNode = nextChildren[i - 1].el.nextSibling;
                                    container.insertBefore(preVnode.el, flagNode);
                                    break;
                                } else {
                                    lastIndex = j;
                                }
                            }
                        }
                        if (!findFlag) {
                            // 需要新增的
                            let flagNode = i == 0 ? prevChildren[0].el : nextChildren[i - 1].el.nextSibling;
                            mount(nextVnode, container, flagNode);
                        }
                    }
                    // 移出不需要的元素
                    for (let i = 0; i < prevChildren.length; i++) {
                        const prevVnode = prevChildren[i];
                        const has = nextChildren.find(next => next.key == prevVnode.key);
                        if (!has) {
                            container.removeChild(prevVnode.el);
                        }
                    }
                    break;
            }
            break;
    }
}


function patchText(prev, next) {
    let el = (next.el = prev.el);
    if (next.children !== prev.children) {
        el.nodeValue = next.children;
    }
}

// 替换元素
function replaceVnode(prev, next, container) {
    container.removeChild(prev.el);
    mount(next, container);
}

// 首次挂载元素
function mount(vnode, container, flagNode) {
    let { flag } = vnode;
    if (flag === vnodeType.HTML) {
        mountElement(vnode, container, flagNode);
    } else if (flag === vnodeType.TEXT) {
        mountText(vnode, container);
    }
}

function mountElement(vnode, container, flagNode) {
    let dom = document.createElement(vnode.tag);
    vnode.el = dom;
    let { data, children, childrenFlag } = vnode;
    // 挂载data属性
    if (data) {
        for (let key in data) {
            // 节点、名字、老值、新的值
            patchData(dom, key, null, data[key]);
        }
    }

    if (childrenFlag !== childType.EMPTY) {
        if (childrenFlag === children.SINGLE) {
            mount(children, dom);
        } else if (childrenFlag === childType.MULTIPLE) {
            for (let i = 0; i < children.length; i++) {
                mount(children[i], dom);
            }
        }
    }
    flagNode ? container.insertBefore(dom, flagNode) : container.appendChild(dom);
}

function mountText(vnode, container) {
    let dom = document.createTextNode(vnode.children);
    vnode.el = dom;
    container.appendChild(dom);
}

function patchData(el, key, prev, next) {
    switch (key) {
        case 'style':
            for (let k in next) {
                el.style[k] = next[k];
            }
            for (let k in prev) {
                if (!next.hasOwnProperty(k)) {
                    el.style[k] = ''
                }
            }
            break;
        case 'class':
            el.className = next;
            break;
        default:
            if (key[0] === '@') {
                if (prev) {
                    el.removeEventListener(key.slice(1), prev);
                }
                if (next) {
                    el.addEventListener(key.slice(1), next);
                }
            } else {
                el & el.setAttribute(key, next);
            }
            break;
    }
}

// 新建文本类型的vnode
function createTextVnode(text) {
    return {
        flag: vnodeType.TEXT,
        tag: null,
        data: null,
        children: text,
        childFlag: childType.EMPTY
    };
}