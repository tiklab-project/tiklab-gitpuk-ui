/**
 * @name: Code
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：代码
 * @update: 2022-12-30 10:30
 */
import React, {useEffect,useState,useRef,} from "react";
import {Input, Dropdown, Col} from "antd";
import {inject, observer} from "mobx-react";
import fileStore from "../store/FileStore";
import tagStore from "../../tag/store/TagStore";
import "./code.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import BreadChang from "./BreadChang";
import {findType, setFileAddress} from "../../file/components/Common";
const Code = (props) => {

    const {repositoryStore,location,match} = props
    const {findRepositoryByAddress,repositoryInfo} = repositoryStore
    const {findFileTree,codeTreeData,findCloneAddress,cloneAddress,findLatelyBranchCommit,latelyBranchCommit} = fileStore
    const {findTagByName} = tagStore

    const webUrl = `${match.params.namespace}/${match.params.name}`
    const fileAddress = setFileAddress(location,webUrl+"/code/"+urlInfo)

    //分支
    const [branch,setBranch]=useState()
    const [data,setData]=useState()

    useEffect(()=>{
        setBranch(repositoryInfo.defaultBranch)
    },[])

    useEffect(async ()=>{
        if(repositoryInfo.name){
            // 获取文件，同时监听路由变化
            findFileTree({
                rpyId:repositoryInfo.rpyId,
                path:fileAddress[1],
                branch:branch,
                findType:findType(urlInfo)
            }).then(res=>{
                setIsLoading(false)
                res.code===500001 && props.history.push("/404")
            })

            // 获取文件地址
            findCloneAddress(repositoryInfo.rpyId)
        }
    },[repositoryInfo.name,location.pathname])

    return(
        <div className="xcode code gittok-width">
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className="code-content">
                    <BreadcrumbContent firstItem={"Code"}/>
                    <div className="code-content-head">
                        <BreadChang
                            {...props}
                            repositoryInfo={repositoryInfo}
                            branch={branch}
                            type={"code"}
                        />
                    </div>
                </div>
            </Col>
        </div>
    )

}
export default inject("repositoryStore")(observer(Code))
