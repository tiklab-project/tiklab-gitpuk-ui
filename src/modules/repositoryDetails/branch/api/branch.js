import {serviceLoc} from '../../../../common/utils/requset'


export function  FindAllBranch (data) {
    return serviceLoc.request({
        url: '/codeBranch/findAllBranch',
        method: 'post',
        data
    })
}

export function  CreateBranch (data) {
    return serviceLoc.request({
        url: '/codeBranch/createBranch',
        method: 'post',
        data
    })
}

export function  DeleteBranch (data) {
    return serviceLoc.request({
        url: '/codeBranch/deleteBranch',
        method: 'post',
        data
    })
}
