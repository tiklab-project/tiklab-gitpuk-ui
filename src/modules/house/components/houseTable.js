import React from 'react'
import {LockOutlined,SettingOutlined} from '@ant-design/icons'
import {Space,Table,Tooltip} from 'antd'
import EmptyText from '../../common/emptyText/emptyText'
import Listname from '../../common/list/listname'
import './houseTable.scss'

const HouseTable = props => {

    const {houseList} = props

    const goDetails = (text,record) => {
        props.history.push(`/index/house/${record.name}/tree`)
    }

    const goSet = (text,record) => {
        props.history.push(`/index/house/${record.name}/sys/set`)
    }

    const columns = [
        {
            title: '仓库名称',
            dataIndex: 'name',
            key: 'name',
            width:'60%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='house-tables-name' onClick={()=>goDetails(text,record)}>
                        <div className='name-icon'>
                            <Listname text={text}/>
                        </div>
                        <div className='name-text'>
                            <div className='name-text-title'>
                                <span className='name-text-name'>{text}</span>
                                <span className='name-text-lock'><LockOutlined/></span>
                                <span className='name-text-type'>{record.userType === '3' ? '管理员':'开发者'}</span>
                            </div>
                            {
                                record.userType === '2' &&
                                <div className='name-text-desc'>{text}</div>
                            }
                        </div>
                    </div>
                )
            }
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
                            <span className='house-tables-set' onClick={()=>goSet(text,record)}>
                                <SettingOutlined className='actions-se'/>
                            </span>
                        </Tooltip>
                        <Tooltip title='收藏'>
                                <span className='house-tables-collect'>
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

    const dataSource = [
        {
            id:'1',
            name:'node',
            update:'昨天',
            userType:'1'
        },
        {
            id:'2',
            name:'api',
            update:'2天前',
            userType:'2'
        },
        {
            id:'3',
            name:'boss',
            update:'20分钟前',
            userType: '2'
        }
    ]

    return (
        <div className='house-tables'>
            <Table
                bordered={false}
                columns={columns}
                dataSource={houseList}
                rowKey={record=>record.codeId}
                pagination={false}
                locale={{emptyText: <EmptyText/>}}
            />
        </div>
    )
}

export default HouseTable
