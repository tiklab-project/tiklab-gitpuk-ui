import React,{useEffect,useState} from 'react'
import {Input} from "antd"
import {PlusSquareOutlined,MinusSquareOutlined,SearchOutlined,CloseSquareOutlined} from '@ant-design/icons'
import EmptyText from '../../../common/emptyText/emptyText'

const CommitsDetailsDrop = props => {

    const {diffDropList,changDropList,changFile} = props

    const renderIcon = type => {
        switch (type) {
            case 'ADD':
                return <PlusSquareOutlined style={{color:'var(--tiklab-blue)'}}/>
            case 'DELETE':
                return <CloseSquareOutlined style={{color:'#ff0000'}}/>
            default:
                return <MinusSquareOutlined/>
        }
    }

    return (
        <div className='commits-diff-drop-title'>
            <div className='commits-diff-drop-title-input'>
                <Input
                    placeholder={'名称'}
                    prefix={<SearchOutlined/>}
                    onChange={changDropList}
                />
            </div>
            <div className='commits-diff-drop-title-content'>
                {
                    diffDropList && diffDropList.length > 0 ?
                    diffDropList.map((item,index)=>(
                        <div key={index} className='commits-diff-drop-title-item' onClick={()=>changFile(item)}>
                            <span className='diff-drop-title-item-icon'>
                                {renderIcon(item.type)}
                            </span>
                            <span className='diff-drop-title-item-title'>
                                {item.type==='ADD'?item.newFilePath:item.oldFilePath}
                            </span>
                            <span className='diff-drop-title-item-add'>+{item.addLine}</span>
                            <span className='diff-drop-title-item-delete'>-{item.deleteLine}</span>
                        </div>
                    ))
                        :
                    <EmptyText title={'没有查询到数据'}/>
                }
            </div>
        </div>
    )
}

export default CommitsDetailsDrop
