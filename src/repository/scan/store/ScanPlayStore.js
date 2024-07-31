/**
 * @name: ScanPlayStore
 * @author: liminliang
 * @date: 2023-11-1 15:00
 * @description：扫描计划store
 * @update: 2023-11-1 15:00
 */

import { observable, action } from "mobx";
import {Axios} from 'thoughtware-core-ui';
import {message} from 'antd';
export class ScanPlayStore  {

    @observable
    refresh=false

    //扫描计划
    @observable scanPlay=''

    /**
     * id 查询扫描计划
     * @param  param
     */
    @action
    findScanPlay=async (id)=>{
        const param=new FormData()
        param.append("id",id)
        const res = await Axios.post("/scanPlay/findScanPlay",param)

        if (res.code===0){
            this.scanPlay=res.data
        }
        return res
    }

    /**
     * 添加扫描计划
     * @param  param
     */
    @action
    createScanPlay=async (param)=>{
        const res = await Axios.post("/scanPlay/createScanPlay",param)
        this.refresh=!this.refresh
        return res
    }

    /**
     * 更新扫描计划
     * @param  param
     */
    @action
    updateScanPlay=async (param)=>{
        const res = await Axios.post("/scanPlay/updateScanPlay",param)
        if (res.code===0){
            message.info("更新成功",1)
            this.refresh=!this.refresh
        }
        return res
    }

    /**
     * 删除扫描计划
     * @param  param
     */
    @action
    deleteScanPlay=async (scanId)=>{
        const param=new FormData()
        param.append('id',scanId)
        const res = await Axios.post("/scanPlay/deleteScanPlay",param)
        this.refresh=!this.refresh
        return res;
    }

    /**
     * 条件分页查询扫描计划
     * @param  param
     */
    @action
    findScanPlayPage=async (param)=>{
        const res = await Axios.post("/scanPlay/findScanPlayPage",param)
        return res;
    }
    /**
     * 条件查询扫描计划
     * @param  param
     */
    @action
    findScanPlayList=async (param)=>{
        const res = await Axios.post("/scanPlay/findScanPlayList",param)
        return res;
    }

}
let scanPlayStore=new ScanPlayStore()
export default scanPlayStore;
