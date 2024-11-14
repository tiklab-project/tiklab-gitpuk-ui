import React from 'react';
import MergeContent from '../../merge/components/MergeList';
import {inject, observer} from "mobx-react";
import branchStore from "../branch/store/BranchStore";

/**
 * 仓库合并请求
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Merge = props =>{
    const {match} = props

    const webUrl = `${match.params.namespace}/${match.params.name}`


    return <MergeContent {...props}
                         webUrl={webUrl}
                        />

}

export default Merge
