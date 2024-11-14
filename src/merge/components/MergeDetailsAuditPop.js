
/**
 * 审核下拉框用户
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React from 'react';
import {Input} from "antd";
import {SearchOutlined,CheckOutlined} from '@ant-design/icons';
import "./MergeDetailsAuditPop.scss"
const MergeDetailsAuditPop = props => {
    const {userList,auditorUserList,changUser,addAuditorUser} = props
    return (
        <div className='verify-basic-drop-title'>
            <div className='verify-basic-drop-title-input'>
                <Input
                    placeholder={'名称'}
                    prefix={<SearchOutlined/>}
                    onChange={changUser}
                />
            </div>
            <div className='verify-basic-drop-title-content'>
                {
                    userList.length>0&&userList.map((item,index)=>{
                        return(
                            <div key={index} className={` verify-basic-drop-title-item`}
                                onClick={()=>addAuditorUser(item.user.id)}
                            >
                                <span className='verify-basic-title-item-title'>
                                    <div className='item-title-nav'>
                                         <div>{item.user.name}</div>
                                        {
                                            (auditorUserList.length>0&&auditorUserList.filter(a=>a.user.id===item.user.id).length>0)&&
                                            <CheckOutlined className={'verify-basic-title-item-add'}/>
                                        }
                                    </div>
                                </span>
                            </div>
                        )})
                }
            </div>
        </div>
    )
}

export default MergeDetailsAuditPop
