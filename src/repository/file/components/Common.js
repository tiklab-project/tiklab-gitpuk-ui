import {interceptUrl} from "../../../common/client/Client";

// 提交标识
const commitU4 = 'commit_id'

//标签标识
const tagU4='tag'



/**
 * 查询RefCode 分支名字、标签名字、提交的commitId
 * @param branch：分支
 * @param repositoryInfo：仓库信息
 * @returns {string|*}
 */
const findRefCode = (location,repositoryInfo,type) =>{
    let  match;
    if (type==='code'){
         match = location.pathname.match(/code\/([^\/]+)/);
    }
    if (type==='blob'){
         match = location.pathname.match(/blob\/([^\/]+)/);
    }
    if (type==='edit'){
        match = location.pathname.match(/edit\/([^\/]+)/);
    }
    if (type==='create'){
        match = location.pathname.match(/new\/([^\/]+)/);
    }
    if (match){
        return match[1]
    }
    return  repositoryInfo.defaultBranch
}


/**
 * 设置分支
 * @param branch：分支
 * @param repositoryInfo：仓库信息
 * @returns {string|*}
 */
const setBranch = (branch,repositoryInfo) =>{
    const bra = branch ? branch :repositoryInfo.defaultBranch
    if(bra&&bra!=='null'){
        const braName = bra.endsWith(tagU4)? bra.substring(0,bra.length-tagU4.length):bra
        return braName.endsWith(commitU4) ? braName.substring(0,braName.length-commitU4.length):braName
    }
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





export {setFileAddress,setBranch,commitU4,findRefCode}



