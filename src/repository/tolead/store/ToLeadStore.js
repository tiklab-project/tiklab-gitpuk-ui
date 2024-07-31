import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios} from "thoughtware-core-ui";
export class ToLeadStore{

    //导入记录
    @observable
    leadRecordList=[]

    @observable refresh=false
    /**
     * 创建第三方仓库认证信息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createImportAuth = async value =>{
        const data = await Axios.post('/leadAuth/createLeadAuth',value)
        if(data.code===0){
            this.refresh=!this.refresh
        }
        return data
    }

    /**
     * 删除绑定
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteImportAuth = async value =>{
        const param=new FormData()
        param.append("id",value)
        const data = await Axios.post('/leadAuth/deleteLeadAuth',param)
        return data
    }

    /**
     * 通过ID 查询认证信息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findLeadAuth = async value =>{
        const param=new FormData()
        param.append('id',value)
        const data = await Axios.post('/leadAuth/findLeadAuth',param)
        return data
    }

    /**
     * 条件查询第三方仓库认证信息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findImportAuthList = async value =>{
        const data = await Axios.post('/leadAuth/findLeadAuthList',value)
        return data
    }

    /**
     * 查询第三方仓库的仓库列表
     * @param importAuthId
     * @returns {Promise<*>}
     */
    @action
    findThirdRepositoryList = async (importAuthId,page) =>{
        const param=new FormData()
        param.append("importAuthId",importAuthId)
        param.append("page",page)
        const data = await Axios.post('/toLead/findThirdRepositoryList',param)
        return data
    }

    /**
     * 导入第三方仓库
     * @param value
     * @returns {Promise<*>}
     */
    @action
    toLeadRepository = async value =>{
        const data = await Axios.post('/toLead/toLeadRepository',value)
        return data
    }

    /**
     * 查询导入第三方仓库结果
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findToLeadResult = async value =>{
        const param=new FormData()
        param.append("key",value)
        const data = await Axios.post('/toLead/findToLeadResult',param)
        return data
    }

    /**
     * 查询导入记录
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAllLeadRecord = async value =>{
        const data = await Axios.post('/leadRecord/findAllLeadRecord')
        if (data.code===0){
            this.leadRecordList=data.data
        }
        return data
    }
}
const toLeadStore=new ToLeadStore()
export default toLeadStore
