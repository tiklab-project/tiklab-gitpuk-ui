/**
 * @name: DeleteExec
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：删除操作
 * @update: 2022-12-30 10:30
 */
import React from "react";
import {Dropdown, Menu, Modal} from "antd";
const { confirm } = Modal;
import {EllipsisOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

const DeleteExec = (props) => {

    const {value ,deleteData,title,type}=props
    /**
     * 删除下拉
     */
     const DeletePullDown=(value) => (
        <Menu>
            <Menu.Item onClick={DeletePop}>
                删除
            </Menu.Item>
        </Menu>
    );


//删除弹窗
    const  DeletePop = () =>{
        confirm({
            title: title,
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',

            onOk() {
                execDelete()
            },
            onCancel() {
            },
        });
    }

    //删除操作
    const execDelete = () => {
        deleteData(value.id)
    }


    return(
        <Dropdown   overlay={()=>DeletePullDown(value)}
                    placement="bottom"
                    trigger={['click']}
        >
            <EllipsisOutlined style={{fontSize:18}} />
        </Dropdown>
    )
}
export default DeleteExec





