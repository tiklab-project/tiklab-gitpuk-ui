import {observable,action} from 'mobx';
import {Axios} from 'tiklab-core-ui';

export class CommitsStore{

    // 提交信息
    @observable
    commitsList = []

    // diff文件
    @observable
    commitDiff = {}

    // diff文件选择框列表
    @observable
    diffDropList = []

    /**
     * 设置提交信息数据
     */
    @action
    setCommitsList = () =>{
        this.commitsList = []
    }

    /**
     * 设置diff文件
     */
    @action
    setCommitDiff = () =>{
        this.commitDiff = {}
    }

    /**
     * 获取分支提交信息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findBranchCommit = async value =>{
        const data = await Axios.post('/commit/findBranchCommit',value)
        if(data.code===0){
            this.commitsList = this.commitsList.concat(data.data && data.data)
        }
        else {
            this.commitsList = []
        }
        return data
    }

    /**
     * 获取提交信息diff文件
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findCommitFileDiffList = async value =>{
        const data = await Axios.post('/commit/findCommitFileDiffList',value)
        if(data.code===0){
            this.commitDiff = data.data && data.data
            this.diffDropList = data.data && data.data.diffList
        }
        return data
    }

    /**
     * 获取单个diff文件内容（改变）
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findCommitFileDiff = async value =>{
        return await Axios.post('/commit/findCommitFileDiff',value)
    }

    /**
     * 获取单个diff文件内容（未改变）
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findCommitLineFile = async value =>{
        return await  Axios.post('/commit/findCommitLineFile',value)
    }

    /**
     * 模糊搜索diff文件
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findLikeCommitDiffFileList = async value =>{
        const data = await Axios.post('/commit/findLikeCommitDiffFileList',value)
        if(data.code===0){
            this.diffDropList = data.data && data.data.diffList
        }
        return data
    }

}

export const COMMITS_STORE='commitsStore'
