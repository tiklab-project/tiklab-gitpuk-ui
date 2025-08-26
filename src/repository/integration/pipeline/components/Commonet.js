import React from 'react';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    PlayCircleOutlined
} from "@ant-design/icons";

export const renIcon = buildStatus => {
    switch (buildStatus) {
        case "error" :
            return  <CloseCircleOutlined style={{color:"#FF0000"}}/>
        case "success" :
            return  <CheckCircleOutlined style={{color:"#0063FF"}}/>
        case "halt":
            return  <ExclamationCircleOutlined style={{color:"#222222"}}/>
        /* case "run":
             return  <Spin indicator={<LoadingOutlined style={{color:"#222222"}} spin />} />*/
        case "wait":
            return  <PlayCircleOutlined style={{color:"#222222"}}/>
    }
}

//获取Arbess 地址
export const findArbessUrl=(prefix,type)=>{
    switch (type) {
        case "pipeline":
            //分页查询流水线路径
            return prefix+"/api/pipeline/findUserPipelinePage"
        case "user":
            //通过账号和密码查询用户信息
            return prefix+"/api/user/user/findUserByUsername"
    }
}

export const findIntPath=(intPath)=>{
    if (intPath.endsWith("/")){
        const lastIndex = intPath.lastIndexOf('/');
       return intPath.substring(0, lastIndex);
    }else {
        return intPath
    }
}



