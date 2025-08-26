import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'tiklab-core-ui';

export class MergeStore {
    // 刷新
    @observable
    fresh = false

    @observable
    mergeClashFileList=[]

    @observable
    mergeRequest=''


    /**
     * 创建合并请求
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createMergeRequest = async value =>{
        const data = await Axios.post('/mergeRequest/createMergeRequest',value)
        if(data.code===0){
            message.info('创建成功',0.5)
            this.fresh = !this.fresh
        }else {
            message.info("创建失败")
        }
        return data;
    }

    /**
     * 通过id 查询合并请求
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findMergeRequest = async value =>{
        const param=new FormData()
        param.append("id",value)
        const data = await Axios.post('/mergeRequest/findMergeRequest',param)
        if (data.code===0){
            this.mergeRequest=data.data
        }
        return data;
    }



    /**
     * 条件分页查询合并请求数
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findMergeStateNum = async param =>{
        const data = await Axios.post('/mergeRequest/findMergeStateNum',param)
        return data;
    }

    /**
     * 条件分页查询合并请求
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findMergeRequestPage = async param =>{
        const data = await Axios.post('/mergeRequest/findMergeRequestPage',param)
        return data;
    }


    /**
     * 条件查询合并请求list
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findMergeRequestList = async param =>{
        const data = await Axios.post('/mergeRequest/findMergeRequestList',param)
        return data;
    }

    /**
     * 更新合并请求
     * @param value
     * @returns {Promise<void>}
     */
    @action
    updateMergeRequest = async param =>{
        const data = await Axios.post('/mergeRequest/updateMergeRequest',param)
        if (data.code===0){
            this.fresh=!this.fresh
        }
        return data;
    }

    /**
     * 执行合并
     * @param value
     * @returns {Promise<void>}
     */
    @action
    execMerge = async param =>{
        const data = await Axios.post('/mergeRequest/execMerge',param)
        if (data.code===0){
            message.info("合并成功",1)
            this.fresh=!this.fresh
        }else {
            message.error(data.msg)
        }
        return data;
    }

    /**
     * 查询合并分支的冲突文件
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findConflictingFile = async param =>{
        const data = await Axios.post('/mergeRequest/findConflictingFile',param)
        if (data.code===0){
            this.mergeClashFileList=data.data
        }
        return data;
    }

    /**
     * 查询合并分支的冲突文件的详情
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findConflictingFileDetails = async param =>{
        const data = await Axios.post('/mergeRequest/findConflictingFileDetails',param)
        if (data.code===0){
            this.mergeClashFileList=data.data
        }
        return data;
    }

    /**
     * 在线解决冲突文件
     * @param value
     * @returns {Promise<void>}
     */
    @action
    conflictResolutionFile = async param =>{
        const data = await Axios.post('/mergeRequest/conflictResolutionFile',param)
        if (data.code===0){
            this.mergeClashFileList=data.data
            message.info("提交成功")
        }
        return data;
    }
}

const mergeStore=new MergeStore()
export default  mergeStore
