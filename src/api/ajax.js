/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/
import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'


/* 1. 配置通用的基础路径和超时 */
const service = axios.create({
  baseURL: '/api', // 基础路径
  timeout: 20000, // 连接请求超时时间
})
//添加请求拦截器
service.interceptors.request.use((config)=>{
//显示进度条
config.headers["userTempId"]=store.state.user.userTempId
nProgress.start()


return config
})

service.interceptors.response.use(
	response=>{
		nProgress.done()
		return response.data
	},
	error=>{
		nProgress.done()
		alert(error.message||'未知错误')
		return Promise.reject(error)
	}
)


export default service