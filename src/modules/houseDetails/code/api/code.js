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

