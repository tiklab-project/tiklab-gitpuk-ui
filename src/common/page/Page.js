import React,{Fragment} from 'react';
import {LeftOutlined, RightOutlined, SyncOutlined} from '@ant-design/icons';
import './Page.scss';

/**
 * 分页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Page = props =>{

    const {pageCurrent,changPage,totalPage,totalRecord,refresh,type} = props


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
    return (
        <div className='xcode-page'>
            {
                (totalPage>1||type==="show")?
                    <Fragment>
                        <span className='xcode-page-padding'>{`共${totalRecord}条`}</span>
                        <span
                            className={`${pageCurrent===1?'xcode-page-ban':'xcode-page-allow'} xcode-page-icon`}
                            onClick={()=>pageCurrent===1? null :changPage(pageCurrent - 1)}
                        >
                            <LeftOutlined/>
                        </span>
                        <span className='xcode-page-current'>{`${pageCurrent}`}</span>
                        <span className='xcode-page-icon'>/</span>
                        <span>{`${totalPage}`}</span>
                        { renderRightOut() }
                        <span className='xcode-page-padding xcode-page-allow'><SyncOutlined onClick={refresh}/></span>
                    </Fragment>
                    :null
            }
        </div>
        )

}

export default Page
