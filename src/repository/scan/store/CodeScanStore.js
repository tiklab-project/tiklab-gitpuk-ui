/**
 * @name: ScanPlayStore
 * @author: liminliang
 * @date: 2023-11-1 15:00
 * @description：代码扫描store
 * @update: 2023-11-1 15:00
 */

import { observable, action } from "mobx";
import {Axios} from 'thoughtware-core-ui';
import {message} from 'antd';
export class CodeScanStore  {

    @observable
    refresh=false

    /**
     *执行扫描
     * @param  param
     */
    @action
    codeScanExec=async (scanPlayId)=>{
        const param =new FormData()
        param.append("scanPlayId",scanPlayId)
        const res = await Axios.post("/codeScan/codeScanExec",param)
        return res
    }

    /**
     *查询扫描结果
     * @param  param
     */
    @action
    findScanState=async (scanPlayId,scanWay)=>{
        const param =new FormData()
        param.append("scanPlayId",scanPlayId)
        param.append("scanWay",scanWay)
        const res = await Axios.post("/codeScan/findScanState",param)
        return res
    }


    /**
     *查询sonar 的扫描问题列表
     * @param  param
     */
    @action
    findScanIssuesDeBySonar=async (issueKey,component)=>{
        const param=new FormData()
        param.append("issueKey",issueKey)
        param.append("component",component)
        const res = await Axios.post("/codeScan/findScanIssuesDeBySonar",param)
        return res
    }

}
let codeScanStore=new CodeScanStore()
export default codeScanStore;
