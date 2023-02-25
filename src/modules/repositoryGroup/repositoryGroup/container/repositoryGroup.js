import React,{useState,useEffect} from 'react';
import {
    PlusOutlined,
    SettingOutlined,
    LockOutlined,
    SearchOutlined
} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import {Table, Tooltip, Space, Input} from 'antd';
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb';
import Btn from '../../../common/btn/btn';
import Tabs from '../../../common/tabs/tabs';
import EmptyText from '../../../common/emptyText/emptyText';
import Listname from '../../../common/list/listname';
import '../components/repositoryGroup.scss';


const RepositoryGroup = props => {

    const {groupStore} = props

    const {groupType,setGroupType,findUserGroup,groupList} = groupStore

    useEffect(()=>{
        // 初始化仓库组
        findUserGroup()
    },[])

    const lis = [
        {
            id:1,
            title:'所有仓库组',
        },
        {
            id:2,
            title:'我的仓库组',
        },
        {
            id:3,
            title:'我收藏的',
        }
    ]

    const clickType = item => {
        setGroupType(item.id)
    }

    const goDetails = (text,record) => {
        // props.history.push(`/index/group/${text}/survey`)
    }

    const columns = [
        {
            title: '仓库组名称',
            dataIndex: 'name',
            key: 'name',
            width:'60%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='repository-group-tables-name' onClick={()=>goDetails(text,record)}>
                        <div className='name-icon'>
                            <Listname text={text}/>
                        </div>
                        <div className='name-text'>
                            <span className='name-text-name'>{text}</span>
                            <span className='name-text-lock'><LockOutlined/></span>
                        </div>
                    </div>
                )
            }
        },
        {
            title: '仓库',
            dataIndex: 'repository-group',
            key: 'repository-group',
            width:'30%',
            ellipsis:true,
        },
        {
            title: '更新',
            dataIndex: 'update',
            key: 'update',
            width:'30%',
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
                            <span className='repository-group-tables-set'>
                                <SettingOutlined className='actions-se'/>
                            </span>
                        </Tooltip>
                        <Tooltip title='收藏'>
                            <span className='repository-group-tables-collect'>
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
                        </Tooltip>
                    </Space>
                )
            }
        },
    ]

    return(
        <div className='repository-group'>
            <div className='repository-group-content xcode-home-limited xcode'>
                <div className='repository-group-top'>
                    <BreadcrumbContent firstItem={'Repository_group'}/>
                    <Btn
                        type={'primary'}
                        title={'新建仓库组'}
                        icon={<PlusOutlined/>}
                        onClick={()=>props.history.push('/index/group/new')}
                    />
                </div>
                <div className='repository-group-type'>
                    <Tabs
                        type={groupType}
                        tabLis={lis}
                        onClick={clickType}
                    />
                    <div className='repository-group-type-input'>
                        <Input
                            allowClear
                            placeholder='仓库组名称'
                            // onChange={onChangeSearch}
                            prefix={<SearchOutlined />}
                            style={{ width: 200 }}
                        />
                    </div>
                </div>
                <div className='repository-group-tables'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={groupList}
                        rowKey={record=>record.groupId}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={'暂无仓库组'}/>}}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('groupStore')(observer(RepositoryGroup))
