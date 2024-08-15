/**
 * @name: RepositoryList
 * @author: limingliang
 * @date: 2023-08-30 14:30
 * @description：提交过的仓库
 * @update: 2023-8-30 14:30
 */

import React, {useState,useEffect} from "react";
import "./CommitRepository.scss"
import BreadcrumbContent from "../../common/breadcrumb/Breadcrumb";
import {Col, Table} from "antd";
import EmptyText from "../../common/emptyText/EmptyText";
import { LockOutlined, UnlockOutlined} from "@ant-design/icons";
import Listicon from "../../common/list/Listicon";
import {inject, observer} from "mobx-react";
const CommitRepository = (props) => {
    const {repositoryStore}=props

    const {findCommitRepository}=repositoryStore
    const [repositoryList,setRepositoryList]=useState([])


    useEffect(async ()=>{
        findCommitRepository().then(res=>{
            res.code===0&&setRepositoryList(res.data)
        })
    },[])

    const columns = [
        {
            title: '仓库名称',
            dataIndex: 'name',
            key: 'name',
            width:'50%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='repository-tables-name' onClick={()=>goDetails(record)}>
                        <Listicon text={text}
                                  type={"common"}
                        />
                        <div className='name-text'>
                            <div className='name-text-title'>
                                <span className='name-text-name'>{ record?.address.substring(0, record?.address.indexOf("/",1))+"/"+record.name}</span>
                                <span className='name-text-lock'>{record.rules==='private'?<LockOutlined/>:<UnlockOutlined />}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        },
        {
            title: '创建人',
            dataIndex: ['user','name'],
            key: 'user',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '推送时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width:'20%',
            ellipsis:true,
            render:text => text?text:'暂无更新'
        }
    ]

    //跳转详情
    const goDetails =async (record) => {
        props.history.push(`/repository/${record.address}/code`)
    }

    return(
        <div className='xcode gittok-width repository'>
            <Col
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: "16", offset: "4" }}
                xl={{ span: "14", offset: "5" }}
            >
                <div style={{minWidth:576}}>
                    <div className='backups-up'>
                        <BreadcrumbContent firstItem={'推送仓库'}/>
                    </div>

                    <div className='repository-table'>
                        <Table
                            bordered={false}
                            columns={columns}
                            dataSource={repositoryList}
                            rowKey={record=>record.id}
                            pagination={false}
                            locale={{emptyText: <EmptyText title={'暂无推送的仓库'}/>}}
                        />
                    </div>
                </div>

            </Col>
        </div>
    )

}
export default inject('repositoryStore')(observer(CommitRepository))
