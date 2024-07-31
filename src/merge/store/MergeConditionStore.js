/**
 * 合并请求动态
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'thoughtware-core-ui';
import {MergeStore} from "./MergeStore";
export  class MergeConditionStore{

    // 刷新
    @observable
    conFresh = false

    /**
     * 条件查询合并请求动态
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findMergeConditionList = async param =>{
        const data = await Axios.post('/mergeCondition/findMergeConditionList',param)
        return data;
    }

    /**
     * 创建动态评论
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createMergeComment = async param =>{
        const data = await Axios.post('/mergeComment/createMergeComment',param)
        if (data.code===0){
            this.conFresh=!this.conFresh
        }
        return data;
    }

    /**
     * 条件查询动态评论
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findMergeCommentList = async param =>{
        const data = await Axios.post('/mergeComment/findMergeCommentList',param)
        return data;
    }


    /**
     * 删除动态评论
     * @param value
     * @returns {Promise<void>}
     */
    @action
    deleteMergeComment = async value =>{
        const param=new FormData()
        param.append("id",value)
        const data = await Axios.post('/mergeComment/deleteMergeComment',param)
        if (data.code===0){
            this.conFresh=!this.conFresh
        }
        return data;
    }

}
const mergeConditionStore=new MergeConditionStore()
export default  mergeConditionStore
