import React from 'react'
import {Divider} from 'antd'
import {TagOutlined,SubnodeOutlined,FileZipOutlined,CopyrightOutlined} from '@ant-design/icons'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import Btn from '../../../common/btn/btn'
import './publish.scss'

const Publish = props =>{

    const {setPublishVisible} = props

    const annex = [
        {
            id:'1',
            title:'id_sr.svg',
            type:'1',
            size:'567B',
            time:'现在'
        },
        {
            id:'2',
            title:'code(zip)',
            type: '2',
            size:'51.2B',
            time:'21秒前'
        },
        {
            id:'3',
            title:'code(zip)',
            type: '2',
            size: null,
            time:'45分钟前'
        }
    ]

    const renderType = type => {
        switch (type) {
            case '1':
                return <FileZipOutlined />
            case '2':
                return <CopyrightOutlined />
        }
    }

    const renderAnnex = item => {
        return (
            <div className='annex-item' key={item.id}>
                <div className='annex-item-title'>
                    <span className='title-icon'>{renderType(item.type)}</span>
                    <span>{item.title}</span>
                </div>
                <div className='annex-item-size'>{item.size}</div>
                <div className='annex-item-time'>{item.time}</div>
            </div>
        )
    }

    const goBack = () =>setPublishVisible(false)

    return (
        <div className='publish'>
            <div className='publish xcode-home-limited xcode'>
                <div className='publish-top'>
                    <BreadcrumbContent firstItem={'发行版详情'} goBack={goBack}/>
                    <div className='publish-top-btn'>
                        <Btn
                            type={'common'}
                            title={'删除'}
                            isMar={true}
                        />
                        <Btn
                            type={'common'}
                            title={'编辑'}
                        />
                    </div>
                </div>
                <div className='publish-title'>
                    <div className='publish-title-msg'>莫凶凶发布于今天</div>
                    <Divider type='vertical' />
                    <div className='publish-title-line'>
                        <div className='line-item'>
                            <span className='line-item-icon'><TagOutlined /></span>
                            <span>dfdf</span>
                        </div>
                        <div className='line-item'>
                            <span className='line-item-icon'><SubnodeOutlined /></span>
                            <span>e3c2dks</span>
                        </div>
                    </div>
                </div>
                <div className='publish-show'>
                    <div className='publish-show-title'>发行版说明</div>
                    <div className='publish-show-content'/>
                </div>
                <div className='publish-annex'>
                    <div className='publish-annex-title'>附件(5)</div>
                    <div className='publish-annex-content'>
                        {
                            annex.map(item=>renderAnnex(item))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Publish
