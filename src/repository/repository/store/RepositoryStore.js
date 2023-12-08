import {observable,action} from 'mobx';
import {message} from 'antd';
import {getUser,Axios} from 'thoughtware-core-ui';

export class RepositoryStore {

    // 仓库列表
    @observable
    repositoryList = []

    @observable
    newOpenRepository=[]

    // 仓库信息
    @observable
    repositoryInfo = ''

    // （仓库组||用户）+仓库名称的路径
    @observable
    webUrl = ''

    // 加载
    @observable
    isLoading = false

    //所有项目成员
    @observable
    allUserList=[]

    //错误信息
    @observable
    errorMsg=""

    @observable
    address=''

    //仓库地址
    @observable
    repositoryPath=''

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
     * 根据仓库路径删除仓库
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    deleteRpyByAddress=async  value=>{
        this.isLoading = true
        const param = new FormData()
        param.append('address',value)
        const data = await Axios.post('/rpy/deleteRpyByAddress',param)
        return data;

    }


    /**
     * 更新仓库
     * @param values
     * @returns {Promise<*>}
     */
    @action
    updateRpy = async values =>{
        const data = await Axios.post('/rpy/updateRpy',values)
        if(data.code===0){
            message.success('更新成功')
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
     * @param param
     * @returns {Promise<*>}
     */
    @action
    findRepositoryList = async (param) =>{
        const data = await Axios.post('/rpy/findRepositoryList',param)
        if(data.code===0){

            this.repositoryList = data.data
        }
        return data
    }


    /**
     * 通过仓库名字或仓库组查询仓库
     * @param param
     * @returns {Promise<unknown>}
     */
    @action
    findRepositoryByName = async (param) =>{
        this.isLoading=true
        const data = await Axios.post('/rpy/findRepositoryByName',param)
        if(data.code===0){
            this.repositoryList = data.data
        }
        this.isLoading=false
        return data
    }

    /**
     * 条件查询仓库组下面的仓库
     * @param param  查询条件
     * @returns {Promise<unknown>}
     */
    @action
    findGroupRepository = async (param) =>{
        const data = await Axios.post('/rpy/findGroupRepository',param)

        return data
    }


    /**
     * 分页查询有权限的仓库
     * @param param
     * @returns {Promise<unknown>}
     */
    @action
    findRepositoryPage = async (param) =>{
        const data = await Axios.post('/rpy/findRepositoryPage',param)
        return data
    }

    /**
     * 通过用户分页查询有权限的仓库
     * @param param
     * @returns {Promise<unknown>}
     */
    @action
    findPrivateRepositoryByUser = async (param) =>{
        const data = await Axios.post('/rpy/findPrivateRepositoryByUser',param)
        return data
    }

    /**
     * 查询用户推送过的仓库
     * @param param
     * @returns {Promise<unknown>}
     */
    @action
    findCommitRepository = async () =>{
        const param=new FormData()
        param.append("userId",getUser().userId)
        const data = await Axios.post('/rpy/findCommitRepository',param)
        return data
    }


    /**
     *通过address 查询仓库
     * @param address 仓库地址
     * @returns {Promise<*>}
     */
    @action
    findRepositoryByAddress = async (address)=>{
        const param = new FormData()
        param.append('address',address)
        const data = await Axios.post('/rpy/findRepositoryByAddress',param)
        if(data.code===0){
            this.repositoryInfo = data.data && data.data
        }
        return data
    }

    /**
     * 添加打开仓库的记录管理
     * @param repositoryId
     * @returns {Promise<unknown>}
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

    @action
    getAddress = async () =>{
        const data = await Axios.post('/rpy/getAddress')
        if (data.code===0){
            this.address=data.data
        }
        return data
    }

    /**
     * 查询仓库地址
     * @param repositoryId
     * @returns {Promise<unknown>}
     */
    @action
    getRepositoryPath = async () =>{
        const data = await Axios.post('/rpy/getRepositoryPath')
        if (data.code===0){
            this.repositoryPath=data.data
        }
       return data
    }

    /**
     * 查询当前仓库用户是否有权限
     * @param repositoryId
     * @returns {Promise<unknown>}
     */
    @action
    findRepositoryAuth = async (rpyId) =>{
        const param=new FormData()
        param.append("rpyId",rpyId)
        const data = await Axios.post('/rpy/findRepositoryAuth',param)
        return data
    }


}


export const REPOSITORY_STORE='repositoryStore'
