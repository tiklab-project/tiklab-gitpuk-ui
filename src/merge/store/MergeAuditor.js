import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'thoughtware-core-ui';

export class MergeAuditorStore {
    // 刷新
    @observable
    fresh = false



    /**
     * 查询项目用户
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findDmUserList = async value =>{
        const data = await Axios.post('/dmUser/findDmUserList',value)
        return data;
    }


    /**
     * 添加审核成员
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createMergeAuditor = async value =>{
        const data = await Axios.post('/mergeAuditor/createMergeAuditor',value)
        return data;
    }

    /**
     * 更新审核状态
     * @param value
     * @returns {Promise<void>}
     */
    @action
    updateMergeAuditor = async value =>{
        const data = await Axios.post('/mergeAuditor/updateMergeAuditor',value)
        if (data.code!==0){
            message.error("审核失败")
        }
        return data;
    }

    /**
     * 条件查询审核
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findMergeAuditorList = async value =>{
        const data = await Axios.post('/mergeAuditor/findMergeAuditorList',value)
        return data;
    }

    /**
     * 移除审核
     * @param value
     * @returns {Promise<void>}
     */
    @action
    deleteMergeAuditor = async value =>{
        const param=new FormData()
        param.append('id',value)
        const data = await Axios.post('/mergeAuditor/deleteMergeAuditor',param)
        return data;
    }

}

const mergeAuditorStore=new MergeAuditorStore()
export default  mergeAuditorStore
