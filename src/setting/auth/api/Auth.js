import {serviceLoc} from '../../../common/utils/Requset';

/**
 * 添加密钥
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function CreateAuth(data) {
    return serviceLoc.request({
        method:'post',
        url:'/auth/createAuth',
        data
    })
}

/**
 * 删除密钥
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function DeleteAuth(data) {
    return serviceLoc.request({
        method:'post',
        url:'/auth/deleteAuth',
        data
    })
}

/**
 * 获取所有密钥
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function FindUserAuth(data) {
    return serviceLoc.request({
        method:'post',
        url:'/auth/findUserAuth',
        data
    })
}

/**
 * 获取单个密钥
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function FindOneAuth(data) {
    return serviceLoc.request({
        method:'post',
        url:'/auth/findOneAuth',
        data
    })
}

