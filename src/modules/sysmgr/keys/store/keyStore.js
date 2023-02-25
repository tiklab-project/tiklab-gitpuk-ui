import {action, observable} from 'mobx';
import {
    CreateAuth,
    DeleteAuth,
    FindUserAuth,
    FindOneAuth
} from '../api/keys';
import {message} from 'antd';
import {getUser} from 'tiklab-core-ui';

export class KeyStore{

    @observable fresh = false
    @observable keysList = []

    @action
    createAuth = async value =>{
        const data = await CreateAuth({
            ...value,
            user:{id:getUser().userId}
        })
        if(data.code===0){
            message.info('创建成功',0.5)
            this.fresh = !this.fresh
        }
        return data
    }

    @action
    deleteAuth = async value =>{
        const param = new FormData()
        param.append('authId',value)
        const data = await DeleteAuth(param)
        if(data.code===0){
            message.info('删除成功',0.5)
            this.fresh = !this.fresh
        }
        return data
    }

    @action
    findUserAuth = async value =>{
        const data = await FindUserAuth()
        if(data.code===0){
            this.keysList = data.data && data.data
        }
        else {
            this.keysList = []
        }
        return data
    }

    @action
    findOneAuth = async value =>{
        const data = await FindOneAuth(value)
        if(data.code===0){
        }
        return data
    }


}

export const KEY_STORE = 'keyStore'
