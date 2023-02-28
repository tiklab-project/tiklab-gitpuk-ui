import {observable,action} from 'mobx';
import {
    CreateRpy,
    DeleteRpy,
    UpdateRpy,
    FindUserRpy,
    FindNameRpy,
} from '../api/Repository';
import {message} from 'antd';
import {getUser} from 'tiklab-core-ui';

export class RepositoryStore {

    @observable repositoryList = []
    @observable repositoryType = 1
    @observable repositoryInfo = ''
    @observable webUrl = ''
    @observable isLoading = false

    @action
    setRepositoryInfo = value =>{
        this.repositoryInfo = value
    }

    @action
    setWebUrl = value =>{
        this.webUrl = value
    }

    @action
    setRepositoryType = value =>{
        this.repositoryType = value
    }

    @action
    createRpy = values =>{
        this.isLoading = true
        return new Promise(((resolve, reject) => {
            CreateRpy({
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

    @action
    deleteRpy = value =>{
        this.isLoading = true
        const param = new FormData()
        param.append('rpyId',value)
        return new Promise((resolve, reject) => {
            DeleteRpy(param).then(res=>{
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

    @action
    updateRpy = async values =>{
        const data = await UpdateRpy(values)
        if(data){

        }
        return data
    }

    @action
    findUserRpy = async values =>{
        const param = new FormData()
        param.append('userId',getUser().userId)
        const data = await FindUserRpy(param)
        if(data.code===0){
            this.repositoryList = data.data && data.data
        }
        return data
    }

    @action
    findNameRpy = async values =>{
        const param = new FormData()
        param.append('rpyName',values)
        const data = await FindNameRpy(param)
        if(data.code===0){
            this.repositoryInfo = data.data && data.data
        }
        return data
    }


}


export const REPOSITORY_STORE='repositoryStore'
