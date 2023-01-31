import {observable,action} from 'mobx'
import {
    FindFileTree,
    ReadFile,
    WriteFile
} from '../api/code'

import {message} from 'antd'

export class CodeStore {

    @observable codeTreeData = []
    @observable blobFile = ''

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
        const params = new FormData()
        params.append('codeId',value.codeId)
        params.append('fileAddress',value.fileAddress)
        const data = await ReadFile(params)
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

}

export const CODE_STORE='codeStore'

