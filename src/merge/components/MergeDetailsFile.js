/**
 * 合并分支确认界面提交文件
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useEffect} from 'react';
import commitsStore from "../../repository/commits/store/CommitsStore";
import MergeAddFile from "./MergeAddFile";
const MergeDetailsFile = (props) => {
    const {repositoryInfo,mergeData,webUrl}=props
    const {findDiffBranchFileDetails} = commitsStore

    useEffect(()=>{

    },[])


    return(
        <div>
            {
                <MergeAddFile {...props}
                              webUrl={webUrl}
                              repositoryInfo={repositoryInfo}
                              originBranch={mergeData.mergeOrigin}
                              targetBranch={mergeData.mergeTarget}
                              findDiffBranchFileDetails={findDiffBranchFileDetails}
                              mergeId={mergeData.mergeState===2?mergeData.id:null}
                />
            }
        </div>
    )
}
export default MergeDetailsFile
