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
}

const commitsStore=new CommitsStore()
export default commitsStore
