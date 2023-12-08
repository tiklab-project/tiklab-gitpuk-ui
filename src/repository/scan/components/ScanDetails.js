
/**
 * @name: ScanDetails
 * @author: limingliang
 * @date: 2023-11-07 14:30
 * @description：扫描详情
 * @update: 2023-11-07 14:30
 */

import React,{useState,useEffect} from 'react';
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
const ScanDetails = (props) => {

    const goBack = () => {
        props.history.go(-1)
    }

    return(
        <div className='scanDetails xcode-repository-width  xcode'>
            <div className='scanRecord-top'>
                <BreadcrumbContent firstItem={`扫描历史`} goBack={goBack}/>

            </div>
        </div>
    )
}
export default ScanDetails
