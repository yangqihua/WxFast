/**
 * Created by yangqihua on 2018/2/25.
 */

import http from '../../widgets/common/js/http'
const getSwiperList = (params) => http.get(params, 'diy/getlink',true);

export {
    getSwiperList
}