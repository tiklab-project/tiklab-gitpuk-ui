import {serviceLoc} from '../../../../common/utils/requset';

export function CreateAuth(data) {
    return serviceLoc.request({
        method:'post',
        url:'/auth/createAuth',
        data
    })
}

export function DeleteAuth(data) {
    return serviceLoc.request({
        method:'post',
        url:'/auth/deleteAuth',
        data
    })
}

export function FindUserAuth(data) {
    return serviceLoc.request({
        method:'post',
        url:'/auth/findUserAuth',
        data
    })
}

export function FindOneAuth(data) {
    return serviceLoc.request({
        method:'post',
        url:'/auth/findOneAuth',
        data
    })
}

