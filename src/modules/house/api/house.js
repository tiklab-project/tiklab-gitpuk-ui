import {serviceLoc} from '../../../common/utils/requset'

export function  CreateCode (data) {
    return serviceLoc.request({
        url: '/code/createCode',
        method: 'post',
        data
    })
}

export function  DeleteCode (data) {
    return serviceLoc.request({
        url: '/code/deleteCode',
        method: 'post',
        data
    })
}


export function  UpdateCode (data) {
    return serviceLoc.request({
        url: '/code/updateCode',
        method: 'post',
        data
    })
}


export function  FindUserCode (data) {
    return serviceLoc.request({
        url: '/code/findUserCode',
        method: 'post',
        data
    })
}
