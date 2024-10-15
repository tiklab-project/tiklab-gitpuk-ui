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
        const data = await Axios.post('/authSsh/createAuthSsh',{
            ...value,
            user:{id:getUser().userId}
        })
        if(data.code===0){
            message.info('创建成功',0.5)
            this.fresh = !this.fresh
        }else {
            message.error(data.msg)
        }
        return data
    }

    /**
     * 更新认证
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateAuthSsh = async value =>{
        const data = await Axios.post('/authSsh/updateAuthSsh',value)
        if(data.code===0){
            message.info('更新成功',0.5)
            this.fresh = !this.fresh
        }else {
            message.error(data.msg)
        }
    }

    /**
     * 删除密钥
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteAuth = async value =>{
        const param = new FormData()
        param.append('id',value)
        const data = await Axios.post('/authSsh/deleteAuthSsh',param)
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
    findAuthSshList = async value =>{
        const data = await Axios.post('/authSsh/findAuthSshList',value)
        if(data.code===0){
            this.keysList = data.data && data.data
        } else {
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
        const param=new FormData()
        param.append("id",value)
        const data = await Axios.post('/authSsh/findOneAuthSsh',param)
        return data
    }


}

const authStore=new AuthStore()
export default authStore
