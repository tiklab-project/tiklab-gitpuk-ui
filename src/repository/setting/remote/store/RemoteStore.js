import {observable,action} from 'mobx';
import {getUser,Axios} from 'thoughtware-core-ui';
import {message} from "antd";

export class RemoteStore{

    //
    @observable
    remoteInfoList = []

    // 刷新
    @observable
    fresh = false


    /**
     * 单个执行镜像
     * @param value
     * @returns {Promise<void>}
     */
    @action
    sendOneRepository = async param =>{
        const data = await Axios.post('/remoteInfo/sendOneRepository',param)
        return data;
    }
    /**
     * 获取镜像结果
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findMirrorResult = async (remoteInfo) =>{
        const param=new FormData()
        param.append("remoteInfoId",remoteInfo.id)
        param.append("rpyId",remoteInfo.rpyId)
        const data = await Axios.post('/remoteInfo/findMirrorResult',param)

        return data;
    }



    /**
     * 获取镜像信息列表
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findRemoteInfoList = async rpyId =>{
        const param={
            rpyId:rpyId
        }
        const data = await Axios.post('/remoteInfo/findRemoteInfoList',param)
        if(data.code===0){
            this.remoteInfoList = data.data
        }
    }

    /**
     * 创建镜像信息列表
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createRemoteInfo = async param =>{

        const data = await Axios.post('/remoteInfo/createRemoteInfo',param)
        if(data.code===0){
            
            this.fresh = !this.fresh
        }
    }

    /**
     * 更新镜像信息列表
     * @param value
     * @returns {Promise<void>}
     */
    @action
    updateRemoteInfo = async param =>{

        const data = await Axios.post('/remoteInfo/updateRemoteInfo',param)
        if(data.code===0){
            this.fresh = !this.fresh
        }
    }

    /**
     * 删除镜像信息列表
     * @param value
     * @returns {Promise<void>}
     */
    @action
    deleteRemoteInfo = async value =>{
        const param= new FormData()
        param.append("id",value)
        const data = await Axios.post('/remoteInfo/deleteRemoteInfo',param)
        if(data.code===0){
            this.fresh = !this.fresh
        }
    }
}

const remoteStore = new RemoteStore()
export default remoteStore
