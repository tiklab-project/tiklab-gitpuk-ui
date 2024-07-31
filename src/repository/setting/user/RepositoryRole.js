/**
 * 仓库权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

import React,{useEffect} from "react";
import { DomainRole } from 'thoughtware-privilege-ui';
import { inject, observer } from "mobx-react";
import { Row, Col } from "antd";

const RepositoryRole = props =>{
    const{match,repositoryStore}=props
    const {findRepositoryByAddress,repositoryInfo}=repositoryStore

    const webUrl = `${match.params.namespace}/${match.params.name}`
    useEffect(()=>{
        findRepositoryByAddress(webUrl)
    },[])

    return (
        <div className='xcode'>
            <DomainRole
                {...props}
                domainId={repositoryInfo.rpyId}
                bgroup = {"gittok"}
            />
        </div>

    )


}
export default inject("privilegeDomainRoleStore","repositoryStore")(observer(RepositoryRole));
