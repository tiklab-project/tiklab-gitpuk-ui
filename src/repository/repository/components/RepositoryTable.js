/**
 * @name: RepositoryTable
 * @author:
 * @date: 2023-05-22 14:30
 * @description：代码仓库table
 * @update: 2023-05-22 14:30
 */

import React ,{useState,useEffect}from 'react';
import {inject, observer} from "mobx-react";
import {
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    LockOutlined,
    SettingOutlined, StarFilled,
    UnlockOutlined
} from '@ant-design/icons';
import {Dropdown, Menu, Table, Tooltip} from 'antd';
import EmptyText from '../../../common/emptyText/EmptyText';
import Listicon from '../../../common/list/Listicon';
import {SpinLoading} from "../../../common/loading/Loading";
import './RepositoryTable.scss';
import Page from "../../../common/page/Page";
import UserIcon from "../../../common/list/UserIcon";

import RepositoryCollectStore from "../store/RepositoryCollectStore";
import {getUser} from "tiklab-core-ui";

import xingxing from "../../../assets/images/img/xingxing.png"
import {PrivilegeProjectButton} from "tiklab-privilege-ui";
import RepositoryDeletePop from "../../../common/repository/RepositoryDeletePop";
import RepositoryUpdatePop from "./RepositoryUpdatePop";

const RepositoryTable = props => {

    const {isLoading,repositoryList,createOpenRecord,onChange,type,getRpyData,tab,
      deleteRpy,updateRpy,systemRoleStore} = props

    const {getInitProjectPermissions} = systemRoleStore
    const [innerWidth,setInnerWidth]=useState(window.innerWidth)

    const {createRepositoryCollect,deleteCollectByRpyId,findRepositoryCollectList}=RepositoryCollectStore

    const userId = getUser().userId;
    const [collectList,setCollectList]=useState([]);

    const [columnList,setColumnList]=useState([])
    const [tabType,setTabType]=useState()

    //删除弹窗
    const [deleteVisible,setDeleteVisible]=useState(false)

    //更新弹窗状态
    const [updateVisible,setUpdateVisible]=useState(false)
    const [repository,setRepository]=useState(null)


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
                                        <Tooltip title='取消收藏'>
                                            <StarFilled className={"icon-text-collect"}  onClick={()=>compileCollect(record,"cancel")}/>
                                        </Tooltip>
                                    :
                                        <Tooltip title='收藏'>
                                            <StarFilled className={"icon-text-size"}  onClick={()=>compileCollect(record,"add")}/>
                                        </Tooltip>
                                }
                                </span>
                            </Tooltip>
                            <Tooltip title='更多'>
                                <span className='repository-tables-set' onClick={()=>findAuth(record)}>
                                 {/*   <SettingOutlined className='actions-se'/>*/}
                                     <Dropdown    overlay={()=>execPullDown(record)}
                                                  placement="bottomRight"
                                                  trigger={['click']}
                                                 /* getPopupContainer={e => e.parentElement}*/
                                     >
                                        <EllipsisOutlined style={{fontSize:25}}/>
                                     </Dropdown>
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
    const goSet = (record) => {
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

    //查询权限
    const findAuth = (value) => {
        // 获取项目权限
        getInitProjectPermissions(getUser().userId,value.rpyId,value.data?.rules==='public')
    }

    //打开删除弹窗
    const openEditePop = (value) => {
        setUpdateVisible(true)
        setRepository(value)
    }

    //打开删除弹窗
    const openDeletePop = (value) => {
      setDeleteVisible(true)
      setRepository(value)
    }

    const closeDeletePop = () => {
        setDeleteVisible(false)
    }


    /**
     * 操作下拉
     */
    const execPullDown=(value) => (
        <Menu>
            <Menu.Item  style={{width:120}} onClick={()=>openEditePop(value)}>
                <div className='repository-nav-style'>
                    <div><EditOutlined /></div>
                    <div>编辑</div>
                </div>
            </Menu.Item>
            <PrivilegeProjectButton code={"rpy_delete"} domainId={value.rpyId}>
                <Menu.Item>
                    <div onClick={()=>openDeletePop(value)} className='table-nav-style'>
                        <div className='repository-nav-style'>
                            <div><DeleteOutlined /></div>
                            <div>删除</div>
                        </div>
                    </div>
                </Menu.Item>
            </PrivilegeProjectButton >
            <Menu.Item  style={{width:120}} onClick={()=>goSet(value)}>
                <div className='repository-nav-style'>
                    <div><SettingOutlined /></div>
                    <div>设置</div>
                </div>
            </Menu.Item>
        </Menu>
    );




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
                            <div className='rpy-name-text'>
                                <div className='name-text-title'>
                                    <div>
                                        <div className='name-text-name'>{ record?.address}</div>
                                    </div>
                                    {/*<div className='name-text-type'>{ "示例仓库"}</div>*/}
                                </div>
                                <div className='rpy-text-group'>{record?.name}</div>
                            </div>
                                :
                                <div className='official-text'>
                                    <div className='official-text-name '>
                                        { record?.address}

                                    </div>
                                    <div className='official-text-group'>{record.name}</div>
                                </div>

                        }
                    </div>

                )
            }
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
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width:'20%',
            ellipsis:true,
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


            <RepositoryDeletePop {...props}
                                 deleteVisible={deleteVisible}
                                 repository={repository}
                                 setDeleteVisible={closeDeletePop}
                                 deleteRepository={deleteRpy}/>

            <RepositoryUpdatePop  {...props}
                                  visible={updateVisible}
                                  setVisible={setUpdateVisible}
                                  repository={repository}
                                  updateRpy={updateRpy}

            />
        </div>
    )
}

export default inject('systemRoleStore')(observer(RepositoryTable))
