import {action, observable} from 'mobx';
import {message} from 'antd';
import {getUser,Axios} from 'tiklab-core-ui';

export class SystemIntStore {

    // 刷新
    @observable
    fresh = false

    @observable
    integrationAddress=''

    @observable
    integrationAddressList=[]

    /**
     * 查询所有系统集成地址
     * @returns {Promise<*>}
     */
    @action
    findAllIntegrationAddress = async () =>{
        const data = await Axios.post('/integrationAddress/findAllIntegrationAddress')
        if (data.code===0){
            this.integrationAddressList=data.data
        }else {
            message.error(data.msg)
        }
        return data
    }


/*    /!**
     * 查询系统集成地址
     * @param value
     * @returns {Promise<*>}
     *!/
    @action
    findIntegrationAddress = async value =>{
        const param = new FormData()
        param.append('code',value)
        const data = await Axios.post('/integrationAddress/findIntegrationAddress',param)
        if (data.code===0){
            const address=data.data.integrationAddress
            const lastIndex = address.lastIndexOf('/');
            // 检查是否找到斜杠
            if (address.endsWith("/")) {
                const path=address.substring(0, lastIndex);
                this.integrationAddress={...data.data,integrationAddress:path}
            }else {
                this.integrationAddress=data.data
            }
        }else {
            message.error(data.msg)
        }
        return data
    }*/




    /**
     * 查询系统集成信息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findIntegrationInfo = async value =>{
        const param = new FormData()
        param.append('code',value)
        const data = await Axios.post('/integrationAddress/findIntegrationAddress',param)
        if (data.code===0){
            this.integrationAddress=data.data
        }else {
            message.error(data.msg)
        }
        return data
    }


    /**
     * 添加系统集成地址
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createIntegrationAddress = async value =>{
        const data = await Axios.post('/integrationAddress/createIntegrationAddress',value)
        if(data.code===0){
            message.info('创建成功',0.5)
            this.fresh = !this.fresh
        }else {
            message.error(data.msg)
        }
        return data
    }

    /**
     * 更新系统集成地址
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateIntegrationAddress = async value =>{
        const data = await Axios.post('/integrationAddress/updateIntegrationAddress',value)
        if(data.code===0){
            message.info('更新成功',0.5)
            this.fresh = !this.fresh
        }else {
            message.error(data.msg)
        }
        return data
    }

    /**
     * 删除系统集成地址
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteIntegrationAddress = async value =>{
        const param = new FormData()
        param.append('id',value)
        const data = await Axios.post('/integrationAddress/deleteIntegrationAddress',param)
        if(data.code===0){
            message.info('删除成功',0.5)
            this.fresh = !this.fresh
        }
        return data
    }

}

const systemIntStore=new SystemIntStore()
export default systemIntStore
