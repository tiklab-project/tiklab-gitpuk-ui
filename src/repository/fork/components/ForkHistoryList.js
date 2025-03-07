
/**
 * fork历史表
 * @param props
 */
import React,{useState,useEffect} from 'react';
import forkStore from "../store/ForkStore";
import {inject, observer} from "mobx-react";
import "./ForkHistoryList.scss"
import {Col, Select, Table} from "antd";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Listicon from "../../../common/list/Listicon";
import UserIcon from "../../../common/list/UserIcon";
import {LockOutlined, UnlockOutlined} from "@ant-design/icons";
import Page from "../../../common/page/Page";
import SearchInput from "../../../common/input/SearchInput";
const ForkHistoryList = (props) => {
    const {repositoryStore} = props

    const {findRepositoryForkPage}=forkStore
    const {repositoryInfo} = repositoryStore

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()
    const [pageSize]=useState(15)

    const [repForkList,setRepForkList]=useState([])
    const [repositoryName,setRepositoryName]=useState()
    const [rules,setRules]=useState()

    useEffect(()=>{
        getRepositoryForkPag(currentPage)
    },[rules])

    const columns = [
        {
            title: '仓库名称',
            dataIndex: 'name',
            key: 'name',
            width:'40%',
            render:(text,record)=>{
                return (
                    <div className='fork-repository-name' onClick={()=>goDetails(record.repository)}>
                        <Listicon text={record.repository.name}
                                  colors={record.repository.color}
                                  type={"common"}
                        />
                        <div className='fork-history-text-name '>
                            {record?.repository.address}
                        </div>
                    </div>

                )
            }
        },
        {
            title: 'fork用户',
            dataIndex: ['user','nickname'],
            key: 'user',
            width:'20%',
            ellipsis:true,
            render:(text,record)=><div className='fork-history-icon-user'>
                <UserIcon text={record?.user?.nickname?text:record?.user?.name} size={"small"}/>
                <div>{record?.user?.nickname?text:record?.user?.name}</div>
            </div>
        },
        {
            title: '可见范围',
            dataIndex: 'rules',
            key: 'rules',
            width:'20%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='fork-repository-name'>
                        {record.repository.rules==='private'?
                            <div className='fork-history-icon-auth'>
                                <LockOutlined/>
                                <span>私有</span>
                            </div>:
                            <div className='fork-history-icon-auth'>
                                <UnlockOutlined />
                                <span>公开</span>
                            </div>
                        }
                    </div>
                )}
        },
        {
            title: 'fork时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width:'20%',
            ellipsis:true,
        },

    ]

    //分页查询仓库fork
    const getRepositoryForkPag = (currentPage,repositoryName) => {
        findRepositoryForkPage({ pageParam:{currentPage:currentPage,pageSize:pageSize},
            repositoryId:repositoryInfo.rpyId,
            repositoryName:repositoryName,
            rules:rules,
        }).then(res=>{
            if (res.code===0){
                setRepForkList(res.data?.dataList)
                setTotalPage(res.data.totalPage)
                setCurrentPage(res.data.currentPage)
                setTotalRecord(res.data.totalRecord)
            }
        })
    }

    const goDetails = (record) => {
        props.history.push(`/repository/${record.address}/code`)
    }

    //分页查询
    const changPage = (value) => {
        setCurrentPage(value)
        getRepositoryForkPag(value,repositoryName)
    }

    //刷新
    const refreshFind = () => {
        getRepositoryForkPag(currentPage,repositoryName)
    }

    const onChangeSearch = (e) => {
        const value=e.target.value
        setRepositoryName(value)
        if (value===''){
             getRepositoryForkPag(1)
        }
    }

    /**
     * 搜索仓库
     * @returns {Promise<void>}
     */
    const onSearch =async () => {
        await getRepositoryForkPag(1,repositoryName)
    }

    const changAuth = (value) => {
        setRules(value)
    }


    return(
        <div className='xcode page-width drop-down fork-history'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='branch-content'>
                    <BreadcrumbContent firstItem={'Fork历史'} />
                    <div className='fork-history-filter'>
                        <div className='fork-history-select-right'>
                            <SearchInput {...props}
                                         placeholder={"搜索fork仓库名称"}
                                         onChange={onChangeSearch}
                                         onPressEnter={onSearch}
                            />
                            <Select  allowClear onChange={value=>changAuth(value)} style={{minWidth:140}} placeholder='可见范围'>
                                <Select.Option value={"private"}>{"私有"}</Select.Option>
                                <Select.Option value={"public"}>{"公开"}</Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <Table
                            bordered={false}
                            columns={columns}
                            dataSource={repForkList}
                            rowKey={record=>record.id}
                            pagination={false}
                        />
                        <Page pageCurrent={currentPage}
                              changPage={changPage}
                              totalPage={totalPage}
                              totalRecord={totalRecord}
                              refresh={refreshFind}
                        />
                    </div>
                </div>
            </Col>
        </div>
    )

}

export default inject("repositoryStore")(observer(ForkHistoryList))
