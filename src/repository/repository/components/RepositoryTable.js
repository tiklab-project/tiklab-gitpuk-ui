import React from 'react';
import {LockOutlined,SettingOutlined} from '@ant-design/icons';
import {Space,Table,Tooltip} from 'antd';
import EmptyText from '../../../common/emptyText/EmptyText';
import Listicon from '../../../common/list/Listicon';
import './RepositoryTable.scss';

const RepositoryTable = props => {

    const {repositoryList} = props

    /**
     * 跳转代码文件
     * @param text
     * @param record
     */
    const goDetails = (text,record) => {
        if(record.codeGroup){
            props.history.push(`/index/repository/${record.address}/tree`)
        }
        else {
            props.history.push(`/index/repository/${record.user.name}/${record.name}/tree`)
        }
    }

    /**
     * 跳转到项目设置
     * @param text
     * @param record
     */
    const goSet = (text,record) => {
        if(record.codeGroup){
            props.history.push(`/index/repository/${record.address}/sys/info`)
        }
        else {
            props.history.push(`/index/repository/${record.user.name}/${record.name}/sys/info`)
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
                    <div className='repository-tables-name' onClick={()=>goDetails(text,record)}>
                        <Listicon text={text}/>
                        <div className='name-text'>
                            <div className='name-text-title'>
                                <span className='name-text-name'>
                                    {
                                        record.codeGroup ? record.codeGroup.name : record.user.name
                                    } / {text}
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
                            <span className='repository-tables-set' onClick={()=>goSet(text,record)}>
                                <SettingOutlined className='actions-se'/>
                            </span>
                        </Tooltip>
                        <Tooltip title='收藏'>
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
                        </Tooltip>
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
                locale={{emptyText: <EmptyText title={'暂无仓库'}/>}}
            />
        </div>
    )
}

export default RepositoryTable
