import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'tiklab-core-ui';

export class ScanEnvStore {
    // 刷新
    @observable
    fresh = false

    // 第三方认证地址
    @observable
    authThirdList = []

    //环境配置
    @observable
    deployEnvList=[]

    //服务配置
    @observable
    deployServerList=[]

    /**
     * 条件查询环境配置
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findDeployEnvList = async value =>{
        const param={
            envType:value
        }
        const data = await Axios.post('/deployEnv/findDeployEnvList',param)
        if(data.code===0){
            this.deployEnvList=data.data
        }
    }

    /**
     * 创建环境配置
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createDeployEnv = async value =>{
        const data = await Axios.post('/deployEnv/createDeployEnv',value)
        if(data.code===0){
            message.info('创建成功',0.5)
            this.fresh = !this.fresh
        }
    }

    /**
     * 创建环境配置
     * @param value
     * @returns {Promise<void>}
     */
    @action
    deleteDeployEnv = async value =>{
        const param=new FormData()
        param.append("id",value)
        const data = await Axios.post('/deployEnv/deleteDeployEnv',param)
        if(data.code===0){
            message.info('删除成功',0.5)
            this.fresh = !this.fresh
        }
    }


    /**
     * 创建服务配置
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createDeployServer = async value =>{
        const data = await Axios.post('/deployServer/createDeployServer',value)
        if(data.code===0){
            message.info('创建成功',0.5)
            this.fresh = !this.fresh
        }
    }
    /**
     * 条件查询服务配置
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findDeployServerList = async value =>{
        const param={
            serverName:value
        }
        const data = await Axios.post('/deployServer/findDeployServerList',param)
        if(data.code===0){
            this.deployServerList=data.data
        }
    }
    /**
     * 删除服务配置
     * @param value
     * @returns {Promise<void>}
     */
    @action
    deleteDeployServer = async value =>{
        const param=new FormData()
        param.append("id",value)

        const data = await Axios.post('/deployServer/deleteDeployServer',param)
        if(data.code===0){
            message.info('删除成功',0.5)
            this.fresh = !this.fresh
        }
    }

}

const scanEnvStore=new ScanEnvStore()
export default  scanEnvStore
