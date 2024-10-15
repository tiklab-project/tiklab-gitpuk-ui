import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'tiklab-core-ui';

export class ScanRuleSetStore {
    // 刷新
    @observable
    fresh = false

    // 规则集list
    @observable
    scanRuleSetList = []
    @observable
    scanRuleSet=''

    /**
     * 创建规则集
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createScanRuleSet = async (param) =>{
        const data = await Axios.post('/scanRuleSet/createScanRuleSet',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }
    /**
     * 删除
     * @param value
     * @returns {Promise<void>}
     */
    @action
    deleteScanRuleSet = async (id) =>{
        const param=new FormData()
        param.append("id",id)
        const data = await Axios.post('/scanRuleSet/deleteScanRuleSet',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
    }
    /**
     * 通过id查询规则集
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findScanRuleSet = async (id) =>{
        const param=new FormData()
        param.append("id",id)
        const data = await Axios.post('/scanRuleSet/findScanRuleSet',param)
        if (data.code===0){
            
            this.scanRuleSet = data.data
        }
    }

    /**
     * 查询所有规则集内容
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findAllScanRuleSet = async () =>{
        const data = await Axios.post('/scanRuleSet/findAllScanRuleSet')
        if (data.code===0){
            this.scanRuleSetList = data.data
        }
    }

    /**
     * 条件查询规则集
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findScanRuleSetList = async (param) =>{
        const data = await Axios.post('/scanRuleSet/findScanRuleSetList',param)
        if (data.code===0){
            this.scanRuleSetList = data.data
        }
        return data;
    }

    /**
     * 通过方案id 查询规则集
     * @param schemeId
     * @returns {Promise<void>}
     */
    @action
    findScanRuleSetBySchemeId = async (schemeId) =>{
        const param=new FormData();
        param.append("schemeId",schemeId)
        const data = await Axios.post('/scanRuleSet/findScanRuleSetBySchemeId',param)
        if (data.code===0){
            this.scanRuleSetList = data.data
        }
        return data;
    }

    /**
     * 查询没有添加到当前方案的规则集
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findScanRuleSetNotScheme = async (schemeId) =>{
        const param=new FormData()
        param.append("schemeId",schemeId)
        const data = await Axios.post('/scanRuleSet/findScanRuleSetNotScheme',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }


}

const scanRuleSetStore=new ScanRuleSetStore()
export default  scanRuleSetStore
