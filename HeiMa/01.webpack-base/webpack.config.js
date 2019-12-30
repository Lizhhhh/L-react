const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 导入在内存中自动生成index页面的插件

// 创建一个插件的实例对象
const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'), // 源文件
    filename: 'index.html' // 生成在内存中首页的名称
})

// 向外暴露一个打包的配置对象
// 因为webpack是基于Node构建的;所以webpack支持所有Node API 和语法
module.exports = {
    mode: 'development', // development || production(代码会进行压缩打包)
    // 在webpack 4.x 中,不需要配置入口文件, 采用约定大于配置原则. 默认的打包入口路径是 src -> index.js
    plugins: [
        htmlPlugin
    ]
}


// Node支持哪些路径
// Chrome浏览器支持哪些, Node支持哪些