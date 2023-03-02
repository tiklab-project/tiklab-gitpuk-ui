import {serviceLoc} from '../../../common/utils/Requset';

/**
 * 创建仓库组
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function CreateGroup(data) {
    return serviceLoc.request({
        url: '/rpyGroup/createGroup',
        method: 'post',
        data
    })
}

/**
 * 删除仓库组
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function DeleteGroup(data) {
    return serviceLoc.request({
        url: '/rpyGroup/deleteGroup',
        method: 'post',
        data
    })
}

/**
 * 更新仓库组
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function UpdateGroup(data) {
    return serviceLoc.request({
        url: '/rpyGroup/updateGroup',
        method: 'post',
        data
    })
}

/**
 * 获取仓库组
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function FindUserGroup(data) {
    return serviceLoc.request({
        url: '/rpyGroup/findUserGroup',
        method: 'post',
        data
    })
}
