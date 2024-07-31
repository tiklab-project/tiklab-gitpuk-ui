import React,{Fragment} from 'react';
import {UpOutlined,DownOutlined} from '@ant-design/icons';
import Highlighter from '../../common/editor/Highlight';
import EmptyText from '../../common/emptyText/EmptyText';
import "./DetailsDiff.scss"
/**
 * diff行内容
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DetailsDiff = props => {
    const {content,expand} = props
    const renderContent = (item,index) => {
        const last = content && content.content[index-1]
        const next = content && content.content[index+1]
        let zz = 1
        if(last && next){
            zz = next.right - last.right
        }
        if(!last){
            zz = item.right
        }
        if(!next){
            zz = 1
        }
        switch (item.type) {
            case '+':
                return  <Fragment key={index}>
                    <tr className='diff-line diff-add'>
                        <td className='diff-line-num'/>
                        <td className='diff-line-num'>{item.right}</td>
                        <Highlighter language={content.fileType} code={item.text}/>
                    </tr>
                </Fragment>
            case '-':
                return  <Fragment key={index}>
                    <tr className='diff-line diff-delete'>
                        <td className='diff-line-num'>{item.left}</td>
                        <td className='diff-line-num'/>
                        <Highlighter language={content.fileType} code={item.text}/>
                    </tr>
                </Fragment>
            case '\u0000':
                if(zz===1 || next.right < 2 ){
                    return null
                }
                return  <Fragment key={index}>
                    <tr className='diff-line diff-expand'>
                        <td className='diff-line-double-num' colSpan={2} onClick={()=>expand(content,item,index)}>
                            {
                                index>0 ? <DownOutlined />:<UpOutlined/>
                            }
                        </td>
                        <td className='diff-line-code'>
                            <span>{item.text?item.text:' '}</span>
                        </td>
                    </tr>
                </Fragment>
            default:
                return  <Fragment key={index}>
                    <tr className={`diff-line diff-normal ${item.expand ? 'diff-expand-normal':''}`}>
                        <td className='diff-line-num'>{item.left}</td>
                        <td className='diff-line-num'>{item.right}</td>
                        <Highlighter language={content.fileType} code={item.text}/>
                    </tr>
                </Fragment>
        }
    }

    if(content && content.content && content.content.length < 1){
        return <EmptyText title={'空内容'}/>
    }

    return (
        <table className='diff-file'>
            <tbody className='diff-file-body'>
            {
                content && content.content  && content.content.map((item,index)=>renderContent(item,index))
            }
            </tbody>
        </table>
    )
}

export default DetailsDiff
