/**
 * @name: RepositoryTable
 * @author:
 * @date: 2023-05-22 14:30
 * @description：代码仓库table
 * @update: 2023-05-22 14:30
 */

import React ,{Fragment,useState}from 'react';
import {observer} from "mobx-react";
import {LockOutlined, SettingOutlined, UnlockOutlined} from '@ant-design/icons';
import {Space,Table,Tooltip} from 'antd';
import EmptyText from '../../../common/emptyText/EmptyText';
import Listicon from '../../../common/list/Listicon';
import {SpinLoading} from "../../../common/loading/Loading";
import './RepositoryTable.scss';
import Page from "../../../common/page/Page";
import UserIcon from "../../../common/list/UserIcon";
import Omit from "../../../common/omit/Omit";


const RepositoryTable = props => {

    const {isLoading,repositoryList,createOpenRecord,changPage,totalPage,currentPage,onChange} = props

    const [innerWidth,setInnerWidth]=useState(window.innerWidth)
    /**
     * 跳转代码文件
     * @param text
     * @param record
     */
    const goDetails = (text,record) => {
        createOpenRecord(record.rpyId)
        props.history.push(`/repository/${record.address}/tree`)
    }

    /**
     * 跳转到项目设置
     * @param text
     * @param record
     */
    const goSet = (text,record) => {
        createOpenRecord(record.rpyId)
        props.history.push(`/repository/${record.address}/setting/info`)
    }

    //实时获取浏览器宽度
    window.onresize = function() {
        let windowWidth = window.innerWidth;
        setInnerWidth(windowWidth)
        console.log(windowWidth);
    };


    const columns = [
        {
            title: '仓库名称',
            dataIndex: 'name',
            key: 'name',
            width:'35%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='repository-tables-name' onClick={()=>goDetails(text,record)}>
                        <Listicon text={text} colors={record.color}/>
                        <div className='name-text'>
                            <div className='name-text-title'>
                                <span className='name-text-name text-color'>
                                    {
                                        innerWidth<1550?
                                            <Omit  value={record?.address} maxWidth={300}/>:
                                            <div>{record?.address}</div>
                                    }
                                </span>
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
            dataIndex: ['user','nickname'],
            key: 'user',
            width:'15%',
            ellipsis:true,
            render:(text,record)=><div className='icon-text-user'>
                    <UserIcon text={record?.user?.nickname?text:record?.user?.name} size={"small"}/>
                    <div>{record?.user?.nickname?text:record?.user?.name}</div>
                </div>
        },
        {
            title: '可见范围',
            dataIndex: 'rules',
            key: 'rules',
            width:'15%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='repository-tables-name'>
                        {text==='private'?
                            <div className='icon-text-use'>
                                <LockOutlined/>
                                <span>私有</span>
                            </div>:
                            <div className='icon-text-use'>
                                <UnlockOutlined />
                                <span>公开</span>
                            </div>
                        }
                    </div>
                )}
        },
        {
            title: '大小',
            dataIndex: 'rpySize',
            key: 'rpySize',
            width:'10%',
            ellipsis:true,
            sorter: (a, b) => a.size - b.size,
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
            width:'5%',
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
                onChange={onChange}
            />
            <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>
        </div>
    )
}

export default observer(RepositoryTable)
