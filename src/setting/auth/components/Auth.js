/**
 * 密钥
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

import React,{useState,useEffect} from 'react';
import {Col} from 'antd';
import {EditOutlined, KeyOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from '../../../common/btn/Btn';
import AuthAdd from './AuthAdd';
import './Auth.scss';
import authStore from "../store/AuthStore"
import DeleteExec from "../../../common/delete/DeleteExec";
import {getUser} from "thoughtware-core-ui";
import EmptyText from "../../../common/emptyText/EmptyText";


const Auth = props => {

    const {createAuth,updateAuthSsh,deleteAuth,findAuthSshList,keysList,fresh} = authStore

    const [addVisible,setAddVisible] = useState(false)

    const [authData,setAuthData]=useState(null)
    const [title,setTitle]=useState(null)

    useEffect(()=>{
        // 初始化密钥
        findAuthSshList({userId:getUser().userId})
    },[fresh])

    //打开编辑
    const openCompile = (value) => {
        setAuthData(value)
        setAddVisible(true)
        setTitle("更新密钥")
    }

    const openAddPop = () => {
        setAddVisible(true)
        setTitle("添加密钥")
    }
    const dateFormat = 'YYYY-MM-DD';
    return (
        <div className='xcode page-width sys-keys'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "22", offset: "1" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='sys-keys-content '>
                    <div className='sys-keys-up'>
                        <BreadcrumbContent firstItem={'Keys'}/>
                        <Btn
                            type={'primary'}
                            title={'添加密钥'}
                          /*  icon={<PlusOutlined/>}*/
                            onClick={openAddPop}
                        />

                    </div>
                    <div className='sys-keys-ill'>在添加过 SSH 公钥后，您可以使用 SSH 协议访问，推送代码</div>
                    <div className='sys-keys-table'>
                        {
                            keysList&&keysList.length>0?keysList.map((item,index)=>{
                                return(
                                    <div key={index} className='sys-keys-nav'>
                                        <div className='sys-keys-data'>
                                            <div className='sys-keys-data-icon'><KeyOutlined /></div>
                                            <div >
                                                <div className='sys-keys-data-title'>
                                                    <div className='sys-keys-data-title-text'>{item.title}</div>
                                                    <div>{item.fingerprint}</div>
                                                </div>
                                                <div className='sys-keys-data-desc'>
                                                    <span>{`最近使用时间：${item.userTime?item.userTime:'暂无使用'}`}</span>
                                                    <span>{`创建时间：${item.createTime}`}</span>
                                                    <span>{`过期时间：${(item.expireTime&&item.expireTime!=="0") ?item.expireTime:"永久有效"}`}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='sys-keys-icon'>
                                            <EditOutlined  onClick={()=>openCompile(item)}/>
                                            <DeleteExec value={item} deleteData={deleteAuth} title={"确认删除"}/>
                                        </div>
                                    </div>
                                )
                            }):
                                <EmptyText title={'暂无公钥'}/>
                        }
                    </div>
                </div>
                <AuthAdd
                    addVisible={addVisible}
                    setAddVisible={setAddVisible}
                    createAuth={createAuth}
                    updateAuthSsh={updateAuthSsh}
                    keysList={keysList}
                    authData={authData}
                    setAuthData={setAuthData}
                    andTitle={title}
                />
            </Col>
        </div>
    )
}

export default observer(Auth)
