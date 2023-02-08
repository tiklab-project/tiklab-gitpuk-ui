import React,{useEffect, useState} from 'react'
import {Modal,Space,Table} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import {autoHeight} from '../../common/client/client'
import Btn from '../../common/btn/btn'
import EmptyText from '../../common/emptyText/emptyText'

const HouseUserAdd = props =>{

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

    const onOk = () => {
        // 所有id组成数组
        const newArr = addUser.map(item=>item.id)

        // yUserList（已选择） 添加
        setYUserList(yUserList.concat(addUser))

        // nUserList（未选择） 减少
        setNUserList(nUserList.filter(item=>!newArr.includes(item.id)))
        setVisible(false)
    }


    const modalFooter = (
        <>
            <Btn
                onClick={()=>setVisible(false)}
                title={'取消'}
                isMar={true}
            />
            <Btn
                onClick={onOk}
                title={'确定'}
                type={'primary'}
            />
        </>
    )

    const columns = [
        {
            title:'昵称',
            dataIndex:'nickname',
            key:'nickname',
            width:'25%',
            ellipsis:true,
            render:(text,record)=><Space>{text}</Space>
        },
        {
            title:'名称',
            dataIndex:'name',
            key:'name',
            width:'25%',
            ellipsis:true,
        },
        {
            title:'手机号',
            dataIndex:'phone',
            key:'phone',
            width:'25%',
            ellipsis:true,
        },
        {
            title:'邮箱',
            dataIndex:'email',
            key:'email',
            width:'25%',
            ellipsis:true,
        },
    ]

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
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            closable={false}
            footer={modalFooter}
            width={900}
            style={{height:height,top:60}}
            className='xcode'
        >
            <div className='storehouseAddModal-user-add'>
                <div>添加成员</div>
                <div onClick={()=>setVisible(false)} className="user-add-close"><CloseOutlined/></div>
            </div>
            <Table
                rowKey={(record) => record.id}
                rowSelection={rowSelection}
                onRow={record => ({
                    onClick: () => onSelectRow(record)
                })}
                columns={columns}
                dataSource={nUserList}
                pagination={false}
                locale={{emptyText: <EmptyText/>}}
            />
        </Modal>
    )
}

export default HouseUserAdd
