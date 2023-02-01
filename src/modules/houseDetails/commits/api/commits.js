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

