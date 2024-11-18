import {observable,action} from 'mobx';
import {getUser,Axios} from 'tiklab-core-ui';
import {message} from "antd";

export class RepositoryCleanStore {


    @observable
    refresh=false

    // 定时任务执行状态
    @observable
    execState=false

    @observable
    largeFileList=[]


    //设置定时任务执行状态
    @action
    setExecState=async(state)=>{
        this.execState=state
    }

    //排序
    @action
    sortLargeFile=async (value)=>{
        if (this.largeFileList.length>0){
            if (value==='asc'){
                this.largeFileList=this.largeFileList.sort((a, b) => a.fileSize - b.fileSize);
            }
            if (value==='desc'){
                debugger
                this.largeFileList=this.largeFileList.sort((a, b) => b.fileSize - a.fileSize);
            }
        }
    }

    /**
     * 条件查询大文件
     * @param param
     * @returns {Promise<unknown>}
     */
    @action
    findLargeFile = async (param) =>{
        const data = await Axios.post('/repositoryClean/findLargeFile',param)
        return data
    }

    /**
     * 获取大文件结果
     * @param param
     * @returns {Promise<unknown>}
     */
    @action
    findLargeFileResult = async (param) =>{
        const res = await Axios.post('/repositoryClean/findLargeFileResult',param)
        if (res.code===0){
            const data=res.data[0]
            if (data.msg==='none'){
                this.largeFileList=[]
                message.success('查询数据为空',1)
            }
            if (data.msg==='fail'){
                this.largeFileList=[]
                message.error('查询失败',1)
            }
            if (data.msg!=='none'&&data.msg!=='fail'){
                this.largeFileList=res.data
            }
        }
        return res
    }


    /**
     * 执行清理裸仓库中你的无效文件
     * @param param
     * @returns {Promise<unknown>}
     */
    @action
    execCleanFile = async (rpyId) =>{
        const param= new FormData();
        param.append("rpyId",rpyId)
        const data = await Axios.post('/repositoryClean/execCleanFile',param)
        if (data.code===0){
           this.refresh=!this.refresh
        }
        return data
    }



    /**
     * 清除大文件
     * @param param
     * @returns {Promise<unknown>}
     */
    @action
    clearLargeFile = async (param) =>{
        const data = await Axios.post('/repositoryClean/clearLargeFile',param)
        return data
    }

    /**
     * 获取清除大文件结果
     * @param param
     * @returns {Promise<unknown>}
     */
    @action
    findClearResult = async (rpyId) =>{
        const param=new FormData()
        param.append("repositoryId",rpyId)
        const data = await Axios.post('/repositoryClean/findClearResult',param)
        return data
    }

}


let repositoryCleanStore=new RepositoryCleanStore()
export default repositoryCleanStore;
