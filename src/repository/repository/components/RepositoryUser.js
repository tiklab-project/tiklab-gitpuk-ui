import React,{useState} from 'react';
import {Space,Table,Select,Tooltip,Dropdown} from 'antd';
import {DeleteOutlined,PlusOutlined} from '@ant-design/icons';
import Btn from '../../../common/btn/Btn';
import EmptyText from '../../../common/emptyText/EmptyText';
import RepositoryUserAdd from './RepositoryUserAdd';
import './RepositoryUser.scss';

const RepositoryUser = props =>{

    const {yUserList,setYUserList,nUserList,setNUserList,userId,member,setMember,userTitle} = props

    const [visible,setVisible] = useState(false)

    // 用户权限
    const changePower = (record,value) => {
        // if(value==='1'){
        //     value=true
        // }
        // if(value==='2'){
        //     value=false
        // }
        member && member.map(item=>{
            if(item.id===record.id){
                item.adminRole = value
            }
        })
        setMember([...member])
    }

    // 移出用户
    const del = (text,record) =>{
        // yUserList（已选择） 减少
        setYUserList(yUserList.filter(item=>item.id!==record.id))

        // nUserList（未选择） 添加
        setNUserList(nUserList.concat([record]))
    }

    const columns = [
        {
            title:'昵称',
            dataIndex:'nickname',
            key:'nickname',
            width:'40%',
            ellipsis:true,
        },
        {
            title:'名称',
            dataIndex:'name',
            key:'name',
            width:'30%',
            ellipsis:true,
            render:(text,record)=>{
                return  <Space>
                            {text}
                        </Space>
            }
        },
        {
            title:'权限',
            dataIndex:'power',
            key:'power',
            width:'25',
            ellipsis:true,
            render: (text,record)=>(
                <Select
                    defaultValue={record.id===userId}
                    bordered={false}
                    showarrow={'false'}
                    style={{width:120}}
                    disabled={record.id===userId}
                    onChange={value=>changePower(record,value)}
                >
                    <Select.Option value={true}>管理员角色</Select.Option>
                    <Select.Option value={false}>默认角色</Select.Option>
                </Select>
            )
        },
        {
            title:'操作',
            dataIndex:'action',
            key:'action',
            width:'5%',
            ellipsis:true,
            render: (text,record) => {
                if (record.id !== userId) {
                    return <Tooltip title='移出用户'>
                        <DeleteOutlined onClick={()=>del(text,record)}/>
                    </Tooltip>
                }
            }
        },
    ]

    return (
        <div className='repository-add-user'>
            <div className='repository-add-user-title'>
                <div>{userTitle}成员</div>
                <Dropdown overlay={
                    <RepositoryUserAdd
                        visible={visible}
                        setVisible={setVisible}
                        nUserList={nUserList}
                        yUserList={[]}
                        setYUserList={setYUserList}
                        setNUserList={setNUserList}
                    />}
                      placement={'bottomRight'}
                      visible={visible}
                      trigger={['click']}
                      onVisibleChange={visible => setVisible(visible)}
                >
                    <Btn title={'添加成员'} icon={<PlusOutlined/>} type={'link'}/>
                </Dropdown>

            </div>
            <div className='repository-add-user-table'>
                <Table
                    rowKey={(record) => record.id}
                    columns={columns}
                    dataSource={[]}
                    pagination={false}
                    showHeader={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
        </div>
    )
}

export default RepositoryUser
