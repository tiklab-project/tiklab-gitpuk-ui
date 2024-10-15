/**
 * leadAuth
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useEffect} from 'react';
import {Button, Divider, Dropdown, Input, Tooltip} from 'antd';
import {CopyOutlined} from '@ant-design/icons';
import {observer} from 'mobx-react';
import {getUser} from "tiklab-core-ui";
import Btn from '../../../common/btn/Btn';
import {copy} from '../../../common/client/Client';
import './Clone.scss';
const Clone = props =>{

    const {cloneAddress,refCode,refCodeType,repositoryInfo} = props

    const [cloneVisible,setCloneVisible] = useState(false)
    //下载
    const download = (type) => {
        const a=getUser().tenant
        if (refCode){
            window.location.href=`${node_env? base_url:window.location.origin}/repositoryFile/downLoadBareRepo${a?"/"+getUser().tenant:""}?branch=${refCode}&type=${type}&rpyId=${repositoryInfo?.rpyId}&rpyName=${repositoryInfo.name}`
        }
    }

    const cloneMenu = (
        <div className='clone-menu'>
            <div className='clone-item'>
                <div className='clone-item-title'>使用SSH克隆</div>
                <Input.Group compact>
                    <Input value={cloneAddress && cloneAddress.sshaddress} style={{width:'calc(100% - 50px)'}}/>
                    <Tooltip title='复制地址' >
                        <Button icon={<CopyOutlined />} onClick={()=>copy(cloneAddress && cloneAddress.sshaddress)}/>
                    </Tooltip>
                </Input.Group>
            </div>
            <div className='clone-item'>
                <div className='clone-item-title'>使用HTTP克隆</div>
                <Input.Group compact>
                    <Input value={cloneAddress && cloneAddress.httpAddress} style={{width:'calc(100% - 50px)'}}/>
                    <Tooltip title='复制地址'>
                        <Button icon={<CopyOutlined />} onClick={()=>copy(cloneAddress && cloneAddress.httpAddress)}/>
                    </Tooltip>
                </Input.Group>
            </div>
            <div className='clone-download'>
                <div className='clone-item-download' onClick={()=>download("zip")}>下载ZIP</div>
                <Divider type='vertical' />
                <div className='clone-item-download' onClick={()=>download("tar")}>下载TAR</div>
            </div>
        </div>
    )

    return (
        <Dropdown
            overlay={cloneMenu}
            trigger={['click']}
            placement={'bottomRight'}
            visible={cloneVisible}
            onVisibleChange={visible=>setCloneVisible(visible)}
        >
            <Btn
                title={'克隆'}
                type={'primary'}
                onClick={()=>setCloneVisible(!cloneVisible)}
            />
        </Dropdown>
    )
}

export default observer(Clone)
