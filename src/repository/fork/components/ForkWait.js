/**
 * fork执行界面
 * @param props
 */
import React,{useState,useEffect} from 'react';
import forkStore from "../store/ForkStore";
import {Col, message} from "antd";
import {inject, observer} from "mobx-react";
import "./ForkWait.scss"
import {Loading3QuartersOutlined, LoadingOutlined, SyncOutlined} from "@ant-design/icons";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
const ForkWait = (props) => {
    const {repositoryStore,location} = props

    const {findForkResult,forkState,setForkState}=forkStore
    const {repositoryInfo,findRepositoryByAddress} = repositoryStore
    const [repName,setRepName]=useState()
    const [repPath,setRepPath]=useState()

    useEffect(()=>{
        const path = location.pathname.replace(/\/forkWait$/,"/code");
        const name = path.split('/')[3];
        const repPath = path.split('/').slice(2, 4).join('/');
        setRepName(name)
        setRepPath(repPath)
        if (forkState){
            timeTask(path)
        }
    },[forkState])

    //定时任务
    const timeTask =async (path) => {
        let timer=setInterval(()=>{
            findForkResult(repositoryInfo.rpyId).then(res=>{
                if (res.code===0){
                    if (res.data===200){
                        message.success("仓库fork成功，刷新界面",1)
                        setForkState(false)
                        const repPath = path.split('/').slice(2, 4).join('/');
                        findRepositoryByAddress(repPath).then(res=>{
                            res.code===0&& props.history.push(path)
                        })
                        clearInterval(timer)
                    }
                    if (res.data===400){
                        setForkState(false)
                        message.success("仓库fork成功失败，请返回重新fork",1)
                        clearInterval(timer)
                    }
                }
            })
        },2000)
    }


    return(
        <div className='xcode code page-width'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
               {/* <BreadcrumbContent firstItem={"Code"} secondItem={repName}/>*/}
                <div className='fork-wait-title'>
                    <span>代码</span>
                    <span>/</span>
                    <span>{repName}</span>
                </div>
                <div className='fork-wait-nav'>
                    <div>Forked from</div>
                    <div>{repPath}</div>
                </div>
                <div className='fork-wait'>
                    <div className='fork-wait-data-style'>
                        <div>
                            <Loading3QuartersOutlined style={{fontSize:20}} spin/>
                        </div>
                        <div className='fork-wait-data-title'>
                            <div>{`正在执行Fork`}</div>
                        </div>
                    </div>
                    <div className='fork-wait-data-text'>{`请等待,正在导入仓库${repName}，完成后自动刷新界面...`}</div>
                </div>
            </Col>

        </div>
    )
}
export default inject("repositoryStore")(observer(ForkWait))
