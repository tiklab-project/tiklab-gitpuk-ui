import {interceptUrl} from "../../../common/client/Client";

// 提交标识
const commitU4 = 'commit_id'

//标签标识
const tagU4='tag'

/**
 * 是否为提交历史记录
 * @param branch：分支
 * @returns {*}
 */
const findCommitId = branch =>{
    return branch &&( branch.endsWith(commitU4)||branch.endsWith(tagU4))
}

/**
 * 查询提交历史或者标签
 * @param branch：分支
 * @returns {*}
 */
const findType = urlInfo =>{
    let type="branch"
    if ( urlInfo&&urlInfo.endsWith(tagU4)){
        type= 'tag'
    }
    if (urlInfo&&urlInfo.endsWith(commitU4)){
        type= 'commit'
    }
    return type;
}


/**
 * 设置分支
 * @param branch：分支
 * @param repositoryInfo：仓库信息
 * @returns {string|*}
 */
const setBranch = (branch,repositoryInfo) =>{
    const bra = branch ? branch :repositoryInfo.defaultBranch
    const braName = bra.endsWith(tagU4)? bra.substring(0,bra.length-tagU4.length):bra
    return braName.endsWith(commitU4) ? braName.substring(0,braName.length-commitU4.length):braName
}

/**
 * 路径截取
 * @param location：
 * @param data：截取数据
 * @returns {*}
 */
const setFileAddress = (location,data) =>{
    return interceptUrl(location.pathname,data)
}

export {setFileAddress,setBranch,findCommitId,commitU4,findType}
