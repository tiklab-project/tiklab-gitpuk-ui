import React,{useState,useEffect} from 'react';
import {Table,Tooltip,Popconfirm} from 'antd';
import {PlusOutlined,DeleteOutlined,EyeOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb';
import Btn from '../../../common/btn/btn';
import EmptyText from '../../../common/emptyText/emptyText';
import KeysAdd from '../components/keysAdd';
import KeysDetail from '../components/keysDetail';
import '../components/keys.scss';

const Keys = props => {

    const {keyStore} = props

    const {createAuth,deleteAuth,findUserAuth,keysList,fresh} = keyStore

    const [addVisible,setAddVisible] = useState(false)
    const [detailVisible,setDetailsVisible] = useState(false)
    const [formValue,setFormValue] = useState(null)

    useEffect(()=>{
        findUserAuth()
    },[fresh])

    // 添加密钥或查看密钥
    const see = record => {
        setFormValue(record)
        setDetailsVisible(true)
    }

    const del = record => {
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
                <span className='sys-keys-table-title' onClick={()=>see(record)}>{text}</span>
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
                        onConfirm={()=>del(record)}
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
        return  <KeysDetail
                    formValue={formValue}
                    setDetailsVisible={setDetailsVisible}
                />
    }

    return (
        <div className='sys-keys'>
            <div className='sys-keys-content xcode-home-limited xcode'>
                <div className='sys-keys-up'>
                    <BreadcrumbContent firstItem={'Keys'}/>
                    <Btn
                        type={'primary'}
                        title={'新建密钥'}
                        icon={<PlusOutlined/>}
                        onClick={()=> setAddVisible(true)}
                    />
                    <KeysAdd
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

export default inject('keyStore')(observer(Keys))
