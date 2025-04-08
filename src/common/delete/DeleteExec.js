/**
 * @name: DeleteExec
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：删除操作
 * @update: 2022-12-30 10:30
 */
import React from "react";
import {Dropdown, Menu, Modal} from "antd";
import './DeleteExec.scss'
const { confirm } = Modal;
import {EllipsisOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

const DeleteExec = (props) => {

    const {value ,repositoryId,deleteData,title,type}=props

    debugger
    /**
     * 删除下拉
     */
     const DeletePullDown=(value) => (
        <Menu>
            <Menu.Item onClick={DeletePop} className="delete-exec">
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
        switch (type){
            case "tag":deleteData(value)
               break
            case "pipeline":deleteData(repositoryId,value.id)
                break
            default: deleteData(value.id)
                break
        }
    }


    return(
        <Dropdown   overlay={()=>DeletePullDown(value)}
                    placement="bottomRight"
                    trigger={['click']}
                    getPopupContainer={e => e.parentElement}
        >
            <EllipsisOutlined style={{fontSize:18}}/>
        </Dropdown>
    )
}
export default DeleteExec





