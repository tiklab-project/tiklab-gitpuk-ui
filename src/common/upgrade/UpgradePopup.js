import React,{useState,useEffect} from 'react';
import Modals from "../../common/modal/Modal";
import Btn from "../btn/Btn";
import upgrade from "../../assets/images/img/upgrade.png"
import "./UpgradePopup.scss"
import {getVersionInfo} from "thoughtware-core-ui";
const UpgradePopup = (props) => {
    const {visible,setVisible,title,desc}=props


    //取消编辑弹窗
    const  cancel = () => {
        setVisible(false)
    }

    const onOk = () => {
        if (getVersionInfo().release===3){
            window.open(`https://work.thoughtware.cn/#/enterprise/application/gitpuk`)
        }else {
            window.open(`https://thoughtware.cn/account/subscribe/apply/gitpuk`)
        }
    }
    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'购买'} type={'primary'}/>
        </>
    )

    return(
        <Modals
            visible={visible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={title}
        >
            <div className='upgrade'>
                <div className='upgrade-icon'>
                    <img  src={upgrade}  style={{width:140,height:140}}/>
                </div>
                <div className='upgrade-text'>{desc}</div>
            </div>
        </Modals>

    )
}
export default UpgradePopup
