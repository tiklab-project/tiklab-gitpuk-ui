import {serviceLoc} from '../../../../common/utils/requset';

export function  CreateRpy (data) {
    return serviceLoc.request({
        url: '/rpy/createRpy',
        method: 'post',
        data
    })
}

export function  DeleteRpy (data) {
    return serviceLoc.request({
        url: '/rpy/deleteRpy',
        method: 'post',
        data
    })
}


export function  UpdateRpy (data) {
    return serviceLoc.request({
        url: '/rpy/updateRpy',
        method: 'post',
        data
    })
}

export function  FindUserRpy (data) {
    return serviceLoc.request({
        url: '/rpy/findUserRpy',
        method: 'post',
        data
    })
}

export function  FindNameRpy (data) {
    return serviceLoc.request({
        url: '/rpy/findNameRpy',
        method: 'post',
        data
    })
}
