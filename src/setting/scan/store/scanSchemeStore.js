import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'thoughtware-core-ui';

export class ScanSchemeStore {
    // 刷新
    @observable
    fresh = false

    // 第三方认证地址
    @observable
    scanSchemeList = []

    /**
     * 查询扫描方案
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findAllScanScheme = async () =>{
        const data = await Axios.post('/scanScheme/findAllScanScheme')
        if (data.code===0){
            this.scanSchemeList=data.data
        }
        return data
    }

    /**
     * 条件查询扫描方案
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findScanSchemeList = async (param) =>{
        const data = await Axios.post('/scanScheme/findScanSchemeList',param)
        return data
    }

    /**
     * 分页查询扫描方案
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findScanSchemePage = async (param) =>{
        const data = await Axios.post('/scanScheme/findScanSchemePage',param)
        return data
    }

    /**
     * 创建扫描方案
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createScanScheme = async (param) =>{
        const data = await Axios.post('/scanScheme/createScanScheme',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }

    /**
     * 删除扫描方案
     * @param value
     * @returns {Promise<void>}
     */
    @action
    deleteScanScheme = async (id) =>{
        const param=new FormData()
        param.append("id",id)
        const data = await Axios.post('/scanScheme/deleteScanScheme',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
    }
    /**
     * 更新扫描方案和规则关系
     * @param value
     * @returns {Promise<void>}
     */
    @action
    updateScanScheme = async (param) =>{
        const data = await Axios.post('/scanScheme/updateScanScheme',param)
        if (data.code===0){
            message.info("更新成功",1)
            this.fresh = !this.fresh
        }
        return data
    }



    /**
     * 创建扫描方案和规则集关系
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createScanSchemeRuleSet = async (param) =>{
        const data = await Axios.post('/scanSchemeRuleSet/createScanSchemeRuleSet',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }

    /**
     * 通过扫描方案和规则集查询规则
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createScanSchemeRuleSet = async (param) =>{
        const data = await Axios.post('/scanSchemeRuleSet/createScanSchemeRuleSet',param)
        if (data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }



    /**
     * 创建扫描方案和sonar关系
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createScanSchemeSonar = async (param) =>{
        const data = await Axios.post('/scanSchemeSonar/createScanSchemeSonar',param)
        return data
    }

    /**
     * 查询扫描方案sonar 关系表
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findScanSchemeSonarList = async (param) =>{
        const data = await Axios.post('/scanSchemeSonar/findScanSchemeSonarList',param)
        return data
    }

}

const scanSchemeStore=new ScanSchemeStore()
export default  scanSchemeStore
