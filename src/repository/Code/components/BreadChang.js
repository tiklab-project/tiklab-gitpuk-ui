/**
 * @name: BreadChang
 * @author: limingliang
 * @date: 2022-12-30 10:30
 * @description：文件目录
 * @update: 2022-12-30 10:30
 */

import React, {Fragment, useEffect} from 'react';
import './BreadChang.scss';
import BranchSelect from "./BranchSelect";
const BreadChang = (props) => {
    const {repositoryInfo,type,branch,fileAddress,match,setData} = props

    return(
        <div className='code-head-left'>
            <BranchSelect
                {...props}
                repositoryInfo={repositoryInfo}
                type={'code'}
            />
        </div>
    )

}
export default BreadChang
