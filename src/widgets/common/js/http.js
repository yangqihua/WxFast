/**
 * Created by yangqihua on 2017/01/17.
 */
import wepy from 'wepy'
import tip from './tip'
import md5 from './md5'
import {BASE_URL, PROJECTID, KEY} from '../../../service/config/env'


const TIMESTAMP = new Date().getTime()
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())

class HTTPUtil {
    static  getSign(url) {
        let sign =
            TIMESTAMP +
            url.toLowerCase() +
            KEY +
            PROJECTID +
            '不知道是什么东西'
        return md5(sign)
    }

    static async wxRequest(url, params = {}, isLoading = true, method = 'GET', headers = {}) {
        let sign = HTTPUtil.getSign()
        headers['content-type'] = 'application/json'
        isLoading && tip.loading()
        let result = await wepy.request({
            url: BASE_URL + '/api/' + url + '?sign=' + sign + '&timestamp=' + TIMESTAMP,
            data: params,
            method: method,
            header: headers,
        }).catch((fail) => {
            isLoading && tip.loaded()
            tip.error('请求数据异常')
        })
        result && isLoading && tip.loaded()
        if (result && result['statusCode'] !== 200) {
            if (result['statusCode'] === 500) {
                tip.error('服务器异常')
            } else {
                tip.error('code:' + result['statusCode'])
            }
        }
        console.log('result:', result)
        return result
    }

    static async get(params = {}, url, isLoading = true) {
        let json = await HTTPUtil.wxRequest(url, params, isLoading)
        let errorMessage = '请求数据异常'
        if (json) {
            // TODO: 根据业务code去判断异常
            let result = json.data
            if (result.hasOwnProperty('code') && result['code'] == 200) {
                return result
            }
            errorMessage = '业务异常'
        }
        throw errorMessage;
    }

}

export default HTTPUtil