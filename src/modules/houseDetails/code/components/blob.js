import React,{Fragment} from 'react'
import {Select} from 'antd'
import {CopyOutlined,FileTextOutlined} from '@ant-design/icons'
import {inject,observer} from 'mobx-react'
import Btn from '../../../common/btn/btn'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import {MonacoBlob} from '../../../common/editor/monaco'
import RecentSubmitMsg from './recentSubmitMsg'
import BreadChang from './breadChang'
import './blob.scss'

const Blob = props =>{

    const {location,codeStore,houseStore} = props

    const {houseInfo} = houseStore
    // const {} = codeStore

    const branch = location.pathname.split('/'+houseInfo.name+'/blob/')

    const changBranch = value => {

    }

    const goEdit = () =>{
        props.history.push(`/index/house/${houseInfo.name}/edit/${branch[1]}`)
    }

    return(
        <div className='blob'>
            <div className='blob-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'代码'} goBack={()=>props.history.go(-1)}/>
                <div className='blob-content-head'>
                    <BreadChang
                        {...props}
                        houseInfo={houseInfo}
                        type={'blob'}
                    />
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
                <RecentSubmitMsg
                    {...props}
                    houseInfo={houseInfo}
                />
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

export default inject('houseStore','codeStore')(observer(Blob))
