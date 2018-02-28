/**
 * Created by yangqihua on 2018/2/25.
 */

import http from '../../widgets/common/js/http'
const login = (params) => http.get(params, 'ApiStore/Login',false);
const register = (params) => http.post(params, 'User/Reg',true);
const updateUserInfo = (params) => http.put(params, 'User/Update',true);
const sendCode = (params) => http.post(params, 'common/sendmobileVerifiyCode',true);
const getSwiperList = (params) => http.get(params, 'diy/getlink',true);

export {
    getSwiperList,
    login,
    register,
    updateUserInfo,
    sendCode
}