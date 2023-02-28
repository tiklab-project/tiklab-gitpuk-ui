import {serviceLoc} from '../../../common/utils/Requset';

// 树文件
export function  FindFileTree (data) {
    return serviceLoc.request({
        url: '/rpy/findFileTree',
        method: 'post',
        data
    })
}

// 克隆
export function  FindCloneAddress (data) {
    return serviceLoc.request({
        url: '/rpy/findCloneAddress',
        method: 'post',
        data
    })
}

// 文件内容
export function  ReadFile (data) {
    return serviceLoc.request({
        url: '/file/readFile',
        method: 'post',
        data
    })
}

// 修改文件
export function  WriteFile (data) {
    return serviceLoc.request({
        url: '/file/writeFile',
        method: 'post',
        data
    })
}

// 最新提交信息
export function  FindLatelyBranchCommit (data) {
    return serviceLoc.request({
        url: '/commit/findLatelyBranchCommit',
        method: 'post',
        data
    })
}
