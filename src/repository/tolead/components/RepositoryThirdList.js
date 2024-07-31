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
import {Checkbox, Col, message, Select, Spin} from "antd";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {Table} from "antd";
import {SpinLoading} from "../../../common/loading/Loading";
import EmptyText from "../../../common/emptyText/EmptyText";
import ToLeadStore from "../store/ToLeadStore"
import {getUser} from "thoughtware-core-ui";
import Page from "../../../common/page/Page";
import Btn from "../../../common/btn/Btn";
const RepositoryThirdList = (props) => {
    const {match:{params}} = props

    const {findThirdRepositoryList,findLeadAuth,toLeadRepository,findToLeadResult}=ToLeadStore
    const [isLoading,setIsLoading]=useState(false)
    const [repositoryList,setRepositoryList]=useState([])     //第三方仓库list
    const [importedRpyList,setImportedRpyList]=useState([])  //已经导入的仓库list
    const [leadAuth,setLeanAuth]=useState(null)  //认证信息

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()

    const [repositoryRows,setRepositoryRows]=useState([])  //选中的仓库

    const [toLeadState,setToLeadState]=useState(false)  //导入状态

    useEffect( async ()=>{
        findLeadAuth(params.authId).then(res=>{
            setLeanAuth(res.data)
        })
        //获取第三方仓库数据
        getThirdRepositoryList(currentPage)
    },[])



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
                    <Select style={{width:200}} className={'toLea'} defaultValue={text} onChange={(e)=>choiceRule(record,e)}>
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
                    text==='run'&&<div className='third-operate'>导入中</div>||
                    text==="success"&&<div className='third-green'>成功</div>||
                    text==="fail"&&<div className='third-red'>失败</div>
                )
            }
        },
      /*  {
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
        },*/
    ]

    //分页获取第三方仓库数据
    const getThirdRepositoryList = (page) => {
        setIsLoading(true)
        findThirdRepositoryList(params.authId,page).then(res=>{
            setIsLoading(false)
            if (res.code===0){
                setRepositoryList(res.data?.dataList)
                //已经导入的仓库
                const importedRpyList=res.data?.dataList.filter(item=>item.execResult==='success')
                setImportedRpyList(importedRpyList)

                setTotalPage(res.data.totalPage)
                setCurrentPage(res.data.currentPage)
                setTotalRecord(res.data.totalRecord)
            }else {
                if (res.msg.includes("401")){
                    message.error("认证信息无效")
                }else {
                    message.error(res.msg)
                }
            }
        })
    }

    const goThirdRpy = (record) => {
        window.open(record.httpRepositoryUrl)
    }

    //选择权限
    const choiceRule = (value,e) => {
        const rpyList= repositoryList.map(item=>{
            let rule=item.rule;
           if (item.thirdRepositoryId===value.thirdRepositoryId){
               rule=e
           }
            return {...item,rule:rule}
        })
        setRepositoryList(rpyList)

        //修改已经选中的权限
        if (repositoryRows.length>0){
          const rows=  repositoryRows.map(row=>{
                let rowRule=row.rule;
                if (row.thirdRepositoryId===value.thirdRepositoryId){
                    rowRule=e
                }
                return {...row,rule:rowRule}
            })
          setRepositoryRows(rows)
        }
    }

    // 导入第三方仓库
    const excToLead =async (record) => {
        //setRepositoryRows(repositoryRows.filter(key=>key.thirdRepositoryId!==30375669))
        setToLeadState(true)
        toLeadRepository(
            {leadToList:repositoryRows,
                userId:getUser().userId,
                importAuthId:params.authId,
            }
            /*{repositoryName:record.repositoryName,
                groupName:record.groupName,
                repositoryUrl:record.repositoryUrl,
                httpRepositoryUrl:record.httpRepositoryUrl,
                thirdRepositoryId:record.thirdRepositoryId,
                userId:getUser().userId,
                rule:rule,
                importAuthId:params.authId
         }*/).then(record=>{
            if (record.code===0&&record.data==="OK"){
                timeTask(record.thirdRepositoryId)
            }else {
                message.error("导入失败",1)
                setToLeadState(false)
            }
        })
    }

    //定时任务
    const timeTask =async (id) => {
        let timer=setInterval(()=>{
            findToLeadResult(getUser().userId).then(res=>{
                if (res.code===0){
                    editRepository(res.data?.leadToList)
                    if (res.data.grossResult==="success"){
                        clearInterval(timer)
                        message.success("导入成功",1)
                        setToLeadState(false)
                    }
                    if (res.data.grossResult==="fail"){
                        clearInterval(timer)
                        message.error(res.data.msg,1)
                        setToLeadState(false)
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
        getThirdRepositoryList(value)
    }

    //刷新查询
    const refreshFind = () => {
        getThirdRepositoryList(currentPage)
    }

    // 执行中 修改状态
    const editRepository = (leadToList) => {
        const rpyList=repositoryList.map(item=> {
            const lead=leadToList.filter(a=>item.thirdRepositoryId===a.thirdRepositoryId);
            let execResult=item.execResult;
            if (lead&&lead.length>0){
                execResult=lead[0].execResult
                if (execResult==='success'){
                    setRepositoryRows(repositoryRows.filter(key=>key.thirdRepositoryId!==lead[0].thirdRepositoryId))
                }
            }
            return {...item,execResult:execResult}
        })
        setRepositoryList(rpyList)
    }

    /**
     * 已导入的仓库
     * @param record
     * @returns {*}
     */
    const disabledOpt = record =>{
        return importedRpyList && importedRpyList.some(item=>item.thirdRepositoryId===record.thirdRepositoryId)
    }

    //table row 选中切换
    const rowSelection = {
        // 禁止选择
        getCheckboxProps: (record) => ({
            disabled: disabledOpt(record),
        }),
        onChange: (selectedRowKeys, selectedRows) => {
            setRepositoryRows(selectedRows)
        }
    };

    const goBack = () => {
        props.history.push(`/repository/lead`)
    }

    return(
        <div className='xcode gittok-width third'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <BreadcrumbContent firstItem={leadAuth?.type==='priGitlab'?"私有gitlab仓库列表":leadAuth?.type+'仓库列表'} goBack={goBack}/>
                <div className='third-table'>
                    {
                        repositoryRows.length>0&&
                        <div className='third-table-style'>
                            <div>{`已选择${repositoryRows?.length}项`}</div>
                            {
                                toLeadState?
                                    <Btn   type={'primary'} title={'加载中'}/>:
                                    <Btn   type={'primary'} title={'导入'} onClick={excToLead} />
                            }
                        </div>
                    }
                    <Spin  spinning={isLoading} >
                        <Table

                            rowSelection={rowSelection}
                            bordered={false}
                            columns={columns}
                            dataSource={repositoryList}
                            rowKey={record=>record.thirdRepositoryId}
                            pagination={false}
                            locale={{emptyText:  <EmptyText title={"没有仓库数据"}/>}}
                        />
                    </Spin>
                    {
                        <Page pageCurrent={currentPage}
                              changPage={changPage}
                              totalPage={totalPage}
                              totalRecord={totalRecord}
                              refresh={refreshFind}
                        />
                    }
                </div>
            </Col>
        </div>
    )
}
export default observer(RepositoryThirdList)
