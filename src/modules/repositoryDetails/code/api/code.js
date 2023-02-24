import {serviceLoc} from '../../../../common/utils/requset'

// 树文件
export function  FindFileTree (data) {
    return serviceLoc.request({
        url: '/code/findFileTree',
        method: 'post',
        data
    })
}

// 文件内容
export function  ReadFile (data) {
    return serviceLoc.request({
        url: '/codeFile/readFile',
        method: 'post',
        data
    })
}

// 修改文件
export function  WriteFile (data) {
    return serviceLoc.request({
        url: '/codeFile/writeFile',
        method: 'post',
        data
    })
}

// 克隆
export function  FindCloneAddress (data) {
    return serviceLoc.request({
        url: '/code/findCloneAddress',
        method: 'post',
        data
    })
}

// 最新提交信息
export function  FindLatelyBranchCommit (data) {
    return serviceLoc.request({
        url: '/codeCommit/findLatelyBranchCommit',
        method: 'post',
        data
    })
}
