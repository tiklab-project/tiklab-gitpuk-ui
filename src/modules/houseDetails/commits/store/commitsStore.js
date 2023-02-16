import {observable,action} from 'mobx'
import {
    FindBranchCommit,
} from '../api/commits'

export class CommitsStore{

    @observable commitsList = []

    @action
    findBranchCommit = async value =>{
        const data = await FindBranchCommit(value)
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
