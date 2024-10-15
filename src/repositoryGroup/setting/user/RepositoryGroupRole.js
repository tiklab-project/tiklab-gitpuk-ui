/**
 * 仓库权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

import React,{useEffect,useState} from "react";
import { DomainRole } from 'tiklab-privilege-ui';
import { inject, observer } from "mobx-react";
import { Row, Col } from "antd";
import groupStore from "../../repositoryGroup/store/RepositoryGroupStore"
const RepositoryGroupRole = props =>{
    const{match}=props
    const {findGroupByName}=groupStore

    const name = `${match.params.name}`
    const [groupInfo,setGroupInfo]=useState()
    useEffect(()=>{
        findGroupByName(name).then(res=>{
            setGroupInfo(res.data)
        })
    },[])
    return (
        <Row>
            {
                groupInfo&&
                <Col lg={{ span: 24 }} xxl={{ span: "18", offset: "3" }}>
                    <DomainRole
                        {...props}
                        domainId={groupInfo?.groupId}
                        bgroup = {"gitpuk"}
                    />
                </Col>
            }
        </Row>
    )


}
export default inject("privilegeDomainRoleStore")(observer(RepositoryGroupRole));
