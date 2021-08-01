
const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {

	lintOnSave: false,
	devServer: {//只用于开发环境
		proxy: {
			'/api': { // 只对请求路由以/api开头的请求进行代理转发
				target: 'http://api.atguigu.cn', // 转发的目标url
				changeOrigin: true // 支持跨域
				// pathRewrite: {‘^/api’: ‘’}
			},
		}
	},
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('components', resolve('./src/components'))
			.set('assets', resolve('./src/assets'))
			.set('store', resolve('./src/store'))
			.set('api', resolve('./src/api'))
			.set('views', resolve('./src/views'))
	}

}


