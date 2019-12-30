class VDOM {
    create(tag, data, children) {

        return {
            tag,
            data,
            children
        }
    }
    render(vnode, dom) {
        let container = document.getElementById(dom);
        this.mount(vnode, container);
    }
    mount(vnode, container) {

    }
}