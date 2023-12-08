import React,{useEffect} from 'react';
import {BackupRestore} from 'thoughtware-security-ui';
import {inject, observer} from "mobx-react";

/**
 * 备份与恢复
 */
const BackupRecoveryContent = (props) => {

    const {repositoryStore} = props

    const {repositoryPath,getRepositoryPath} = repositoryStore


    useEffect(async ()=>{
        getRepositoryPath()
    },[])


    return (
        <BackupRestore
            {...props}
            path={repositoryPath}
        />
    )
}


export default inject('repositoryStore')(observer(BackupRecoveryContent))
