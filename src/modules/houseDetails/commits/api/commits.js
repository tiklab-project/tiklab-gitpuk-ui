import {serviceLoc} from '../../../../common/utils/requset'

/**
 * 提交信息
 */
export function  FindBranchCommit (data) {
    return serviceLoc.request({
        url: '/codeCommit/findBranchCommit',
        method: 'post',
        data
    })
}

/**
 * 提交信息所有文件
 */
export function  FindCommitFileDiffList (data) {
    return serviceLoc.request({
        url: '/codeCommit/findCommitFileDiffList',
        method: 'post',
        data
    })
}

/**
 * 单个提交（改变）内容
 */
export function  FindCommitFileDiff (data) {
    return serviceLoc.request({
        url: '/codeCommit/findCommitFileDiff',
        method: 'post',
        data
    })
}

/**
 * 单个提交（未改变）内容
 */
export function  FindCommitLineFile (data) {
    return serviceLoc.request({
        url: '/codeCommit/findCommitLineFile',
        method: 'post',
        data
    })
}

/**
 * 单个提交（未改变）内容
 */
export function  FindLikeCommitDiffFileList (data) {
    return serviceLoc.request({
        url: '/codeCommit/findLikeCommitDiffFileList',
        method: 'post',
        data
    })
}


