import {serviceLoc} from '../../../../common/utils/requset';

export function CreateGroup(data) {
    return serviceLoc.request({
        url: '/rpyGroup/createGroup',
        method: 'post',
        data
    })
}

export function DeleteGroup(data) {
    return serviceLoc.request({
        url: '/rpyGroup/deleteGroup',
        method: 'post',
        data
    })
}

export function UpdateGroup(data) {
    return serviceLoc.request({
        url: '/rpyGroup/updateGroup',
        method: 'post',
        data
    })
}

export function FindUserGroup(data) {
    return serviceLoc.request({
        url: '/rpyGroup/findUserGroup',
        method: 'post',
        data
    })
}
