import {observable,action} from 'mobx'
import {
    FindBranchCommit,
} from '../api/commits'

export class CommitsStore{

    @observable commitsList = []

    @action
    findBranchCommit = async value =>{
        const params = new FormData()
        params.append('codeId',value.codeId)
        params.append('branchName',value.branchName)
        const data = await FindBranchCommit(params)
        if(data.code===0){
            this.commitsList = data.data && data.data
        }
        else {
            this.commitsList = []
        }
        return data
    }

}

export const COMMITS_STORE='commitsStore'
