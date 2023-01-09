import React from "react"
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb"
import "../components/code.scss"


const Code = props =>{
    return(
        <div className='code'>
            <div className='code-content xcode-home-limited'>
                <BreadcrumbContent firstItem={'代码'}/>
            </div>
        </div>
    )
}

export default Code
