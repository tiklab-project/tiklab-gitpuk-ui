/**
 * @name: RepositoryTable
 * @author:
 * @date: 2023-05-22 14:30
 * @description：代码仓库table
 * @update: 2023-05-22 14:30
 */

import React from 'react';
import {observer} from "mobx-react";
import {LockOutlined, SettingOutlined, UnlockOutlined} from '@ant-design/icons';
import {Space,Table,Tooltip} from 'antd';
import EmptyText from '../../../common/emptyText/EmptyText';
import Listicon from '../../../common/list/Listicon';
import {SpinLoading} from "../../../common/loading/Loading";
import './RepositoryTable.scss';
import Page from "../../../common/page/Page";

const RepositoryTable = props => {

    const {isLoading,repositoryList,createOpenRecord,changPage,totalPage,currentPage} = props
    /**
     * 跳转代码文件
     * @param text
     * @param record
     */
    const goDetails = (text,record) => {
        createOpenRecord(record.rpyId)
        props.history.push(`/index/repository/${record.address}/tree`)
    }

    /**
     * 跳转到项目设置
     * @param text
     * @param record
     */
    const goSet = (text,record) => {
        createOpenRecord(record.rpyId)
        props.history.push(`/index/repository/${record.address}/sys/info`)
    }


    const columns = [
        {
            title: '仓库名称',
            dataIndex: 'name',
            key: 'name',
            width:'50%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='repository-tables-name' onClick={()=>goDetails(text,record)}>
                        <Listicon text={text}/>
                        <div className='name-text'>
                            <div className='name-text-title'>
                                <span className='name-text-name'>{ record?.address.substring(0, record?.address.indexOf("/",1))+"/"+record.name}</span>
                                <span className='name-text-lock'>{record.rules==='private'?<LockOutlined/>:<UnlockOutlined />}</span>
                                {
                                    text==="sample-repository"&&
                                    <span className='name-text-type'>{ "示例仓库"}</span>

                                }

                            </div>
                            {
                                record.codeGroup &&
                                <div className='name-text-desc'>{text}</div>
                            }
                        </div>
                    </div>
                )
            }
        },
        {
            title: '负责人',
            dataIndex: ['user','name'],
            key: 'user',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '更新',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width:'20%',
            ellipsis:true,
            render:text => text?text:'暂无更新'
        },
        {
            title: '操作',
            dataIndex: 'action',
            key:'action',
            width:'10%',
            ellipsis:true,
            render:(text,record)=>{
                return(
                    <Space>
                        <Tooltip title='设置'>
                            <span className='repository-tables-set' onClick={()=>goSet(text,record)}>
                                <SettingOutlined className='actions-se'/>
                            </span>
                        </Tooltip>
                        {/*<Tooltip title='收藏'>
                                <span className='repository-tables-collect'>
                                {
                                    record.collect === 1 ?
                                    <svg className='icon' aria-hidden='true'>
                                        <use xlinkHref={`#icon-xingxing1`} />
                                    </svg>
                                    :
                                    <svg className='icon' aria-hidden='true'>
                                        <use xlinkHref={`#icon-xingxing-kong`} />
                                    </svg>
                                }
                                </span>
                        </Tooltip>*/}
                    </Space>
                )
            }
        },
    ]

    return (
        <div className='repository-tables'>
            <Table
                bordered={false}
                columns={columns}
                dataSource={repositoryList}
                rowKey={record=>record.rpyId}
                pagination={false}
                locale={{emptyText: isLoading ?
                        <SpinLoading type="table"/>: <EmptyText title={"没有仓库"}/>}}
            />
            {
                (totalPage>1)?
                <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>:null
            }

        </div>
    )
}

export default observer(RepositoryTable)
