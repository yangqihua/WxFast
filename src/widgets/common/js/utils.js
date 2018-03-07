/**
 * Created by yangqihua on 2018/2/23.
 */
import wepy from 'wepy'
// 判断是否为手机号
export function isMobilePhone(mPhone) {
    let re = /^[1][3,4,5,7,8][0-9]{9}$/
    return re.test(mPhone)
}

// 判断是否为电话号码
export function isTelephone(tel) {
    let re = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    return re.test(tel)
}

export function isPhone(phone) {
    return isMobilePhone(phone) || isTelephone(phone)
}

export function isEmail(email) {
    let re = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
    return re.test(email)
}

export function createAnimation(timingFunction) {
    return wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 200,
        timingFunction: timingFunction,
        delay: 0
    })
}

export function getDomHeight(id) {
    return new Promise((resolve, reject) => {
        let query = wx.createSelectorQuery()
        query.select(id).boundingClientRect()
        query.exec((res) => {
            let domHeight = pxTorpx(res[0].height)
            resolve(domHeight)
        })
    })
}

export function pxTorpx(px) {
    let systemInfo = wepy.getSystemInfoSync()
    let rate = 750 / systemInfo.windowWidth;
    return px * rate;
}

export function deepCopy(obj) {
    if (typeof obj !== 'object' || !obj) {
        return obj;
    }
    let newObj = obj.constructor === Array ? [] : {};
    for (let i in obj) {
        newObj[i] = typeof obj[i] === 'object' ?
            deepCopy(obj[i]) : obj[i];
    }
    return newObj;
}