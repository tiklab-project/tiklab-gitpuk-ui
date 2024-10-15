import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'tiklab-core-ui';

export class ScanSchemeRuleStore {
    // 刷新
    @observable
    fresh = false

    /**
     * 更新扫描方案中的规则
     * @param value
     * @returns {Promise<void>}
     */
    @action
    updateScanSchemeRule = async (param) =>{
        const data = await Axios.post('/scanSchemeRule/updateScanSchemeRule',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }


    /**
     * 条件查询扫描方案的规则集
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findScanSchemeRuleSetList = async (param) =>{
        const data = await Axios.post('/scanSchemeRuleSet/findScanSchemeRuleSetList',param)
        return data
    }

    /**
     * 移出扫描方案的规则集
     * @param value
     * @returns {Promise<void>}
     */
    @action
    deleteScanSchemeRuleSet = async (id) =>{
        const param=new FormData()
        param.append("id",id)
        const data = await Axios.post('/scanSchemeRuleSet/deleteScanSchemeRuleSet',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }

    /**
     * 分页查询扫描方案的规则集关联的规则
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findScanSchemeRulePage = async (param) =>{
        const data = await Axios.post('/scanSchemeRule/findScanSchemeRulePage',param)
        return data
    }

}

const scanSchemeRuleStore=new ScanSchemeRuleStore()
export default  scanSchemeRuleStore
