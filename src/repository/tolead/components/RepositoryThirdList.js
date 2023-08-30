/**
 * @name: RepositoryTable
 * @author:
 * @date: 2023-08-03 14:30
 * @description：第三方仓库的列表
 * @update: 2023-08-03 14:30
 */
import React,{useState,useEffect} from 'react';
import {observer} from "mobx-react";
import './RepositoryToLead.scss';
import "./RepositoryThirdList.scss"
import {Checkbox, message, Select} from "antd";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {Space, Table, Tooltip} from "antd";
import {SpinLoading} from "../../../common/loading/Loading";
import EmptyText from "../../../common/emptyText/EmptyText";
import ToLeadStore from "../store/ToLeadStore"
import {getUser} from "tiklab-core-ui";
import Page from "../../../common/page/Page";
import {text} from "node-forge/lib/util";
const RepositoryThirdList = (props) => {
    const {match:{params}} = props

    const {findThirdRepositoryList,toLeadRepository,findToLeadResult}=ToLeadStore
    const [isLoading,setIsLoading]=useState(false)
    const [repositoryList,setRepositoryList]=useState([])


    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState(10)

    const [showHeader,setShowHeader]=useState(true)  //table 头是否展示
    const [repositoryRows,setRepositoryRows]=useState([])  //选中的仓库

    const [rule,setRule]=useState("private")
    const columns=[
        {
            title: '仓库路径',
            dataIndex: 'repositoryUrl',
            key: 'repositoryUrl',
            width:'40%',
            ellipsis:true,
            render:(text,record)=>(
                <div className='third-operate' onClick={()=>goThirdRpy(record)}>{text}</div>
            )
        },
        {
            title: '权限',
            dataIndex: 'rule',
            key: 'rule',
            width:'40%',
            ellipsis:true,
            render:(text,record)=>{
                return(
                    !record.execResult?
                    <Select style={{width:200}} className={'toLea'} value={rule} onChange={choiceRule}>
                        <Select.Option value={"private"}>私有(仅仓库成员可看)</Select.Option>
                        <Select.Option value={"public"}>公开(任何人都能看)</Select.Option>
                    </Select>:
                         text==="public"? <div style={{paddingLeft:10}}>公开(任何人都能看)</div>:<div style={{paddingLeft:10}}>私有(仅仓库成员可看)</div>
                )
            }
        },
        {
            title: '导入状态',
            dataIndex: 'execResult',
            key: 'execResult',
            width:'20%',
            ellipsis:true,
            render:(text)=>{
                return(
                   !text&&<div className='third-gray'>未导入</div>||
                    text==="success"&&<div className='third-green'>成功</div>||
                    text==="error"&&<div className='third-red'>失败</div>
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'repositoryNum',
            key: 'repositoryNum',
            width:'20%',
            ellipsis:true,
            render:(text,record)=>{
                return(
                    <span className='third-operate' onClick={()=>excToLead(record)}>
                       导入
                    </span>
                )
            }
        },
    ]
    useEffect( async ()=>{
        setIsLoading(true)
       const res=await findThirdRepositoryList(params.authId,1)
        if (res.code===0){
            setRepositoryList(res.data)
        }
        setIsLoading(true)
    },[])

    const goThirdRpy = (record) => {
        window.open(record.httpRepositoryUrl)
    }

    //选择权限
    const choiceRule = (value) => {
        setRule(value)
    }

    // 导入第三方仓库
    const excToLead =async (record) => {
        //gitlab
       const res=await toLeadRepository(
           {repositoryName:record.repositoryName,
               groupName:record.groupName,
               repositoryUrl:record.repositoryUrl,
               httpRepositoryUrl:record.httpRepositoryUrl,
               thirdRepositoryId:record.thirdRepositoryId,
               userId:getUser().userId,
               rule:rule,
               importAuthId:params.authId
        })
        if (res.code===0&&res.data==="OK"){
            timeTask(record.id)
        }
    }

    //定时任务
    const timeTask =async (id) => {
        let timer=setInterval(()=>{
            findToLeadResult(id).then(res=>{
                if (res.code===0){
                    if (res.data.includes("success")){
                        clearInterval(timer)
                        message.success("推送成功",1)
                    }
                    if (res.data.includes("error")){
                        clearInterval(timer)
                        message.error("推送失败",1)
                    }
                }else {
                    clearInterval(timer)
                }
            })
        },2000)
    }

    /**
     * 分页
     */
    const changPage =async (value) => {
        setCurrentPage(value)
        const res=await findThirdRepositoryList(params.authId,value)
        if (res.code===0){
            setRepositoryList(res.data)
        }
    }

    const goBack = () => {
        props.history.push(`/index/repository/lead`)
    }

    //table row 选中切换
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setShowHeader(false);
            setRepositoryRows(selectedRows)
            const a=selectedRows

        }
    };

    //取消选中
    const cancelOpt =async () => {
        setShowHeader(true);
            rowSelection

        setRepositoryRows([])
    }
    const tableProps = {
        showHeader
    };
    return(
        <div className='third'>
            <div className='xcode-home-limited xcode'>
                <BreadcrumbContent firstItem='Gitlab仓库列表' goBack={goBack}/>
                <div className='third-table'>
                    {
                        !showHeader&&
                        <div>
                            <Checkbox  defaultChecked={true} onChange={cancelOpt}/>
                            <div>{`已选择${repositoryRows?.length}项`}</div>
                        </div>
                    }
                    <div></div>
                    <Table
                        {...tableProps}
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                            checkStrictly:false
                        }}
                        bordered={false}
                        columns={columns}
                        isLoading={isLoading}
                        dataSource={repositoryList}
                        rowKey={record=>record.id}
                        pagination={false}
                        locale={{emptyText: isLoading ?
                                <SpinLoading type="table"/>: <EmptyText title={"没有仓库"}/>}}
                    />
                    {

                            <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>
                    }
                </div>
            </div>
        </div>
    )
}
export default observer(RepositoryThirdList)
