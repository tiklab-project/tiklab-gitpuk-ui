import {serviceLoc} from '../../../../common/utils/requset'

export function  FindFileTree (data) {
    return serviceLoc.request({
        url: '/code/findFileTree',
        method: 'post',
        data
    })
}
