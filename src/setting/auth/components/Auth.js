import React,{useState,useEffect} from 'react';
import {Table,Tooltip,Popconfirm} from 'antd';
import {PlusOutlined,DeleteOutlined,EyeOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from '../../../common/btn/Btn';
import EmptyText from '../../../common/emptyText/EmptyText';
import AuthAdd from './AuthAdd';
import AuthDetail from './AuthDetail';
import './Auth.scss';
import authStore from "../store/AuthStore"
/**
 * 密钥
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Auth = props => {

    const {createAuth,deleteAuth,findUserAuth,keysList,fresh} = authStore

    const [addVisible,setAddVisible] = useState(false)
    const [detailVisible,setDetailsVisible] = useState(false)
    const [formValue,setFormValue] = useState(null)

    useEffect(()=>{
        // 初始化密钥
        findUserAuth()
    },[fresh])

    /**
     * 查看密钥
     * @param record
     */
    const seeAuth = record => {
        setFormValue(record)
        setDetailsVisible(true)
    }

    /**
     * 删除密钥
     * @param record
     */
    const delAuth = record => {
        deleteAuth(record.authId)
    }

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width:'15%',
            ellipsis:true,
            render:(text,record) => (
                <span className='sys-keys-table-title' onClick={()=>seeAuth(record)}>{text}</span>
            )
        },
        {
            title: '上次使用',
            dataIndex: 'userTime',
            key: 'userTime',
            width:'15%',
            ellipsis:true,
            render:text => text ? text:'暂无使用'
        },
        {
            title: '公钥',
            dataIndex: 'value',
            key: 'value',
            width:'60%',
            ellipsis:true,
        },
        {
            title:'操作',
            dataIndex: 'action',
            key: 'action',
            render:(text,record)=>(
                <Tooltip title={"删除"}>
                    <Popconfirm
                        placement="topRight"
                        title="你确定删除吗"
                        onConfirm={()=>delAuth(record)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <span style={{cursor:"pointer"}}>
                            <DeleteOutlined />
                        </span>
                    </Popconfirm>
                </Tooltip>
            )
        }
    ]

    if(detailVisible){
        return  <AuthDetail
                    formValue={formValue}
                    setDetailsVisible={setDetailsVisible}
                />
    }

    return (
        <div className='sys-keys'>
            <div className='sys-keys-content xcode-repository-width xcode'>
                <div className='sys-keys-up'>
                    <BreadcrumbContent firstItem={'Keys'}/>
                    <Btn
                        type={'primary'}
                        title={'新建密钥'}
                        icon={<PlusOutlined/>}
                        onClick={()=> setAddVisible(true)}
                    />
                    <AuthAdd
                        addVisible={addVisible}
                        setAddVisible={setAddVisible}
                        createAuth={createAuth}
                        keysList={keysList}
                    />
                </div>
                <div className='sys-keys-ill'>使用SSH公钥可以让你在你的电脑和 Xcode 通讯的时候使用安全连接（Git的Remote要使用SSH地址）</div>
                <div>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={keysList}
                        rowKey={record=>record.authId}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={'暂无公钥'}/>}}
                    />
                </div>
            </div>
        </div>
    )
}

export default observer(Auth)
