import Mock from '../../node_modules/mockjs'
import banner from './banner.json'
import floor from './floor.json'

Mock.mock("/mock/banner",
{code:200,
	data:banner
})//第一个参数，代表我们以后请求的数据

Mock.mock("/mock/floor",
{code:200,
	data:floor
})//第一个参数，代表我们以后请求的数据