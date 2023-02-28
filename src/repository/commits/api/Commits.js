import {serviceLoc} from '../../../common/utils/Requset';

/**
 * 提交信息
 */
export function  FindBranchCommit (data) {
    return serviceLoc.request({
        url: '/commit/findBranchCommit',
        method: 'post',
        data
    })
}

/**
 * 提交信息所有文件
 */
export function  FindCommitFileDiffList (data) {
    return serviceLoc.request({
        url: '/commit/findCommitFileDiffList',
        method: 'post',
        data
    })
}

/**
 * 单个提交（改变）内容
 */
export function  FindCommitFileDiff (data) {
    return serviceLoc.request({
        url: '/commit/findCommitFileDiff',
        method: 'post',
        data
    })
}

/**
 * 单个提交（未改变）内容
 */
export function  FindCommitLineFile (data) {
    return serviceLoc.request({
        url: '/commit/findCommitLineFile',
        method: 'post',
        data
    })
}

/**
 * 单个提交（未改变）内容
 */
export function  FindLikeCommitDiffFileList (data) {
    return serviceLoc.request({
        url: '/commit/findLikeCommitDiffFileList',
        method: 'post',
        data
    })
}
