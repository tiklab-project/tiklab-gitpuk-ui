import React,{useEffect,useState} from 'react'
import {Input,Space,Table,Tooltip,Popconfirm} from 'antd'
import {PlusOutlined, SearchOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import Btn from '../../../common/btn/btn'
import Tabs from '../../../common/tabs/tabs'
import '../components/tag.scss'
import EmptyText from "../../../common/emptyText/emptyText";
import Listname from "../../../common/list/listname";

const Tag = props =>{

    const [tagType,setTagType] = useState(1)

    const clickType = item => {
        setTagType(item.id)
    }

    const lis = [
        {
            id:1,
            title:'标签',
        },
        {
            id:2,
            title:'发行版',
        },
    ]

    const renderName = (text,record) =>{
        return <div className='tag-tables-name'>
            <div className='name-icon'>
                <Listname text={text}/>
            </div>
            <div className='name-text'>
                <div className='name-text-title'>
                    {text}
                </div>
                <div className='name-text-desc'>
                    <span className='desc-name'>admin</span>
                    <span>信息完善</span>
                </div>
            </div>
        </div>
    }

    const renderAction = (text,record) =>{
        return <Space>
            <Tooltip title="编辑">
                            <span className='tag-tables-edit'>
                                <EditOutlined />
                            </span>
            </Tooltip>
            <Tooltip title="删除">
                <Popconfirm
                    placement="topRight"
                    title="你确定删除吗"
                    okText="确定"
                    cancelText="取消"
                >
                                <span className='tag-tables-del'>
                                    <DeleteOutlined />
                                </span>
                </Popconfirm>
            </Tooltip>
        </Space>
    }

    const columnsTag = [
        {
            title: '标签名',
            dataIndex: 'name',
            key: 'name',
            width:'40%',
            ellipsis:true,
            render:(text,record)=> renderName(text,record)
        },
        {
            title: '标签来源',
            dataIndex: 'update',
            key: 'update',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
            width:'30%',
            ellipsis:true,
        },
        {
            title: '操作',
            dataIndex: 'action',
            key:'action',
            width:'10%',
            ellipsis:true,
            render:(text,record)=> renderAction(text,record)
        },
    ]

    const columnsPublish = [
        {
            title: '发行版',
            dataIndex: 'name',
            key: 'name',
            width:'40%',
            ellipsis:true,
            render:(text,record)=> renderName(text,record)
        },
        {
            title: '标签',
            dataIndex: 'update',
            key: 'update',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '发行说明',
            dataIndex: 'desc',
            key: 'desc',
            width:'30%',
            ellipsis:true,
        },
        {
            title: '操作',
            dataIndex: 'action',
            key:'action',
            width:'10%',
            ellipsis:true,
            render:(text,record)=> renderAction(text,record)
        },
    ]

    const dataSource = [
        {
            id:'1',
            name:'node',
            update:'master',
            desc:'desc'
        },
        {
            id:'2',
            name:'api',
            update:'master',
            desc:'desc'
        },
        {
            id:'3',
            name:'boss',
            update:'master',
            desc: 'desc'
        }
    ]

    return(
        <div className='tag'>
            <div className='tag-content xcode-home-limited xcode'>
                <div className='tag-top'>
                    <BreadcrumbContent firstItem={'标签'}/>
                    <Btn
                        type={'primary'}
                        title={'新建标签'}
                        icon={<PlusOutlined/>}
                    />
                </div>
                <div className='tag-type'>
                    <Tabs
                        type={tagType}
                        tabLis={lis}
                        onClick={clickType}
                    />
                    <div className='tag-type-input'>
                        <Input
                            allowClear
                            placeholder='标签名称'
                            // onChange={onChangeSearch}
                            prefix={<SearchOutlined />}
                            style={{ width: 200 }}
                        />
                    </div>
                </div>
                <div className='tag-tables'>
                    <Table
                        bordered={false}
                        columns={tagType===1?columnsTag:columnsPublish}
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

export default Tag
