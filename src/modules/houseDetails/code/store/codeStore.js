import {observable,action} from 'mobx'
import {
    FindFileTree
} from '../api/code'

export class CodeStore {

    @observable codeTreeData = []

    @action
    findFileTree = async value =>{
        const params = new FormData()
        params.append('codeId',value.codeId)
        params.append('path',value.path)
        const data = await FindFileTree(params)
        if(data.code===0){
            this.codeTreeData = data.data && data.data
        }
    }

}

export const CODE_STORE='codeStore'

