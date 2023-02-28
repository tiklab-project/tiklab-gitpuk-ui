import {serviceLoc} from '../../../common/utils/Requset';


export function  FindAllBranch (data) {
    return serviceLoc.request({
        url: '/branch/findAllBranch',
        method: 'post',
        data
    })
}

export function  CreateBranch (data) {
    return serviceLoc.request({
        url: '/branch/createBranch',
        method: 'post',
        data
    })
}

export function  DeleteBranch (data) {
    return serviceLoc.request({
        url: '/branch/deleteBranch',
        method: 'post',
        data
    })
}
