import {observable,action} from 'mobx';
import {message} from 'antd';
import {getUser,Axios} from 'tiklab-core-ui';

export class RepositoryStore {

    // 仓库列表
    @observable
    repositoryList = []

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
                if(res.rpy===0){
                    message.info('创建成功',0.5)
                }
                this.isLoading = false
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
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
                if(res.rpy===0){
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


}


export const REPOSITORY_STORE='repositoryStore'
