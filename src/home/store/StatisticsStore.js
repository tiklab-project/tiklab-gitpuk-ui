import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios} from 'tiklab-core-ui';

export class StatisticsStore {

    @observable
    commitNumData = null

    @observable
    commitCodeData=null

    @observable
    commitNumState=false

    @observable
    commitCodeState =false

    @observable
    todoSum=null

    /**
     * 统计提交数量
     * @param value
     * @returns {Promise<*>}
     */
    @action
    commitStatistics = async value =>{

        this.commitNumState=true
        const data = await Axios.post('/statistics/commitStatistics',value)
        this.commitNumState=false
        if(data.code===0){
            this.commitNumData = data.data
        }
        return data
    }

    /**
     * 所有用户统计提交数量
     * @param value
     * @returns {Promise<*>}
     */
    @action
    commitRpyUserStatistics = async value =>{
        this.commitNumState=true
        const data = await Axios.post('/statistics/commitRpyUserStatistics',value)
        this.commitNumState=false
        if(data.code===0){
            this.commitNumData = data.data
        }
        return data
    }

    /**
     * 统计仓库提交数量
     * @param value
     * @returns {Promise<*>}
     */
    @action
    commitRpyStatistics = async value =>{
        this.commitNumState=true
        const data = await Axios.post('/statistics/commitRpyStatistics',value)
        this.commitNumState=false

        return data
    }

    /**
     * 统计提交代码
     * @param value
     * @returns {Promise<*>}
     */
    @action
    codesStatistics = async value =>{
        this.commitCodeState=true
        const data = await Axios.post('/statistics/codesStatistics',value)
        this.commitCodeState=false
        if(data.code===0){
            this.commitCodeData = data.data
        }
        return data
    }

    /**
     * 统计单个仓库的合并请求数
     * @param value
     * @returns {Promise<*>}
     */
    @action
    mergeReqStatistics = async value =>{
        const data = await Axios.post('/statistics/mergeReqStatistics',value)
        return data
    }

    /**
     * 统计仓库的合并请求数
     * @param value
     * @returns {Promise<*>}
     */
    @action
    mergeReqRpyStatistics = async value =>{
        const data = await Axios.post('/statistics/mergeReqRpyStatistics',value)
        return data
    }

    /**
     * 时间段内所有仓库用护的合并请求数
     * @param value
     * @returns {Promise<*>}
     */
    @action
    mergeReqRpyUserStatistics = async value =>{
        const data = await Axios.post('/statistics/mergeReqRpyUserStatistics',value)
        return data
    }

    /**
     * 统计某个项目下，某个成员负责的事项对比
     * @param value
     * @returns {Promise<*>}
     */
    @action
    statisticsTodoWorkByStatus = async value =>{
        const data = await Axios.post('/statistics/statisticsTodoWorkByStatus',value)
        if (data.code===0){
            this.todoSum=data.data
        }
        return data
    }

    /**
     * 统计某个项目下，某个成员负责的事项对比
     * @param value
     * @returns {Promise<*>}
     */
    @action
    commitUserStatistics = async value =>{
        const data = await Axios.post('/statistics/commitUserStatistics',value)
        if (data.code===0){
            this.todoSum=data.data
        }
        return data
    }


}
const statisticsEeStore=new StatisticsStore()
export default statisticsEeStore

