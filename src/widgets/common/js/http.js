/**
 * Created by yangqihua on 2017/01/17.
 */
import wepy from 'wepy'
import tip from './tip'
const BASE_URL = ''
class HTTPUtil {
	static wxRequest(url,params = {},method='GET',headers={}) {
		headers['content-type'] = 'application/json'
        return new Promise(async(resolve, reject) => {
            let result = await wepy.request({
                url: BASE_URL+url,
                data: params,
                method: method,
                header: headers,
            }).catch((fail) => {
                tip.error('请求数据异常')
                reject(fail)
            })
            resolve(result)
        })
	}

	static get({url, params = {}, scb, ecb,isLoading=true}) {
		if(isLoading){
			tip.loading()
		}
		HTTPUtil.wxRequest(url, params).then((json) => {
			if(isLoading) {
				tip.loaded()
			}
			let res = json.data
			if(json['statusCode']==200){
				if(res.code==200){
					scb&&scb(res.data)
				}else{
					ecb&&ecb(json['msg'])
				}
			}else{
				if(json['statusCode']==500){
					ecb&&ecb('服务器异常')
				}else{
					ecb&&ecb('状态码: '+json['statusCode'])
				}
			}
		}, (err) => {
			if(isLoading) {
				tip.loaded()
			}
			tip.error("错误："+err)
			ecb && ecb(err)
		})
	}
	static post({url, params = {}, scb, ecb,isLoading=true}) {
		if(isLoading){
			tip.loading()
		}
		HTTPUtil.wxRequest(url, params,'POST').then((json) => {
			if(isLoading) {
				tip.loaded()
			}
			let res = json.data
			if(json['statusCode']==200){
				if(res.code==200){
					scb&&scb(res.data)
				}else{
					ecb&&ecb(json['msg'])
				}
			}else{
				ecb&&ecb(json['errMsg'])
			}
		}, (err) => {
			if(isLoading) {
				tip.loaded()
			}
			ecb && ecb(err)
		})
	}

}

export default HTTPUtil