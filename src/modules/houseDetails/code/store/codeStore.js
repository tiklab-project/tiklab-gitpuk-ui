import {observable,action} from 'mobx'
import {
    FindFileTree,
} from '../api/code'

export class CodeStore {

    @observable codeTreeData = []
    @observable isEmpty = false

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
}

export const CODE_STORE='codeStore'

