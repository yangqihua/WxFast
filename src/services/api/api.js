/**
 * Created by yangqihua on 2018/2/25.
 */

import http from '../../widgets/common/js/http'
const login = (params) => http.get(params, 'ApiStore/Login',false);
const updateUserInfo = (params) => http.post(params, 'User/Updata',false);
const getSwiperList = (params) => http.get(params, 'diy/getlink',true);

export {
    getSwiperList,
    login,
    updateUserInfo
}