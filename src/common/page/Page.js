import React from 'react';
import {LeftOutlined,RightOutlined} from '@ant-design/icons';
import './Page.scss';

/**
 * 分页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Page = props =>{

    const {pageCurrent,changPage,totalPage} = props
    const renderRightOut = () =>{
        if(pageCurrent===totalPage ){
            return(
                <span className='xcode-page-ban xcode-page-icon'>
                    <RightOutlined/>
                </span>
            )
        }
        return (
            <span className='xcode-page-allow xcode-page-icon' onClick={()=>changPage(pageCurrent+1)} >
                <RightOutlined/>
            </span>
        )
    }

    return <div className='xcode-page'>
                <span
                    className={`${pageCurrent===1?'xcode-page-ban':'xcode-page-allow'} xcode-page-icon`}
                    onClick={()=>pageCurrent===1? null :changPage(pageCurrent - 1)}
                >
                    <LeftOutlined/>
                </span>
                <span className='xcode-page-current'>{`第${pageCurrent}页`}</span>
                <span className='xcode-page-icon'>/</span>
                <span>{`共${totalPage}页`}</span>
                { renderRightOut() }
         </div>
}

export default Page
