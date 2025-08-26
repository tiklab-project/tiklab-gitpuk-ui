import {action, observable} from 'mobx';
import {message} from 'antd';
import {getUser,Axios} from 'tiklab-core-ui';

export class IntegrateInStore {

    // 刷新
    @observable
    fresh = false

    @observable
    intRelevancy=''


    /**
     * 查询流水线
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findPipelinePage = async value =>{
        const data = await Axios.post('/integratedIn/findPipelinePage',value)
        if (data.code!==0){
            message.error(data.msg)
        }
        return data
    }


    /**
     * 查询关联的流水线
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findRelevancePipelinePage = async value =>{
        const data = await Axios.post('/integratedIn/findRelevancePipelinePage',value)
        if (data.code!==0){
            message.error(data.msg)
        }
        return data
    }



    /**
     * 分页查询扫描计划
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findScanPlayPage = async value =>{
        const data = await Axios.post('/integratedIn/findScanPlayPage',value)
        if (data.code!==0){
            message.error(data.msg)
        }
        return data
    }

    /**
     * 查询关联的扫描计划
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findRelevanceScanPlay = async value =>{
        const data = await Axios.post('/integratedIn/findRelevanceScanPlay',value)
        if (data.code!==0){
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
     * 删除系统集成关联表
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteIntRelevancy = async (repositoryId,relevancyId) =>{
        const data = await Axios.post('/intRelevancy/deleteIntRelevancyByIn', {repositoryId:repositoryId,relevancyId:relevancyId})
        if(data.code===0){
            message.info('删除成功',0.5)
            this.fresh = !this.fresh
        }
        return data
    }
}

const integrateInStore=new IntegrateInStore()
export default integrateInStore
