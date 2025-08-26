/**
 * 合并分支确认界面提交文件
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useEffect,Fragment} from 'react';
import commitsStore from "../../repository/commits/store/CommitsStore";
import MergeAddFile from "./MergeAddFile";
import DetailsDiff from "../../common/diffData/DetailsDiff";
import {observer} from "mobx-react";
const MergeDetailsFile = (props) => {
    const {repositoryInfo,mergeData,webUrl,commitDiff,expand}=props
    const {findDiffBranchFileDetails} = commitsStore
    useEffect(()=>{

    },[])


    return(
        <div>



                <DetailsDiff content={commitDiff}
                             expand={expand}
                />


          {/*  {
                <MergeAddFile {...props}
                              webUrl={webUrl}
                              repositoryInfo={repositoryInfo}
                              originBranch={mergeData.mergeOrigin}
                              targetBranch={mergeData.mergeTarget}
                              findDiffBranchFileDetails={findDiffBranchFileDetails}
                              mergeId={mergeData.mergeState===2?mergeData.id:null}
                />
            }*/}
        </div>
    )
}
export default observer(MergeDetailsFile)
