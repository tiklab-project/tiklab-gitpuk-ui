import {observable,action} from 'mobx';
import {message} from 'antd';
import {getUser,Axios} from 'tiklab-core-ui';


export class RepositoryCollectStore {

    @observable
    coRefresh=false

    /**
     * 条件查询收藏
     * @param param
     */
    @action
    findRepositoryCollectList = async (param) =>{
        const data = await Axios.post('/repositoryCollect/findRepositoryCollectList',param)
        if (data.code===0){
            this.coRefresh=!this.coRefresh
        }
        return data
    }


    /**
     * 添加收藏
     * @param param
     */
    @action
    createRepositoryCollect = async (param) =>{
        const data = await Axios.post('/repositoryCollect/createRepositoryCollect',param)
        if (data.code===0){
            this.coRefresh=!this.coRefresh
        }
        return data
    }

    /**
     * 取消收藏
     * @param param
     */
    @action
    deleteCollectByRpyId = async (repositoryId) =>{
        const param=new FormData()
        param.append('repositoryId',repositoryId)
        const data = await Axios.post('/repositoryCollect/deleteCollectByRpyId',param)
       /* if (data.code===0){
            this.coRefresh=!this.coRefresh
        }*/
        return data
    }
}

let repositoryCollectStore=new RepositoryCollectStore()
export default repositoryCollectStore;

