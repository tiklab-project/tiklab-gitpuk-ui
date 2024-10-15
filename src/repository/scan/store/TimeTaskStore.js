/**
 * @name: TimeTaskStore
 * @author: liminliang
 * @date: 2024-01-03 15:00
 * @description：定时任务store
 * @update: 2023-01-03 15:00
 */

import { observable, action } from "mobx";
import {Axios} from 'tiklab-core-ui';
export class TimeTaskStore  {

    @observable
    refresh=false

    /**
     * 创建定时任务
     * @param  param
     */
    @action
    createTimeTask=async (param)=>{
        const res = await Axios.post("/timeTask/createTimeTask",param)
        if (res.code===0){
            this.refresh= !this.refresh
        }
        return res
    }

    /**
     * 查询定时任务列表
     * @param  param
     */
    @action
    findTimeTaskList=async (param)=>{
        const res = await Axios.post("/timeTask/findTimeTaskList",param)
        return res
    }

    /**
     * 删除定时任务
     * @param  param
     */
    @action
    deleteTimeTask=async (id)=>{
        const param=new FormData()
        param.append('id',id)
        const res = await Axios.post("/timeTask/deleteTimeTask",param)
        if (res.code===0){
            
            this.refresh= !this.refresh
        }
        return res
    }

}
let timeTaskStore=new TimeTaskStore()
export default timeTaskStore;
