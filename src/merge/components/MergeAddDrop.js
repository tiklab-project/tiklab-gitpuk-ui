
/**
 * 添加合并分支 选择下拉分支
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

import React from 'react';
import {Input} from "antd";
import "./MergeAddDrop.scss"
import {SearchOutlined} from "@ant-design/icons";
const MergeAddDrop = (props) => {
    const {branchList,changBranch,setBranch,setDropDownVisible,cuteBranch,type}=props

    //选择分支
    const choiceBranch = (item) => {
        setDropDownVisible(false)
        setBranch(item)
        cuteBranch(item.branchName,type)
    }

    return(
        <div className='merge-add-drop'>
            <div className='merge-add-drop-input-pad'>
                <Input
                    placeholder={'搜索分支'}
                    prefix={<SearchOutlined/>}
                    onChange={changBranch}
                />
            </div>
            <div className='merge-add-drop-content'>
                {
                    branchList.map(item=>{
                        return(
                            <div key={item.branchId} className='merge-add-drop-nav' onClick={()=>choiceBranch(item)}>
                                <div className='merge-add-drop-nav-title'>
                                    <div>{item.branchName}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}
export default MergeAddDrop
