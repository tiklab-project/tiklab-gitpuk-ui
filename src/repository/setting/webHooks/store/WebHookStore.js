import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios} from 'tiklab-core-ui';

export class WebHookStore{

    // webHookList
    @observable
    webHookList = []

    // 刷新
    @observable
    fresh = false

    /**
     * 查询webHook
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findRepWebHookPag = async params =>{
        const data = await Axios.post('/repRepWebHook/findRepWebHookPag',params)
        return data;
    }

    /**
     * 创建webHook
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createRepWebHook = async params =>{
        const data = await Axios.post('/repRepWebHook/createRepWebHook',params)
        if (data.code===0){
            this.fresh=!this.fresh
        }
        return data;
    }

    /**
     * 删除webHook
     * @param value
     * @returns {Promise<void>}
     */
    @action
    deleteRepWebHook = async value =>{
        const params = new FormData()
        params.append('id',value)
        const data = await Axios.post('/repRepWebHook/deleteRepWebHook',params)
        if (data.code===0){
            this.fresh=!this.fresh
        }else {
            message.error(data.msg)
        }
        return data;
    }

    /**
     * 更新webHook
     * @param value
     * @returns {Promise<void>}
     */
    @action
    updateRepWebHook = async params =>{
        const data = await Axios.post('/repRepWebHook/updateRepWebHook',params)
        if (data.code===0){
            this.fresh=!this.fresh
        }else {
            message.error(data.msg)
        }
        return data;
    }

}

const webHookStore= new WebHookStore()
export default webHookStore
