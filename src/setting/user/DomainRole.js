import React,{useEffect} from "react";
import { DomainRole } from 'tiklab-privilege-ui';
import { inject, observer } from "mobx-react";
import { Row, Col } from "antd";

/**
 * 项目权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainRoleContent = props =>{
    const{repositoryStore}=props
    const {findNameRpy,repositoryInfo}=repositoryStore


    useEffect(async () => {
       findNameRpy(props.match.params.name)
    }, [props.match.params.name]);

    const projectId = repositoryInfo.rpyId;
    return (
        <Row>
            <Col lg={{ span: 24 }} xxl={{ span: "18", offset: "3" }}>
                <DomainRole
                    {...props}
                    domainId={projectId}
                    bgroup = {"xcode"}
                />
            </Col>
        </Row>
    )


}
export default inject("privilegeDomainRoleStore","repositoryStore")(observer(DomainRoleContent));
