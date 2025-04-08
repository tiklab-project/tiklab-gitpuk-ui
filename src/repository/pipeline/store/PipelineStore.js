import {action, observable} from 'mobx';
import {message} from 'antd';
import {getUser,Axios} from 'tiklab-core-ui';

export class PipelineStore {

    // 刷新
    @observable
    fresh = false

    @observable
    intRelevancy=''

    /**
     * 查询系统集成关联表
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findIntRelevancyList = async value =>{
        const data = await Axios.post('/intRelevancy/findIntRelevancyList',value)
        if (data.code===0){
            this.intRelevancy=data.data
        }else {
            message.error(data.msg)
        }
        return data
    }


    /**
     * 添加系统集成关联表
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createIntRelevancy = async value =>{
        const data = await Axios.post('/intRelevancy/createIntRelevancy',value)
        if(data.code===0){
            message.info('创建成功',0.5)
            this.fresh = !this.fresh
        }else {
            message.error(data.msg)
        }
        return data
    }



    /**
     * 删除系统集成关联表
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteIntRelevancy = async (repositoryId,relevancyId) =>{
        debugger
        const data = await Axios.post('/intRelevancy/deleteIntRelevancyByIn', {repositoryId:repositoryId,relevancyId:relevancyId})
        if(data.code===0){
            message.info('删除成功',0.5)
            this.fresh = !this.fresh
        }
        return data
    }


    /**
     * 查询用户
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findUser = async (path,value) =>{
        const param = new FormData()
        param.append('name',value)
        const data = await Axios.post(path,param)
        if(data.code!==0){
            message.error(data.msg)
            return
        }
        return data
    }

    /**
     * 查询流水线的list
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findPipelinePage = async (path,param) =>{
        const data = await Axios.post(path,param)
        if(data.code!==0){
            message.error(data.msg)
            return
        }
        return data
    }

}

const pipelineStore=new PipelineStore()
export default pipelineStore
