import {serviceLoc} from '../../../../common/utils/requset'

/*
    所有分支
 */
export function  FindBranchCommit (data) {
    return serviceLoc.request({
        url: '/codeCommit/findBranchCommit',
        method: 'post',
        data
    })
}

/*
    最新提交信息
 */
export function  FindLatelyBranchCommit (data) {
    return serviceLoc.request({
        url: '/codeCommit/findLatelyBranchCommit',
        method: 'post',
        data
    })
}
