/**
 * Created by yangqihua on 2017/01/17.
 */
import wepy from 'wepy'
import tip from './tip'
import md5 from './md5'
import {BASE_URL, PROJECTID, KEY} from '../../../service/config/env'

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
        return result
    }

    static async get(params = {}, url, isLoading = true) {
        let json = await HTTPUtil.wxRequest(url, params, isLoading)
        let errorMessage = '请求数据异常'
        if (json) {
            // TODO: 根据业务code去判断异常
            let result = json.data
            if (result.hasOwnProperty('status') && result['status'] == 1) {
                return result
            }
            errorMessage = '业务异常'
        }
        throw errorMessage;
    }

    static getSign(url) {
        let sign =
            TIMESTAMP +
            url.toLowerCase() +
            KEY +
            PROJECTID +
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