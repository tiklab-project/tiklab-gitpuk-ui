import React,{useState} from 'react'
import {Button, Divider, Dropdown, Input, Tooltip} from 'antd'
import {CopyOutlined} from '@ant-design/icons'
import Btn from '../../../common/btn/btn'
import './clone.scss'


const Clone = props =>{

    const [cloneVisible,setCloneVisible] = useState(false)

    const cloneMenu = (
        <div className='clone-menu'>
            <div className='clone-item'>
                <div className='clone-item-title'>使用SSH克隆</div>
                <Input.Group compact>
                    <Input value='git@github.com:ant-design/ant-design.git' style={{width:'calc(100% - 50px)'}}/>
                    <Tooltip title='复制地址'>
                        <Button icon={<CopyOutlined />} />
                    </Tooltip>
                </Input.Group>
            </div>
            <div className='clone-item'>
                <div className='clone-item-title'>使用HTTP克隆</div>
                <Input.Group compact>
                    <Input value='http://172.12.1.10/devops-itdd/tiklab-xcode-ui.git' style={{width:'calc(100% - 50px)'}}/>
                    <Tooltip title='复制地址'>
                        <Button icon={<CopyOutlined />} />
                    </Tooltip>
                </Input.Group>
            </div>
            <div className='clone-download'>
                <div className='clone-item-download'>下载ZIP</div>
                <Divider type='vertical' />
                <div className='clone-item-download'>下载TAR</div>
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

export default Clone
