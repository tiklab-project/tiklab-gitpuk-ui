/**
 * @name: RepositoryTable
 * @author:
 * @date: 2023-05-22 14:30
 * @description：代码仓库table
 * @update: 2023-05-22 14:30
 */

import React ,{useState,useEffect}from 'react';
import {observer} from "mobx-react";
import {LockOutlined, SettingOutlined, UnlockOutlined} from '@ant-design/icons';
import {Table,Tooltip} from 'antd';
import EmptyText from '../../../common/emptyText/EmptyText';
import Listicon from '../../../common/list/Listicon';
import {SpinLoading} from "../../../common/loading/Loading";
import './RepositoryTable.scss';
import Page from "../../../common/page/Page";
import UserIcon from "../../../common/list/UserIcon";

import RepositoryCollectStore from "../store/RepositoryCollectStore";
import {getUser} from "thoughtware-core-ui";

import xingxing from "../../../assets/images/img/xingxing.png"

const RepositoryTable = props => {

    const {isLoading,repositoryList,createOpenRecord,changPage,totalPage,currentPage,onChange,type,getRpyData,tab,totalRecord,refreshFind} = props
    const [innerWidth,setInnerWidth]=useState(window.innerWidth)

    const {createRepositoryCollect,deleteCollectByRpyId,findRepositoryCollectList}=RepositoryCollectStore

    const userId = getUser().userId;
    const [collectList,setCollectList]=useState([]);

    const [columnList,setColumnList]=useState([])
    const [tabType,setTabType]=useState()

    useEffect(async ()=>{
        getCollect(userId)

        if (type==='repository'){
            setColumnList(columns.concat([{
                title: '操作',
                dataIndex: 'action',
                key:'action',
                width:'10%',
                ellipsis:true,
                render:(text,record)=>{
                    return(
                        <div className='table-nav'>
                            <Tooltip title='收藏'>
                                <span className='repository-tables-collect'>
                                {
                                    collectList.indexOf(record.rpyId)!== -1 ?
                                /*        <svg className='icon' aria-hidden='true' onClick={()=>compileCollect(record,'cancel')}>
                                            <use xlinkHref={`#icon-xingxing1`} />
                                        </svg>*/
                                        <img src={xingxing} alt={"收藏"} width={19} height={19} onClick={()=>compileCollect(record,'cancel')}/>
                                    :
                                        <svg className='icon' aria-hidden='true' onClick={()=>compileCollect(record,'add')}>
                                            <use xlinkHref={`#icon-xingxing-kong`} />
                                        </svg>
                                }
                                </span>
                            </Tooltip>
                            <Tooltip title='设置'>
                            <span className='repository-tables-set' onClick={()=>goSet(text,record)}>
                                <SettingOutlined className='actions-se'/>
                            </span>
                            </Tooltip>
                        </div>
                    )
                }
            }]))
        }else {
            setColumnList(columns)
        }
        if (tab==='collect'){
            setTabType('collect')
        }
    },[collectList])
    /**
     * 跳转代码文件
     * @param text
     * @param record
     */
    const goDetails = (text,record) => {
        createOpenRecord(record.rpyId)
        props.history.push(`/repository/${record.address}/code`)
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

    //查询收藏
    const getCollect = (id) => {
        findRepositoryCollectList({ userId: id }).then(res => {
            if (res.code === 0) {
                const focusList = res.data;
                focusList.map(item => {
                    collectList.push(item.repositoryId)
                })
                setCollectList(collectList)
            }
        })
    }

    //收藏
    const compileCollect = (repository,type) => {
        //取消收藏
        if (type==="cancel"){
            deleteCollectByRpyId(repository.rpyId).then(res=>{
                if (res.code===0){
                    const data= collectList.filter(item=>item!=repository.rpyId)
                    if (tabType==='collect'){
                        getRpyData()
                    }
                    setCollectList(data)
                }
            })
        }else {
            createRepositoryCollect({
                repositoryId: repository.rpyId,
                user: {
                    id: getUser().userId
                }
            }).then(res=>{
                if (res.code===0){
                    collectList.push(repository.rpyId)
                    setCollectList([...collectList])
                }
            })
        }
    }


    const columns = [
        {
            title: '仓库名称',
            dataIndex: 'name',
            key: 'name',
            width:'40%',

            render:(text,record)=>{
                return (
                    <div className='repository-tables-name' onClick={()=>goDetails(text,record)}>
                        <Listicon text={text}
                                  colors={record.color}
                                  type={"common"}
                        />
                        {
                            record.category===1?
                            <div className='name-text'>
                                <div className='name-text-title'>
                                    <div className=' text-color'>
                                        <div className='name-text-name'>{ record?.address.substring(0, record?.address.indexOf("/",1))+"/"+record.name}</div>
                                    </div>

                                    <div className='name-text-type'>{ "示例仓库"}</div>
                                </div>
                            </div>
                                :
                            <div className='official-text-name'>
                                { record?.address.substring(0, record?.address.indexOf("/",1))+"/"+record.name}
                            </div>
                        }
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
            width:'10%',
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

    ]

    return (
        <div className='repository-tables'>
            <Table
                bordered={false}
                columns={columnList}
                dataSource={repositoryList}
                rowKey={record=>record.rpyId}
                pagination={false}
                locale={{emptyText: isLoading ?
                        <SpinLoading type="table"/>: <EmptyText title={"暂无仓库数据"}/>}}
                onChange={onChange}
            />
            <Page pageCurrent={currentPage}
                  changPage={changPage}
                  totalPage={totalPage}
                  totalRecord={totalRecord}
                  refresh={refreshFind}
            />
        </div>
    )
}

export default observer(RepositoryTable)
