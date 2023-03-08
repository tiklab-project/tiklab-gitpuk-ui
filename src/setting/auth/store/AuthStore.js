import {action, observable} from 'mobx';
import {message} from 'antd';
import {getUser,Axios} from 'tiklab-core-ui';

export class AuthStore {

    // 刷新
    @observable
    fresh = false

    // 密钥列表
    @observable
    keysList = []

    /**
     * 添加密钥
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createAuth = async value =>{
        const data = await Axios.post('/auth/createAuth',{
            ...value,
            user:{id:getUser().userId}
        })
        if(data.code===0){
            message.info('创建成功',0.5)
            this.fresh = !this.fresh
        }
        return data
    }

    /**
     * 删除密钥
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteAuth = async value =>{
        const param = new FormData()
        param.append('authId',value)
        const data = await Axios.post('/auth/deleteAuth',param)
        if(data.code===0){
            message.info('删除成功',0.5)
            this.fresh = !this.fresh
        }
        return data
    }

    /**
     * 获取密钥
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findUserAuth = async value =>{
        const data = await Axios.post('/auth/findUserAuth')
        if(data.code===0){
            this.keysList = data.data && data.data
        }
        else {
            this.keysList = []
        }
        return data
    }

    /**
     * 获取单个密钥信息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findOneAuth = async value =>{
        const data = await Axios.post('/auth/findOneAuth',value)
        if(data.code===0){
        }
        return data
    }


}

export const AUTH_STORE = 'authStore'
