import {interceptUrl} from "../../../common/client/Client";

// 提交标识
const commitU4 = 'commit_id'

/**
 * 是否为提交历史记录
 * @param branch：分支
 * @returns {*}
 */
const findCommitId = branch =>{
    return branch && branch.endsWith(commitU4)
}

/**
 * 设置分支
 * @param branch：分支
 * @param repositoryInfo：仓库信息
 * @returns {string|*}
 */
const setBranch = (branch,repositoryInfo) =>{
    const bra = branch ? branch :repositoryInfo.defaultBranch
    return bra.endsWith(commitU4) ? bra.substring(0,bra.length-commitU4.length):bra
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

export {setFileAddress,setBranch,findCommitId,commitU4}
