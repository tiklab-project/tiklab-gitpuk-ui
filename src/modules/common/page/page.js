import React from 'react'
import {LeftOutlined,RightOutlined} from '@ant-design/icons'
import './page.scss'

const Page = props =>{

    const {pageCurrent,changPage,page} = props

    const renderRightOut = () =>{
        if(pageCurrent===page.total || !page.total){
            return(
                <span className='xcode-page-ban'>
                    <RightOutlined/>
                </span>
            )
        }else {
            return (
                <span className='xcode-page-allow' onClick={()=>changPage(pageCurrent+1)}>
                    <RightOutlined/>
                </span>
            )
        }
    }

    return <div className='xcode-page'>
                <span
                    className={`${pageCurrent===1?'xcode-page-ban':'xcode-page-allow'}`}
                    onClick={()=>pageCurrent===1? null :changPage(pageCurrent - 1)}
                ><LeftOutlined/>
                </span>
                <span className='xcode-page-current'>{pageCurrent}</span>
                <span> / {page && page.total?page.total:1}</span>
                { renderRightOut() }
         </div>
}

export default Page
