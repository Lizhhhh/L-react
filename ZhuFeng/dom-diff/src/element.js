class VNode {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}


const createElement = (type, props, children) => {
    return new VNode(type, props, children);
};

// render方法,可以将vnode转化成真实dom
const render = (vnode) => {
    let el = document.createElement(vnode.type);
    let props = vnode.props;
    for (let key in props) {
        el.setAttribute(key, props[key]);
    }
    vnode.children.forEach(child => {
        child = child instanceof VNode ? render(child) : document.createTextNode(child);
        el.appendChild(child);
    })
    return el;
}

const renderDom = (el, target) => {
    target.appendChild(el);
}


export { createElement, render, renderDom }