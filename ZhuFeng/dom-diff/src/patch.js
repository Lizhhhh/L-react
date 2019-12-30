let allPathes;
let layer = 0; // 默认哪个需要打补丁
const patch = (node, patches) => {
    allPathes = patches;

    walk(node, patches);
    // 给某个元素打补丁
}

const walk = (node, patches) => {
    let cp = patches[layer++];
    if (cp) {
        // 有补丁
        console.log(node, cp);
        switch (cp) {
            case 'ATTRS':
                break;
            case 'TEXT':
                break;
            case 'REMOVE':
                break;
            case 'REPLACE':
                break;
        }
    }

    // 获取子元素
    let childNodes = node.childNodes;
    // 对每个子元素递归调用walk操作
    childNodes && childNodes.forEach(child => walk(child, patches));
}

export default patch;