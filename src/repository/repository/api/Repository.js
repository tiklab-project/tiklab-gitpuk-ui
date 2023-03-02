import {serviceLoc} from '../../../common/utils/Requset';

/**
 * 添加仓库
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  CreateRpy (data) {
    return serviceLoc.request({
        url: '/rpy/createRpy',
        method: 'post',
        data
    })
}

/**
 * 删除仓库
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  DeleteRpy (data) {
    return serviceLoc.request({
        url: '/rpy/deleteRpy',
        method: 'post',
        data
    })
}

/**
 * 更新仓库
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  UpdateRpy (data) {
    return serviceLoc.request({
        url: '/rpy/updateRpy',
        method: 'post',
        data
    })
}

/**
 * 获取仓库
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindUserRpy (data) {
    return serviceLoc.request({
        url: '/rpy/findUserRpy',
        method: 'post',
        data
    })
}

/**
 * 获取某一个仓库信息
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindNameRpy (data) {
    return serviceLoc.request({
        url: '/rpy/findNameRpy',
        method: 'post',
        data
    })
}
