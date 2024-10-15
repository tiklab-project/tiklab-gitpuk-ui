/*
 * @Descripttion: 仓库角色
 * @version: 1.0.0
 * @Author: 李明亮
 * @Date: 2023-01-03 19:56:02
 * @LastEditors: 李明亮
 * @LastEditTime: 2023-01-03 19:56:02
 */
import React ,{useEffect}from "react";
import {DomainUser} from "tiklab-user-ui";
import { inject, observer } from "mobx-react";
import groupStore from "../../repositoryGroup/store/RepositoryGroupStore"
const RepositoryGroupUser =(props)  => {
    const{match}=props
    const {findGroupByName,groupInfo}=groupStore

    const name = `${match.params.name}`
    useEffect(()=>{
        findGroupByName(name)
    },[])
    return (
        <div >
            {
                groupInfo&&
                <DomainUser
                    {...props}
                    domainId={groupInfo.groupId}
                    bgroup = {"gitpuk"}
                />
            }

        </div>
    )
}

export default observer(RepositoryGroupUser);
