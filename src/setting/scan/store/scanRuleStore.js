import {observable,action} from 'mobx';
import {Axios, getUser} from 'tiklab-core-ui';

export class ScanRuleStore {
    // 刷新
    @observable
    fresh = false


    /**
     * 创建规则
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createScanRule = async (param) =>{
        const data = await Axios.post('/scanRule/createScanRule',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
    }

    /**
     * 删除规则
     * @param value
     * @returns {Promise<void>}
     */
    @action
    deleteScanRule = async (id) =>{
        const param=new FormData()
        param.append("id",id)
        const data = await Axios.post('/scanRule/deleteScanRule',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
    }


    /**
     * 条件查询规则
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findScanRulePage = async (param) =>{
        const data = await Axios.post('/scanRule/findScanRulePage',param)
        return data
    }





}

const scanRuleStore=new ScanRuleStore()
export default  scanRuleStore
