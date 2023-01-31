import React,{useEffect,useState} from 'react'
import {Divider,Select} from 'antd'
import {CopyOutlined,CaretDownOutlined,CaretRightOutlined} from '@ant-design/icons'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import {MonacoPreview} from '../../../common/editor/monaco'
import Btn from '../../../common/btn/btn'
import './commitsDetails.scss'


const CommitsDetails = props =>{

    const [expandedTree,setExpandedTree] = useState([])

    const isExpandedTree = key => expandedTree.some(item => item === key)

    //展开闭合 分类
    const setOpenOrClose = group => {
        if (isExpandedTree(group.id)) {
            setExpandedTree(expandedTree.filter(item => item!==group.id))
        } else {
            setExpandedTree(expandedTree.concat(group.id))
        }
    }

    const contrastData = [
        {
            id:2,
            title:'tiklab/src111',
            newValue:'.item-icon{\n' +
                '  }',
            oldValue:'.item-icon{\n' +
                ' margin-right: 8px;\n' +
                ' }',
            type:'css'
        },
        {
            id:3,
            title:'tiklab/src222',
            newValue:'code11',
            oldValue:'code',
            type:'java'
        },
        {
            id:4,
            title:'tiklab/src333',
            newValue:'code11',
            oldValue:'code',
            type:'js'
        },
    ]

    const renderContrastData = item => {
        return (
            <div className='contrast-content-item' key={item.id}>
                <div className='item-head'>
                    <div className='item-title-icon'>
                        <div className='item-icon' onClick={()=>setOpenOrClose(item)}>
                            {
                                (isExpandedTree(item.id)?
                                        <CaretRightOutlined/>:
                                        <CaretDownOutlined/>
                                )
                            }
                        </div>
                        <div className='item-title'>
                            <span className='title-text'>{item.title}</span>
                            <span className='title-icon'><CopyOutlined /></span>
                        </div>
                    </div>
                    <Btn
                        type={'common'}
                        title={'查看文件'}
                    />
                </div>
                <div className='item-content' style={isExpandedTree(item.id)?{display:'none'}:{display:'block'}}>
                    <MonacoPreview
                        newValue={item.newValue}
                        oldValue={item.oldValue}
                        language={item.type}
                        renderOverviewRuler={false}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className='commitsDetails'>
            <div className='commitsDetails-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'提交'} secondItem={'zsse'} goBack={()=>props.history.go(-1)}/>
                <div className='commitsDetails-head'>
                    <div className='commitsDetails-head-left'>
                        <div className='head-title-icon'>
                            <span className='head-title'>提交zsse</span>
                            <span className='head-icon'><CopyOutlined /></span>
                        </div>
                        <Divider type='vertical'/>
                        <div className='head-user-time'>
                            <span className='head-time'>1个小时前来自</span>
                            <span className='head-user'>admin</span>
                        </div>
                    </div>
                    <div className='commitsDetails-head-right'>
                        <Btn
                            type={'common'}
                            title={'查看文件'}
                        />
                    </div>
                </div>
                <div className='commitsDetails-contrast'>
                    <div className='commitsDetails-contrast-title'>更改认证方式</div>
                    <div className='commitsDetails-contrast-content'>
                        <div className='contrast-title'>
                            变化（10）
                        </div>
                        <div className='contrast-affected'>
                            <div className='contrast-affected-opt'>
                                <Select defaultValue={1} bordered={false}>
                                    <Select.Option value={1}>文件变更</Select.Option>
                                    {
                                        contrastData.map(item=>{
                                            return <Select.Option value={item.id} key={item.id}>{item.title}</Select.Option>
                                        })
                                    }
                                </Select>
                            </div>
                            <div className='contrast-affected-num'>
                                <span className='num-title'>受影响行:</span>
                                <span className='num-add'>＋1</span>
                                <span className='num-reduce'>－0</span>
                            </div>
                        </div>
                        <div className='contrast-content'>
                            {
                                contrastData.map(item=>{
                                    return renderContrastData(item)
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommitsDetails