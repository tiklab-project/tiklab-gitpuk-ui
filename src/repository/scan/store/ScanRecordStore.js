/**
 * @name: ScanPlayStore
 * @author: liminliang
 * @date: 2023-11-1 15:00
 * @description：扫描记录
 * @update: 2023-11-1 15:00
 */

import { observable, action } from "mobx";
import {Axios} from 'tiklab-core-ui';
import {message} from 'antd';
export class ScanRecordStore  {

    @observable
    refresh=false

    //扫描方案
    @observable scanScheme=[]


    /**
     *通过id 删除
     * @param  param
     */
    @action
    deleteScanRecord=async (id)=>{
        const param=new FormData()
        param.append("id",id)
        const res = await Axios.post("/scanRecord/deleteScanRecord",param)
        if (res.code===0){
            this.refresh=!this.refresh
        }
        return res
    }


    /**
     *通过id 查询扫描记录
     * @param  param
     */
    @action
    findScanRecord=async (id)=>{
        const param=new FormData()
        param.append("id",id)
        const res = await Axios.post("/scanRecord/findScanRecord",param)
        return res
    }


    /**
     *分页查询扫描记录
     * @param  param
     */
    @action
    findScanRecordPage=async (param)=>{
        const res = await Axios.post("/scanRecord/findScanRecordPage",param)
        return res
    }

    /**
     *通过计划分页查询扫描记录实例
     * @param  param
     */
    @action
    findRecordInstancePageByPlay=async (param)=>{
        const res = await Axios.post("/scanRecordInstance/findRecordInstancePageByPlay",param)
        return res
    }

}
let scanRecordStore=new ScanRecordStore()
export default scanRecordStore;
