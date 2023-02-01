import {observable,action} from 'mobx'
import {
    FindFileTree,
    ReadFile,
    WriteFile,
    FindCloneAddress,
    FindLatelyBranchCommit
} from '../api/code'

import {message} from 'antd'

export class CodeStore {

    @observable codeTreeData = []
    @observable blobFile = ''
    @observable branch = ''
    @observable cloneAddress = ''
    @observable latelyBranchCommit = ''

    @action
    setBranch = value =>{
        this.branch = value
    }

    @action
    findFileTree = async value =>{
        const data = await FindFileTree(value)
        if(data.code===0){
            this.codeTreeData = data.data && data.data
        }
        else {
            this.codeTreeData = []
        }
        return data
    }

    @action
    readFile = async value =>{
        const data = await ReadFile(value)
        if(data.code===0){
            this.blobFile = data.data && data.data
        }
        else {
            this.blobFile = ''
        }
        return data
    }

    @action
    writeFile = async value =>{
        const data = await WriteFile(value)
        if(data.code===0){
            message.info('修改成功',0.5)
        }
        return data
    }


    @action
    findCloneAddress = async value =>{
        const param = new FormData()
        param.append('codeId',value)
        const data = await FindCloneAddress(param)
        if(data.code===0){
            this.cloneAddress = data.data && data.data
        }
        else {
            this.cloneAddress = ''
        }
        return data
    }

    @action
    findLatelyBranchCommit = async value =>{
        const params = new FormData()
        params.append('codeId',value.codeId)
        params.append('branchName',value.branchName)
        const data = await FindLatelyBranchCommit(params)
        if(data.code===0){
            this.latelyBranchCommit = data.data && data.data
        }
        return data
    }



}

export const CODE_STORE='codeStore'

