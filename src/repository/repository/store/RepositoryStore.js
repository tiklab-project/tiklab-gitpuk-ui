import {observable,action} from 'mobx';
import {message} from 'antd';
import {getUser,Axios} from 'tiklab-core-ui';

export class RepositoryStore {

    // 仓库列表
    @observable
    repositoryList = []

    @observable
    newOpenRepository=[]

    // 1:所有仓库；2：我收藏的仓库
    @observable
    repositoryType = 1

    // 仓库信息
    @observable
    repositoryInfo = ''

    // （仓库组||用户）+仓库名称的路径
    @observable
    webUrl = ''

    // 加载
    @observable
    isLoading = false

    //最近提交仓库的记录
    @observable
    recordCommitList=[]

    //最近打开的记录
    @observable
    recordOpenList=[]

    //所有项目成员
    @observable
    allUserList=[]

    /**
     * 设置仓库信息
     * @param value
     */
    @action
    setRepositoryInfo = value =>{
        this.repositoryInfo = value
    }

    /**
     * 设置（仓库组||用户）+仓库名称的路径
     * @param value
     */
    @action
    setWebUrl = value =>{
        this.webUrl = value
    }

    /**
     * 设置仓库类型
     * @param value
     */
    @action
    setRepositoryType = value =>{
        this.repositoryType = value
    }

    /**
     * 添加仓库
     * @param values
     * @returns {Promise<unknown>}
     */
    @action
    createRpy = values =>{
        this.isLoading = true
        return new Promise(((resolve, reject) => {
            Axios.post('/rpy/createRpy',{
                ...values,
                user:{id:getUser().userId}
            }).then(res=>{
                if(res.code===0){
                    message.info('创建成功',1)
                }else {
                    message.error(res.msg,1)
                }
                this.isLoading = false
                resolve(res)
            })
        }))
    }

    /**
     * 删除仓库
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    deleteRpy = value =>{
        this.isLoading = true
        const param = new FormData()
        param.append('rpyId',value)
        return new Promise((resolve, reject) => {
            Axios.post('/rpy/deleteRpy',param).then(res=>{
                if(res.code===0){
                    message.info('删除成功')
                }
                this.isLoading = false
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    /**
     * 更新仓库
     * @param values
     * @returns {Promise<*>}
     */
    @action
    updateRpy = async values =>{
        const data = await Axios.post('/rpy/updateRpy',values)
        if(data){
        }
        return data
    }

    /**
     * 获取所有仓库
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findUserRpy = async values =>{
        const param = new FormData()
        param.append('userId',getUser().userId)
        const data = await Axios.post('/rpy/findUserRpy',param)
        if(data.code===0){
            this.repositoryList = data.data && data.data
        }
        return data
    }

    @action
    findRepository=async (value)=>{
        const param = new FormData()
        param.append('id',value)
        const data = await Axios.post('/rpy/findRepository',param)
        if(data.code===0){
            this.repositoryInfo = data.data && data.data
        }
        return data
    }

    /**
     * 条件查询仓库
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findRepositoryList = async (param) =>{
        const data = await Axios.post('/rpy/findRepositoryList',param)
        if(data.code===0){

            this.repositoryList = data.data && data.data
        }
        return data
    }

    /**
     * 通过仓库名字或仓库组查询仓库是否存在
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findRepositoryByName = async (param) =>{
        const data = await Axios.post('/rpy/findRepositoryByName',param)
        if(data.code===0){

            this.repositoryList = data.data && data.data
        }
        return data
    }


    /**
     * 查询最近打开的仓库
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findRepositoryPage = async (param) =>{
        const data = await Axios.post('/rpy/findRepositoryPage',param)

        return data
    }

    /**
     * 获取某个仓库信息
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findNameRpy = async values =>{
        const param = new FormData()
        param.append('rpyName',values)
        const data = await Axios.post('/rpy/findNameRpy',param)
        if(data.code===0){
            this.repositoryInfo = data.data && data.data
        }
        return data
    }
    /**
     * 添加打开仓库的记录管理
     * @param values
     * @returns {Promise<*>}
     */
    @action
    createOpenRecord = async (repositoryId) =>{
        const param={
            repository:{
                rpyId:repositoryId,
            },
            userId:getUser().userId,
        }
        const data = await Axios.post('/recordOpen/createRecordOpen',param)
        return data
    }

    /**
     * 查询最近上传的记录
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findRecordCommitList = async () =>{
        const param={
            userId:getUser().userId,
        }
        const data = await Axios.post('/recordCommit/findRecordCommitList',param)
        if (data.code===0){
            this.recordCommitList=data.data
        }
        return data
    }

    /**
     * 查询最近打开的记录
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findRecordOpenList = async () =>{
        const param={
            userId:getUser().userId,
        }
        const data = await Axios.post('/recordOpen/findRecordOpenList',param)
        if (data.code===0){
            this.recordOpenList=data.data
        }
        return data
    }
}


export const REPOSITORY_STORE='repositoryStore'
