import {observable,action} from 'mobx'
import {
    FindBranchCommit,
    FindCommitFileDiffList,
    FindCommitFileDiff,
    FindCommitLineFile,
    FindLikeCommitDiffFileList
} from '../api/commits'

export class CommitsStore{

    @observable commitsList = []
    @observable commitDiff = {}
    @observable diffDropList = []

    @action
    setCommitsList = () =>{
        this.commitsList = []
    }

    @action
    setCommitDiff = () =>{
        this.commitDiff = {}
    }

    @action
    findBranchCommit = async value =>{
        const data = await FindBranchCommit(value)
        if(data.code===0){
            this.commitsList = this.commitsList.concat(data.data && data.data)
        }
        else {
            this.commitsList = []
        }
        return data
    }

    @action
    findCommitFileDiffList = async value =>{
        const data = await FindCommitFileDiffList(value)
        if(data.code===0){
            this.commitDiff = data.data && data.data
            this.diffDropList = data.data && data.data.diffList
        }
        return data
    }

    @action
    findCommitFileDiff = async value =>{
        return await FindCommitFileDiff(value)
    }

    @action
    findCommitLineFile = async value =>{
        return await FindCommitLineFile(value)
    }

    @action
    findLikeCommitDiffFileList = async value =>{
        const data = await FindLikeCommitDiffFileList(value)
        if(data.code===0){
            this.diffDropList = data.data && data.data.diffList
        }
        return data
    }

}

export const COMMITS_STORE='commitsStore'
