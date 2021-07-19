//先去localstorage中找UUID 如果有就使用  如果没有就重新生成
import { v4 as uuidv4 } from 'uuid';
export const getUUID=()=>{
  let UUID=window.localStorage.getItem('uuidsph')
	if(!UUID){
		//重新生成UUID 生成完放在LocalStorage中
		UUID=uuidv4()
		 window.localStorage.setItem('uuidsph',UUID)
	}
	return UUID
}