import {interceptUrl} from "../../../common/client/Client";

const commitU4 = 'commit_id'

// 是否为提交历史记录
const findCommitId = branch =>{
    return branch && branch.endsWith(commitU4)
}

// 设置分支
const setBranch = (branch,houseInfo) =>{
    const bra = branch ? branch :houseInfo.defaultBranch
    return bra.endsWith(commitU4) ? bra.substring(0,bra.length-commitU4.length):bra
}

// 路径截取
const setFileAddress = (location,data) =>{
    return interceptUrl(location.pathname,data)
}

export {setFileAddress,setBranch,findCommitId,commitU4}
