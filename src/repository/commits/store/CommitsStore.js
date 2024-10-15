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

    //仓库成员列表
    @observable
    userList=[]
    //查询数据
    @observable
    queryData=''



    /**
     * 设置提交信息数据
     */
    @action
    setCommitsList = () =>{
        this.commitsList = []
    }

    /**
     * 提交记录列表的查询条件数据
     */
    @action
    setCommitsQueryData=(value)=>{
        this.queryData=value
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
            if (value.number==='all'){
                this.commitsList = this.commitsList.concat(data.data && data.data)
            }else {
                this.commitsList = data.data && data.data
            }
        }
        else {
            this.commitsList = []
        }
        return data
    }



    /**
     * 获取两个分支不同的提交记录
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findCommitDiffBranch = async value =>{
        const data = await Axios.post('/commit/findCommitDiffBranch',value)
        return data
    }

    /**
     * 获取两个分支不同的提交文件
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findDiffFileByBranchs = async value =>{
        const data = await Axios.post('/commit/findDiffFileByBranchs',value)
        return data
    }

    /**
     * 获取两个分支不同的提交文件的详情
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findDiffBranchFileDetails = async value =>{
        const data = await Axios.post('/commit/findDiffBranchFileDetails',value)
        return data
    }




    /**
     * 通过提交commitId 查询与父级的差异文件
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findDiffFileByCommitId = async value =>{
        const data = await Axios.post('/commit/findDiffFileByCommitId',value)
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

    /**
     * 通过分支查询差异提交和差异文件统计 (创建合并分支使用)
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findStatisticsByBranchs = async value =>{
        const data = await Axios.post('/commit/findStatisticsByBranch',value)
        return data
    }

    /**
     * 通过合并请求id查询差异提交和差异文件统计
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findStatisticsByMergeId = async mergeId =>{
        const param=new FormData()
        param.append('mergeId',mergeId)
        const data = await Axios.post('/commit/findStatisticsByMergeId',param)
        return data
    }

    /**
     * 通过合并分支id 查询差异提交
     * @param value
     */
    @action
    findDiffCommitByMergeId = async mergeId =>{
        const param=new FormData()
        param.append('mergeId',mergeId)
        const data = await Axios.post('/commit/findDiffCommitByMergeId',param)
        return data
    }

    /**
     * 通过合并分支id 查询差异文件
     * @param value
     */
    @action
    findDiffFileByMergeId = async mergeId =>{
        const param=new FormData()
        param.append('mergeId',mergeId)
        const data = await Axios.post('/commit/findDiffFileByMergeId',param)
        return data
    }


    /**
     * 查询仓库下面的成员
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findDmUserList = async value =>{
        const data = await Axios.post('/dmUser/findDmUserList',value)
        if(data.code===0){
            this.userList = data.data && data.data
        }
        return data
    }



    /**
     * 查询仓库的提交用户
     * @param value
     */
    @action
    findCommitUserList = async repositoryId =>{
        const param=new FormData()
        param.append('repositoryId',repositoryId)
        const data = await Axios.post('/commit/findCommitUserList',param)
        return data
    }


}

const commitsStore=new CommitsStore()
export default commitsStore
