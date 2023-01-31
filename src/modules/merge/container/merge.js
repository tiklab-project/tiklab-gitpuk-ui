import React,{useEffect,useState} from 'react'
import {Input,Space,Table} from 'antd'
import {PlusOutlined,SearchOutlined,PullRequestOutlined} from '@ant-design/icons'
import BreadcrumbContent from '../../common/breadcrumb/breadcrumb'
import Btn from '../../common/btn/btn'
import Tabs from '../../common/tabs/tabs'
import EmptyText from '../../common/emptyText/emptyText'
import MergeDetails from '../components/mergeDetails'
import MergeAdd from '../components/mergeAdd'
import '../components/merge.scss'

const Merge = props => {

    const [mergeType,setmergeType] = useState(1)
    const [details,setDetails] = useState(false)
    const [addVisible,setAddVisible] = useState(false)

    const clickType = item => {
        setmergeType(item.id)
    }

    const lis = [
        {
            id:1,
            title:`全部(${9})`,
        },
        {
            id:2,
            title:`已开启(${1})`,
        },
        {
            id:3,
            title:`已合并(${7})`,
        },
        {
            id:4,
            title:`已关闭(${1})`,
        },
    ]

    const goDetails = (text,record) => {
        setDetails(true)
    }

    const columns = [
        {
            title:'请求标题',
            dataIndex: 'name',
            key: 'name',
            width:'25%',
            ellipsis:true,
            render:(text,record)=>{
                return  <span className='tables-title' onClick={()=>goDetails(text,record)}>
                            <span className='tables-title-icon'><PullRequestOutlined/></span>
                            <span className='tables-title-text'>{text}</span>
                        </span>
            }
        },
        {
            title:'描述',
            dataIndex: 'desc',
            key: 'desc',
            width:'15%',
            ellipsis:true,
        },
        {
            title:'创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width:'15%',
            ellipsis:true,
        },
        {
            title:'合并分支',
            dataIndex: 'master',
            key: 'master',
            width:'20%',
            ellipsis:true,
            render:(text,record)=>{
                return  <Space>
                            <span>{text}</span>
                            <span>--></span>
                            <span>{record.newMaster}</span>
                        </Space>
            }
        },
        {
            title:'更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width:'15%',
            ellipsis:true,
        },
        {
            title:'状态',
            dataIndex: 'status',
            key: 'status',
            width:'10%',
            ellipsis:true,
            render:(text,record)=>{
                return  <span className={`tables-status status-${text}`}>
                            {text==='1'&&'已开启'}
                            {text==='2'&&'已关闭'}
                            {text==='3'&&'已合并'}
                        </span>
            }
        },
    ]

    const dataSource = [
        {
            id:'1',
            name:'dsjsd',
            desc:'master',
            createTime:'昨天',
            master:'1111',
            newMaster:'master',
            updateTime:'昨天',
            status:'1'
        },
        {
            id:'2',
            name:'dsjsd',
            desc:'master',
            createTime:'昨天',
            master:'1111',
            newMaster:'master',
            updateTime:'昨天',
            status:'2'
        },
        {
            id:'3',
            name:'dsjsd',
            desc:'master',
            createTime:'昨天',
            master:'1111',
            newMaster:'master',
            updateTime:'昨天',
            status:'3'
        },
    ]

    if(details){
        return  <MergeDetails
                    setDetails={setDetails}
                />
    }

    return (
        <div className='merge'>
            <div className='merge-content xcode-home-limited xcode'>
                <div className='merge-top'>
                    <BreadcrumbContent firstItem={'合并请求'}/>
                    <Btn
                        type={'primary'}
                        title={'新建合并请求'}
                        icon={<PlusOutlined/>}
                        onClick={()=>setAddVisible(true)}
                    />
                    <MergeAdd
                        addVisible={addVisible}
                        setAddVisible={setAddVisible}
                    />
                </div>
                <div className='merge-type'>
                    <Tabs
                        type={mergeType}
                        tabLis={lis}
                        onClick={clickType}
                    />
                    <div className='merge-type-input'>
                        <Input
                            allowClear
                            placeholder='请求标题'
                            // onChange={onChangeSearch}
                            prefix={<SearchOutlined />}
                            style={{ width: 200 }}
                        />
                    </div>
                </div>
                <div className='merge-tables'>
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

export default Merge