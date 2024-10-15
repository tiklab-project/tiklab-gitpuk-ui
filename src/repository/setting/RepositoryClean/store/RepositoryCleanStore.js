import {observable,action} from 'mobx';
import {getUser,Axios} from 'tiklab-core-ui';

export class RepositoryCleanStore {


    @observable
    refresh=false

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

        const data = await Axios.post('/repositoryClean/findLargeFileResult',param)
        return data
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
