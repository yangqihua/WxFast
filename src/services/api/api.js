/**
 * Created by yangqihua on 2018/2/25.
 */

import http from '../../widgets/common/js/http'
const login = (params) => http.get(params, 'ApiStore/Login',false);
const register = (params) => http.post(params, 'User/Reg',true);
const updateUserInfo = (params) => http.put(params, 'User/Update',true);
const sendCode = (params) => http.post(params, 'common/sendmobileVerifiyCode',true);

const getLink = (params) => http.get(params, 'diy/getlink',false);
const getGoodList = (params) => http.get(params, 'product/list',false);
const getCategoryList = (params) => http.get(params, 'product/class',false);
const getListByLogin = (params) => http.get(params, 'diy/GetListByLogin',false);

const getGoodsDetails = (params) => http.get(params, 'product/show',true);

const addCart = (params) => http.post(params, 'cart/addcart',true);
const getCart = (params) => http.get(params, 'cart/getcart',true);
const removeCart = (params) => http.delete(params, 'cart/removecart',true);
const updateCart = (params) => http.put(params, 'cart/updatecart',true);

export {
    getLink,
    getGoodList,
    getCategoryList,
    getListByLogin,
    login,
    register,
    updateUserInfo,
    sendCode,
    getGoodsDetails,
    addCart,
    getCart,
    removeCart,
    updateCart,
}