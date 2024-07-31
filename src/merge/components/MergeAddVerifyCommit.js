/**
 * 合并分支确认界面提交记录
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useEffect} from 'react';
import commitsStore from "../../repository/commits/store/CommitsStore";
import MergeAddCommit from "./MergeAddCommit";
const MergeAddVerifyCommit = (props) => {
    const {commitsList,webUrl}=props


    return(
        <div>
            <MergeAddCommit {...props}
                commitsList={commitsList}
                webUrl={webUrl}/>
        </div>
    )
}
export default MergeAddVerifyCommit
