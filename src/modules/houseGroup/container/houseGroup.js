import React,{useState} from 'react'
import {PlusOutlined, SettingOutlined, LockOutlined, SearchOutlined} from '@ant-design/icons'
import {inject,observer} from "mobx-react"
import {Table, Tooltip, Space, Input} from 'antd'
import BreadcrumbContent from '../../common/breadcrumb/breadcrumb'
import Btn from '../../common/btn/btn'
import Tabs from '../../common/tabs/tabs'
import EmptyText from '../../common/emptyText/emptyText'
import Listname from "../../common/list/listname";
import '../components/houseGroup.scss'


const StorehouseGroup = props => {

    const {houseGroupStore} = props

    const {houseGroupType,setHouseGroupType} = houseGroupStore

    const lis = [
        {
            id:1,
            title:"所有仓库组",
        },
        {
            id:2,
            title:"我的仓库组",
        },
        {
            id:3,
            title:"我收藏的",
        }
    ]

    const clickType = item => {
        setHouseGroupType(item.id)
    }

    const goDetails = (text,record) => {
        props.history.push(`/index/group/${text}/survey`)
    }

    const columns = [
        {
            title: "仓库组名称",
            dataIndex: "name",
            key: "name",
            width:"60%",
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='storehouse-tables-name' onClick={()=>goDetails(text,record)}>
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
            title: "仓库",
            dataIndex: "storehouse",
            key: "storehouse",
            width:"30%",
            ellipsis:true,
        },
        {
            title: "更新",
            dataIndex: "update",
            key: "update",
            width:"30%",
            ellipsis:true,
        },
        {
            title: "操作",
            dataIndex: "action",
            key:"action",
            width:"10%",
            ellipsis:true,
            render:(text,record)=>{
                return(
                    <Space>
                        <Tooltip title="设置">
                            <span className="storehouse-tables-set">
                                <SettingOutlined className="actions-se"/>
                            </span>
                        </Tooltip>
                        <Tooltip title="收藏">
                                <span className="storehouse-tables-collect">
                                {
                                    record.collect === 0 ?
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref={`#icon-xingxing-kong`} />
                                        </svg>
                                        :
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref={`#icon-xingxing1`} />
                                        </svg>
                                }
                                </span>
                        </Tooltip>
                    </Space>
                )
            }
        },
    ]

    const dataSource = [
        {
            id:'1',
            name:'node',
            update:'昨天',
            userType:'1',
            storehouse:3
        },
        {
            id:'2',
            name:'api',
            update:'2天前',
            userType:'2',
            storehouse:3
        },
        {
            id:'3',
            name:'boss',
            update:'20分钟前',
            userType: '2',
            storehouse:3
        }
    ]

    return(
        <div className='storehouse'>
            <div className='storehouse-content xcode-home-limited xcode'>
                <div className='storehouse-top'>
                    <BreadcrumbContent firstItem={"仓库组"}/>
                    <Btn
                        type={"primary"}
                        title={"新建仓库组"}
                        icon={<PlusOutlined/>}
                    />
                </div>
                <div className='storehouse-type'>
                    <Tabs
                        type={houseGroupType}
                        tabLis={lis}
                        onClick={clickType}
                    />
                    <div className="storehouse-type-input">
                        <Input
                            allowClear
                            placeholder="仓库名称"
                            // onChange={onChangeSearch}
                            prefix={<SearchOutlined />}
                            style={{ width: 200 }}
                        />
                    </div>
                </div>
                <div className='storehouse-tables'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={dataSource}
                        rowKey={record=>record.id}
                        pagination={false}
                        locale={{emptyText: <EmptyText/>}}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('houseGroupStore')(observer(StorehouseGroup))
