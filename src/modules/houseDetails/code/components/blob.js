import React from 'react'
import {Select} from 'antd'
import {CopyOutlined,FileTextOutlined} from '@ant-design/icons'
import Btn from '../../../common/btn/btn'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import {MonacoBlob} from '../../../common/monaco/monaco'
import './blob.scss'

const Blob = props =>{

    const {match,location} = props

    const changBranch = value => {

    }

    const goEdit = () =>{
        const name = location.pathname.split('/'+match.params.name+'/blob/')
        props.history.push(`/index/house/${match.params.name}/edit/${name[1]}`)
    }

    return(
        <div className='blob'>
            <div className='blob-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'代码'} secondItem={'node'}/>
                <div className='blob-content-head'>
                    <div className='blob-head-left'>
                        <div className='blob-branch'>
                            <Select defaultValue={'master'} onChange={value=>changBranch(value)}>
                                <Select.Option value={'master'}>master</Select.Option>
                                <Select.Option value={'xblob-v1.0'}>xblob-v1.0</Select.Option>
                            </Select>
                        </div>
                        <div className='blob-bread'>
                            <div className='bread-item'>node </div>
                            <div className='bread-item'> / </div>
                            <div className='bread-item'>node</div>
                            <div className='bread-item'> / </div>
                        </div>
                    </div>
                    <div className='blob-head-right'>
                        <div className='blob-desc'>
                            <Btn
                                title={'下载'}
                            />
                        </div>
                        <div className='blob-clone'>
                            <Btn
                                title={'克隆'}
                                type={'primary'}
                            />
                        </div>
                    </div>
                </div>
                <div className='blob-content-commit'>
                    <div className='blob-commit-icon'/>
                    <div className='blob-commit-msg'>
                        <div className='msg-title'>解决无法登录问题</div>
                        <div className='msg-desc'>admin 1个小时前提交</div>
                    </div>
                    <div className='blob-commit-ident'>
                        <div className='ident-title'> 33128853</div>
                        <div className='ident-btn'><CopyOutlined /></div>
                    </div>
                </div>
                <div className='blob-content-editor'>
                    <div className='blob-editor-title'>
                        <div className='editor-title-left'>
                            <span className='editor-title-icon'><FileTextOutlined /></span>
                            <span className='editor-title-text'>.gitignore</span>
                            <span className='editor-title-size'>37 Bytes</span>
                            <span className='editor-title-copy'><CopyOutlined/></span>
                        </div>
                        <div className='editor-title-right'>
                            <div className='editor-title-item'>复制</div>
                            <div className='editor-title-item' onClick={()=>goEdit()}>编辑</div>
                            <div className='editor-title-item'>WEB IDE</div>
                            <div className='editor-title-item'>删除</div>
                            <div className='editor-title-item'>下载</div>
                        </div>
                    </div>
                    <div className='blob-editor-content'>
                        <MonacoBlob
                            readOnly={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blob
