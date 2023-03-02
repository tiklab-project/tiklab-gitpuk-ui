import {serviceLoc} from '../../../common/utils/Requset';

/**
 * 提交信息
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindBranchCommit (data) {
    return serviceLoc.request({
        url: '/commit/findBranchCommit',
        method: 'post',
        data
    })
}

/**
 * 提交信息diff文件
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindCommitFileDiffList (data) {
    return serviceLoc.request({
        url: '/commit/findCommitFileDiffList',
        method: 'post',
        data
    })
}

/**
 * 单个diff文件内容（改变）内容
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindCommitFileDiff (data) {
    return serviceLoc.request({
        url: '/commit/findCommitFileDiff',
        method: 'post',
        data
    })
}

/**
 * 单个diff文件内容（未改变）内容
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindCommitLineFile (data) {
    return serviceLoc.request({
        url: '/commit/findCommitLineFile',
        method: 'post',
        data
    })
}

/**
 * 模糊搜索diff文件
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
export function  FindLikeCommitDiffFileList (data) {
    return serviceLoc.request({
        url: '/commit/findLikeCommitDiffFileList',
        method: 'post',
        data
    })
}
