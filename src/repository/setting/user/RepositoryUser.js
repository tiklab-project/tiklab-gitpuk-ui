/*
 * @Descripttion: 仓库角色
 * @version: 1.0.0
 * @Author: 李明亮
 * @Date: 2023-01-03 19:56:02
 * @LastEditors: 李明亮
 * @LastEditTime: 2023-01-03 19:56:02
 */
import React ,{useEffect}from "react";
import {DomainUser} from "thoughtware-user-ui";
import { inject, observer } from "mobx-react";

const RepositoryUser =(props)  => {
    const{match,repositoryStore}=props
    const {findRepositoryByAddress,repositoryInfo}=repositoryStore

    const webUrl = `${match.params.namespace}/${match.params.name}`
    useEffect(()=>{
        findRepositoryByAddress(webUrl)
    },[])
    return (
        <div >
            <DomainUser
                {...props}
                domainId={repositoryInfo.rpyId}
                bgroup = {"xcode"}
            />
        </div>
    )
}

export default inject("repositoryStore")(observer(RepositoryUser));
