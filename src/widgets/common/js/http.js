/**
 * Created by yangqihua on 2017/01/17.
 */
import wepy from 'wepy'
import tip from './tip'
import md5 from './md5'
import {BASE_URL, PROJECT_ID, KEY} from '../../../services/config/env'

const TIMESTAMP = Math.round(new Date().getTime() / 1000)

class HTTPUtil {
    static async wxRequest(url, params = {}, isLoading = true, method = 'GET', headers = {}) {
        let sign = HTTPUtil.getSign(url)
        let token = HTTPUtil.getToken(url)
        let userId = HTTPUtil.getUserId()

        headers['content-type'] = 'application/json'
        isLoading && tip.loading()
        let result = await wepy.request({
            url: BASE_URL + '/api/' + url + '?sign=' + sign + '&token=' + token + '&userId=' + userId + '&timestamp=' + TIMESTAMP,
            data: params,
            method: method,
            header: headers,
        }).catch((fail) => {
            // 1.客户端类型异常
            isLoading && tip.loaded()
            tip.error('请求数据异常')
        })
        result && isLoading && tip.loaded()
        // 2.Http 类型异常
        if (result && result['statusCode'] !== 200) {
            if (result['statusCode'] === 500) {
                tip.error('服务器异常')
            } else {
                tip.error('code:' + result['statusCode'])
            }
            return null
        }
        result = result.data
        // 3.业务类型异常
        if (result.hasOwnProperty('status') && result['status'] !== 1) {
            tip.error(result.message || '未知错误')
            return null
        }
        return result

    }

    static async get(params = {}, url, isLoading = true) {
        return await HTTPUtil.wxRequest(url, params, isLoading)
    }

    static async post(params = {}, url, isLoading = true) {
        return await HTTPUtil.wxRequest(url, params, isLoading,'POST')
    }

    static getSign(url) {
        let sign =
            TIMESTAMP +
            url.toLowerCase() +
            KEY +
            PROJECT_ID +
            'localhost'
        return md5.hex_md5(sign)
    }

    static getToken(url) {
        let userInfo = wepy.getStorageSync('userInfo')
        let userName = userInfo.userName && userInfo.userName.toLowerCase() || ''
        return url.toLowerCase() + TIMESTAMP + userName
    }

    static getUserId() {
        let userInfo = wepy.getStorageSync('userInfo')
        return userInfo.userId || ''
    }

}

export default HTTPUtil