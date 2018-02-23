/**
 * Created by yangqihua on 2018/2/23.
 */

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
