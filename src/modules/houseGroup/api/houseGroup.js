import {serviceLoc} from '../../../common/utils/requset'

export function CreateGroup(data) {
    return serviceLoc.request({
        url: '/codeGroup/createGroup',
        method: 'post',
        data
    })
}

export function DeleteGroup(data) {
    return serviceLoc.request({
        url: '/codeGroup/deleteGroup',
        method: 'post',
        data
    })
}

export function UpdateGroup(data) {
    return serviceLoc.request({
        url: '/codeGroup/updateGroup',
        method: 'post',
        data
    })
}

export function FindUserGroup(data) {
    return serviceLoc.request({
        url: '/codeGroup/findUserGroup',
        method: 'post',
        data
    })
}
