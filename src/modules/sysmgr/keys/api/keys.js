import {serviceLoc} from '../../../../common/utils/requset'

export function CreateAuth(data) {
    return serviceLoc.request({
        method:'post',
        url:'/codeAuth/createAuth',
        data
    })
}

export function DeleteAuth(data) {
    return serviceLoc.request({
        method:'post',
        url:'/codeAuth/deleteAuth',
        data
    })
}

export function FindUserAuth(data) {
    return serviceLoc.request({
        method:'post',
        url:'/codeAuth/findUserAuth',
        data
    })
}

export function FindOneAuth(data) {
    return serviceLoc.request({
        method:'post',
        url:'/codeAuth/findOneAuth',
        data
    })
}

