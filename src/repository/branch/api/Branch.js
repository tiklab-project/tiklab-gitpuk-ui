import {serviceLoc} from '../../../common/utils/Requset';

/**
 * 获取所有分支
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindAllBranch (data) {
    return serviceLoc.request({
        url: '/branch/findAllBranch',
        method: 'post',
        data
    })
}

/**
 * 添加分支
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  CreateBranch (data) {
    return serviceLoc.request({
        url: '/branch/createBranch',
        method: 'post',
        data
    })
}


/**
 * 删除分支
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  DeleteBranch (data) {
    return serviceLoc.request({
        url: '/branch/deleteBranch',
        method: 'post',
        data
    })
}
