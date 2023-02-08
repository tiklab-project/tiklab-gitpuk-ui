import React from 'react'
import {LockOutlined,SettingOutlined} from '@ant-design/icons'
import {Space,Table,Tooltip} from 'antd'
import EmptyText from '../../common/emptyText/emptyText'
import Listname from '../../common/list/listname'
import './houseTable.scss'

const HouseTable = props => {

    const {houseList} = props

    const goDetails = (text,record) => {
        if(record.codeGroup){
            props.history.push(`/index/house/${record.address}/tree`)
        }
        else {
            props.history.push(`/index/house/${record.user.name}/${record.name}/tree`)
        }
    }

    const goSet = (text,record) => {
        if(record.codeGroup){
            props.history.push(`/index/house/${record.address}/sys/set`)
        }
        else {
            props.history.push(`/index/house/${record.user.name}/${record.name}/sys/set`)
        }
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
                        <Listname text={text}/>
                        <div className='name-text'>
                            <div className='name-text-title'>
                                <span className='name-text-name'>
                                    {
                                        record.codeGroup ?
                                            record.codeGroup.name
                                            :
                                            record.user.name
                                    }
                                    /{text}
                                </span>
                                <span className='name-text-lock'><LockOutlined/></span>
                                <span className='name-text-type'>{record.userType === '3' ? '管理员':'开发者'}</span>
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

    return (
        <div className='house-tables'>
            <Table
                bordered={false}
                columns={columns}
                dataSource={houseList}
                rowKey={record=>record.codeId}
                pagination={false}
                locale={{emptyText: <EmptyText title={'暂无仓库'}/>}}
            />
        </div>
    )
}

export default HouseTable
