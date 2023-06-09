/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: 李明亮
 * @Date: 2023-01-03 19:56:02
 * @LastEditors: 李明亮
 * @LastEditTime: 2023-01-03 19:56:02
 */
import React ,{useEffect}from "react";
import {DomainUser} from "tiklab-user-ui";
import { inject, observer } from "mobx-react";

const ProgramUser =(props)  => {
    const{repositoryStore}=props
    const {findRepository,repositoryInfo}=repositoryStore

   const rpyId= props.match.params.rpyId
    return (
        <div >
            <DomainUser
                {...props}
                domainId={rpyId}
                bgroup = {"xcode"}
            />
        </div>
    )
}

export default inject("domainUserStore","repositoryStore")(observer(ProgramUser));
