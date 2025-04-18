import React,{useEffect, useState} from 'react';
import {Modal,Space,Table,Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {autoHeight} from '../../../common/client/Client'
import Btn from '../../../common/btn/Btn';
import EmptyText from '../../../common/emptyText/EmptyText';

const RepositoryUserAdd = props =>{

    const {visible,setVisible,yUserList,nUserList,setYUserList,setNUserList} = props

    const [height,setHeight] = useState(0)
    const [addUser,setAddUser] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    useEffect(()=>{
        setSelectedRowKeys([])
        setAddUser([])
    },[visible])

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    /**
     * 确定选中用户
     */
    const onOk = () => {
        // 所有id组成数组
        const newArr = addUser.map(item=>item.id)

        // yUserList（已选择） 添加
        setYUserList(yUserList.concat(addUser))

        // nUserList（未选择） 减少
        setNUserList(nUserList.filter(item=>!newArr.includes(item.id)))
        setVisible(false)
    }

    /**
     * 行选中
     * @param record
     */
    const onSelectRow = record => {
        // 如果已经选中 -- 取消选中
        if (selectedRowKeys.indexOf(record.id) >= 0) {
            addUser.splice(addUser.indexOf(record.id),1)
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1)
        }
        // 如果没有选中 -- 选中
        else {
            selectedRowKeys.push(record.id)
            addUser.push(record)
        }
        setSelectedRowKeys([...selectedRowKeys])
        setAddUser([...addUser])
    }

    /**
     * 行选择配置
     * @type {{onChange: rowSelection.onChange, selectedRowKeys: *[]}}
     */
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setAddUser(selectedRows)
            setSelectedRowKeys(selectedRowKeys)
            console.log('数组::',selectedRows)
            console.log('id::',selectedRowKeys)
        },
        selectedRowKeys:selectedRowKeys
    }

    return (
        <div className='repository-add-user-drop xcode'>
            <Input
                placeholder={"名称"}
                prefix={<SearchOutlined/>}
                // onChange={findUser}
            />
            <div className='repository-user-add-table'>
                <Table
                    rowKey={record=> record.id}
                    rowSelection={rowSelection}
                    onRow={record => ({
                        onClick: () => onSelectRow(record)
                    })}
                    columns={[{
                        title:"昵称",
                        dataIndex:"nickname",
                        key:"nickname",
                    }]}
                    dataSource={nUserList}
                    pagination={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
            <div className='repository-user-add-btn'>
                <Btn onClick={()=>setVisible(false)} title={"取消"} isMar={true}/>
                <Btn onClick={onOk} title={"确定"} type={"primary"}/>
            </div>
        </div>
    )

}

export default RepositoryUserAdd
