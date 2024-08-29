/**
 * @name: BasicInfo
 * @author: limingliang
 * @date: 2023-07-12 14:30
 * @description：远程代码库信息
 * @update: 2023-07-12 14:30
 */
import React,{useState,useEffect} from 'react';
import './Remote.scss';
import BreadcrumbContent from "../../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../../common/btn/Btn";
import {Dropdown, Space, Switch, Table, Tooltip, message, Col} from "antd";
import EmptyText from "../../../../common/emptyText/EmptyText";
import remoteStore from "../store/RemoteStore"
import {DeleteOutlined, EditOutlined, EllipsisOutlined, LoadingOutlined, PlayCircleOutlined} from "@ant-design/icons";
import RemoteCompile from "./RemoteCompile";
import {inject, observer} from "mobx-react";
import DeleteExec from "../../../../common/delete/DeleteExec";
const RemoteList = (props) => {
    const {match,repositoryStore}=props

    const {findRepositoryByAddress,repositoryInfo}=repositoryStore
    const {findRemoteInfoList,remoteInfoList,createRemoteInfo,deleteRemoteInfo,updateRemoteInfo,sendOneRepository,findMirrorResult,fresh}= remoteStore

    const [addVisible,setAddVisible] = useState(false)
    const [remoteInfo,setRemoteInfo]=useState(null)
    const [execState,setExecState]=useState([])   //执行状态

    const webUrl = `${match.params.namespace}/${match.params.name}`

    useEffect( ()=>{
        findRepositoryByAddress(webUrl)
         findRemoteInfoList(repositoryInfo.rpyId)
    },[fresh])

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            width:'50%',
            ellipsis:true,
        },
     /*   {
            title: '开启定时',
            dataIndex: 'timedState',
            key: 'timedState',
            width:'20%',
            ellipsis:true,
            render: (text, record) => (
                <Space size="middle">
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={text===0?false:true}  onChange={(r)=>changeTimeState(record)} />
                </Space>
            )
        },*/
        {
            title: '操作',
            dataIndex: 'action',
            key:'action',
            width:'10%',
            ellipsis:true,
            render:(text,record)=>{
                const stateInfo = execState.filter(a=>a.id===record.id)
                return(
                    <Space>
                        <Tooltip title='编辑'>
                            <EditOutlined onClick={()=>updateRemote(record)} />
                        </Tooltip>
                      {/*  <Tooltip title='删除'>
                            <DeleteOutlined  onClick={()=>deleteRemoteInfo(record.id)} className='remote-icon'/>
                        </Tooltip>*/}
                        {
                            (stateInfo&&stateInfo[0]?.state)?
                                <LoadingOutlined  className='remote-icon'/> :
                                <Tooltip title='推送'>
                                    <PlayCircleOutlined className='remote-icon' onClick={()=>sendOneRemote(record)}/>
                                </Tooltip>
                        }
                        <DeleteExec value={record} deleteData={deleteRemoteInfo} title={"确认删除"}/>
                    </Space>
                )
            }
        },
    ]


    //编辑
    const updateRemote = (value) => {
      setAddVisible(true)
       setRemoteInfo(value)
    }
    //关闭
    const closeVisible = () => {
        setRemoteInfo(null)
        setAddVisible(false)
    }

    //修改开启定时任务状态
    const changeTimeState = (value) => {
        updateRemoteInfo({...value,timedState:value.timedState===1?0:1})
    }

    //执行单个镜像
    const sendOneRemote = async (value) => {
        const res=await sendOneRepository(value)
        if (res.code===0&&res.data==="OK"){
            setExecState(execState.concat({id:value.id,state:true}))
            timeTask(value)
        }
    }


    //定时任务
    const timeTask =async (value) => {
        let timer=setInterval(()=>{
            findMirrorResult(value).then(res=>{
                if (res.code===0){
                    if (res.data){
                        if (res.data==="succeed"){
                            updateExecState(value)
                            message.success("推送成功",1)
                            clearInterval(timer)
                        }else {
                            updateExecState(value)
                            message.error(res.data,1)
                            clearInterval(timer)
                        }
                    }
                } else {
                    updateExecState(value)
                    clearInterval(timer)
                }
            })
        },2000)
    }

    const updateExecState = (value) => {
        const newArray = execState.map(function(info) {
            if (info.id === value.id) {
                info.stat = false; // 替换状态
            }
            return info;
        });

        setExecState(newArray)
    }
    return(
       <div className='xcode  remote'>
           <Col
               sm={{ span: "24" }}
               md={{ span: "24" }}
               lg={{ span: "24" }}
               xl={{ span: "20", offset: "2" }}
               xxl={{ span: "18", offset: "3" }}
           >
               <div className='remote-up'>
                   <BreadcrumbContent firstItem={'RemoteInfo'}/>
                   <Btn
                       type={'primary'}
                       title={'添加镜像信息'}
                       onClick={()=>setAddVisible(true)}
                   />
               </div>
               <div className='remote-illustrate'>
                   <div>
                       配置信息,向其他仓库推送仓库信息(支持gitlab、gitee、github 注：github仅支持个人令牌校验)
                   </div>
               </div>
               <Table
                   bordered={false}
                   columns={columns}
                   dataSource={remoteInfoList}
                   rowKey={record=>record.groupId}
                   pagination={false}
                   locale={{emptyText: <EmptyText title={'暂无配置'}/>}}
               />
           </Col>
           <RemoteCompile
               visible={addVisible}
               setOpen={closeVisible}
               createRemoteInfo={createRemoteInfo}
               updateRemoteInfo={updateRemoteInfo}
               rpyId={repositoryInfo.rpyId}
               remoteInfo={remoteInfo}
           />
       </div>
    )
}
export default  inject('repositoryStore')(observer(RemoteList))
