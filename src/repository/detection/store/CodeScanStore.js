import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'tiklab-core-ui';

export class CodeScanStore {
    // 刷新
    @observable
    fresh = false

    //代码扫描结果
    @observable
    scanResult=''

    @observable
    codeScan=''
    /**
     * 执行代码检测
     * @param value
     * @returns {Promise<void>}
     */
    @action
    codeScanExec = async (repositoryId,authThirdId) =>{
        const param=new FormData();
        param.append("repositoryId",repositoryId)
        param.append("deployServerId",authThirdId)
        const data = await Axios.post('/codeScan/codeScanExec',param)
        switch (data.code){
            case 0:
                break
            default:
                message.info(data.msg,0.5)
                break
        }
        return data
    }

    /**
     * 查询检测结果
     * @param repositoryId
     * @returns {Promise<void>}
     */
    @action
    findScanResult = async (repositoryId) =>{
        const param=new FormData();
        param.append("repositoryId",repositoryId)
        const data = await Axios.post('/codeScan/findScanResult',param)
        if(data.code===0){
           this.scanResult=data.data
        }
    }

    /**
     * 查询检测状态
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findScanState = async (repositoryId) =>{
        const param=new FormData();
        param.append("repositoryId",repositoryId)
        const data = await Axios.post('/codeScan/findScanState',param)
       return data
    }

    /**
     * 创建扫描方案
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createCodeScan = async (value) =>{
        const data = await Axios.post('/codeScan/createCodeScan',value)
        if(data.code===0){
            this.fresh = !this.fresh
        }
    }

    /**
     * 查询扫描方案
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findCodeScanByRpyId = async (value) =>{
        const param=new FormData();
        param.append("repositoryId",value)
        const data = await Axios.post('/codeScan/findCodeScanByRpyId',param)
        if(data.code===0){
            this.codeScan=data.data
        }
    }
}
const codeScanStore=new CodeScanStore()
export default  codeScanStore
