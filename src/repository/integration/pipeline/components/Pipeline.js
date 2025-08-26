
/**
 * @Description: 流水线
 * @Author: limingliang
 * @Date: 2025/4/2
 * @LastEditors: limingliang
 * @LastEditTime: 2025/4/2
 */
import React,{useEffect,useState} from 'react';
import Btn from '../../../../common/btn/Btn';
import './Pipeline.scss';
import {Col, Space, Spin, Table, Tooltip} from "antd";
import {inject, observer} from "mobx-react";
import BreadcrumbContent from "../../../../common/breadcrumb/Breadcrumb";
import PipelinePop from "./PipelinePop";
import SystemIntStore from "../../../../setting/integration/systemInt/store/SystemIntStore";
import Listicon from "../../../../common/list/Listicon";
import { findIntPath, renIcon} from "./Commonet";
import UserIcon from "../../../../common/list/UserIcon";
import {
    LockOutlined,
    UnlockOutlined
} from "@ant-design/icons";
import Page from "../../../../common/page/Page";
import DeleteExec from "../../../../common/delete/DeleteExec";
import IntegrateInStore from "../../store/IntegrateInStore";
import orderEmpty from "../../../../assets/images/img/orderEmpty.png";
import emptyContent from "../../../../assets/images/img/empty-content.png";
const Pipeline = props => {
    const {repositoryStore,match} = props
    const webUrl = `${match.params.namespace}/${match.params.name}`

    const {repositoryInfo} = repositoryStore
    const {fresh,findRelevancePipelinePage,deleteIntRelevancy}=IntegrateInStore

    const {findIntegrationInfo,integrationAddress}=SystemIntStore


    const [addVisible,setAddVisible]=useState(false)
    const [findState,setFindState]=useState(false)


    //条件查询所有的流水线list
    const [pipelineList,setPipelineList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()
    const [pageSize]=useState(15)


    useEffect(()=>{
        findIntegrationInfo("arbess").then(res=>{
            if (res.code===0){
                setFindState(true)
                findPipelineList(res.data,currentPage)
            }
        })
    },[webUrl,fresh])


    //查询关联流水线list
    const findPipelineList =  (integrationAddress,currentPage) => {
        findRelevancePipelinePage({
            address:integrationAddress.integrationAddress,
            userName:integrationAddress.account,
            password:integrationAddress.password,
            repositoryId:repositoryInfo.rpyId,
            type:"pipeline",
            pageParam:{currentPage:currentPage, pageSize:pageSize}
        }).then(res=>{
            setFindState(false)
            if (res.code===0){
                if (res.data){
                    setPipelineList(res.data.dataList)
                    setTotalPage(res.data.totalPage)
                    setCurrentPage(res.data.currentPage)
                    setTotalRecord(res.data.totalRecord)
                }else {
                    setPipelineList([])
                    setTotalPage(0)
                    setCurrentPage(1)
                    setTotalRecord(0)
                }
            }

        })
    }


    //分页查询
    const changPage = (value) => {
        setFindState(true)
        setCurrentPage(value)
        findPipelineList(integrationAddress,value)
    }

    const refreshFind = () => {
        setFindState(true)
        findPipelineList(integrationAddress,currentPage)
    }

    //打开弹窗
    const openPop = () => {
      setAddVisible(true)
    }

    //跳转流水线
    const goArbess = (value) => {
        const intPath=findIntPath(integrationAddress.integrationAddress)
        window.open(`${intPath}/#/pipeline/${value.id}/config`)
    }



    const columns = [
        {
            title: "流水线名称",
            dataIndex: "name",
            key: "name",
            width:"28%",
            ellipsis:true,
            render:(text,record)=>{
                return  <span className='pipelineTable-name' onClick={()=>goArbess(record)}>
                             <Listicon text={text} colors={record.color} type={"common"}/>
                            <span>{text}</span>
                        </span>
            }
        },
        {
            title: "最近构建信息",
            dataIndex: "lastBuildTime",
            key: "lastBuildTime",
            width:"28%",
            ellipsis:true,
            render:(text,record) =>{
                const {buildStatus,number} = record
                return (
                    <span>
                        { text || '无构建' }
                        { number &&
                            <span className='pipeline-number'># {number}
                                <span className='pipeline-number-desc'>{renIcon(buildStatus)}</span>
                            </span>
                        }
                    </span>
                )
            }
        },
        {
            title: "负责人",
            dataIndex: ["user","nickname"],
            key: "user",
            width:"17%",
            ellipsis: true,
            render:(text,record) => {
                return (
                    <Space>
                        <UserIcon text={record?.user?.nickname?text:record?.user?.name} size={"small"}/>
                        <div>{record?.user?.nickname?text:record?.user?.name}</div>
                    </Space>
                )
            }
        },
        {
            title: "可见范围",
            dataIndex: "power",
            key: "power",
            width:"13%",
            ellipsis: true,
            render:text => {
                switch (text) {
                    case 1:
                        return  <Space>
                            <UnlockOutlined />
                            全局
                        </Space>
                    case 2:
                        return  <Space>
                            <LockOutlined />
                            私有
                        </Space>
                }
            }
        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => {
                return(
                    <DeleteExec value={record} repositoryId={repositoryInfo.rpyId}
                                deleteData={deleteIntRelevancy}
                                type={"pipeline"}
                                title={"确认移除"}
                    />
                )
            }
        },
    ]


    return (
        <div className='xcode page-width pipeline'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div>
                    <div className='pipeline-head'>
                        <BreadcrumbContent firstItem={'CI/CD'}/>
                        {
                            pipelineList.length>0&&
                            <Btn type={'primary'} title={'关联CI/CD'} onClick={openPop} />
                        }
                    </div>

                    {
                        pipelineList.length>0?
                            <div className='pipeline-tab'>
                                <Spin spinning={findState}>
                                    <Table
                                        bordered={false}
                                        columns={columns}
                                        dataSource={pipelineList}
                                        rowKey={record=>record.id}
                                        pagination={false}
                                    />
                                </Spin>

                                <Page pageCurrent={currentPage}
                                      changPage={changPage}
                                      totalPage={totalPage}
                                      totalRecord={totalRecord}
                                      refresh={refreshFind}
                                />
                            </div>:

                            <div className='pipeline-content'>
                                <div className='pipeline-content-details'>
                                    <img  src={emptyContent} className='pipeline-content-img'/>
                                    <div className='pipeline-content-title'>集成CI/CD</div>
                                    <div >有效的集成Arbess流水线,有效方便的管理仓库的代码，将代码持续快速的部署到产品环境中</div>
                                    <div className='pipeline-add-btn' onClick={openPop}>
                                        <Btn type={'primary'} title={'关联CI/CD'}/>
                                    </div>
                                </div>
                            </div>
                    }


                </div>

            </Col>

            <PipelinePop {...props} visible={addVisible}
                         setVisible={setAddVisible}
                         integrationAddress={integrationAddress}
                         repositoryId={repositoryInfo.rpyId}
                         relevancyPipelineList={pipelineList}
            />
        </div>
    )
}

export default inject('repositoryStore')(observer(Pipeline))
