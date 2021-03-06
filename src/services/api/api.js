/**
 * Created by yangqihua on 2018/2/25.
 */

import http from '../../widgets/common/js/http'
const login = (params) => http.get(params, 'ApiStore/Login', false)
const register = (params) => http.post(params, 'User/Reg', true)
const updateUserInfo = (params) => http.put(params, 'User/Update', true)
const sendCode = (params) => http.post(params, 'common/sendmobileVerifiyCode', true)

const getLink = (params) => http.get(params, 'diy/getlink', false)
const getGoodList = (params, minTime = 0) => http.get(params, 'product/list', false, minTime)
const getCategoryList = (params) => http.get(params, 'product/class', false)
const getListByLogin = (params) => http.get(params, 'diy/GetListByLogin', false)

const getGoodsDetails = (params) => http.get(params, 'product/show', true)

const addCart = (params) => http.post(params, 'cart/addcart', true)
const getCart = (params) => http.get(params, 'cart/getcart', false)
const removeCart = (params) => http.delete(params, 'cart/removecart', true)
const updateCart = (params) => http.put(params, 'cart/updatecart', true)

const getAction = (params) => http.get(params, 'User/getAction', false)
const addAction = (params) => http.post(params, 'User/AddAction', true)
const removeAction = (params) => http.delete(params, 'User/RemoveAction', true)

const addOrder = (params) => http.post(params, 'Order/Buy', true)
const getOrderList = (params, minTime = 0) => http.get(params, 'Order/Index', false, minTime)

const buyInfo = (params) => http.post(params, 'Order/BuyInfo', true)
const getPrice = (params) => http.post(params, 'order/getPrice', false)

const getUserAddress = (params) => http.get(params, 'UserAddress/Single', false)
const getUserAddressList = (params) => http.get(params, 'UserAddress/get', true)
const setDefaultAddress = (params) => http.post(params, 'UserAddress/SetDefault', false)

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
    addAction,
    getAction,
    removeAction,
    addOrder,
    getOrderList,
    buyInfo,
    getUserAddress,
    getUserAddressList,
    setDefaultAddress,
    getPrice
}