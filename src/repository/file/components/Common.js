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
const getFileAddress = (location,data) =>{
    return interceptUrl(location.pathname,data)
}

//获取界面查询类型
const getPageType = (location,webUrl) =>{
    if (location.pathname.includes(webUrl+"/code")){
        return "code"
    }
    //查询文件详情
    if (location.pathname.includes(webUrl+"/blob")){
       return "blob"
    }
    if (location.pathname.includes(webUrl+"/edit")){
        return "edit"
    }
    if (location.pathname.includes(webUrl+"/new")){
        return "edit"
    }
}

/**
 * 文件图标
 * @param fileType
 * @returns {string|*}
 */
const renderFileIcon = fileType => {
    switch (fileType) {
        case "txt":
        case "yaml":
        case "css":
        case "json":
        case "xml":
        case "cmd":
        case "md":
        case "sql":
        case "ts":
        case "java":
            return fileType
        case "js":
            return "JavaScript"
        case "sh":
            return "powershell"
        case "gitignore":
            return "git"
        default:
            return "txt"
    }
}



export {getFileAddress,getPageType,setBranch,commitU4,findRefCode,renderFileIcon}



