import {observable,action} from 'mobx';
import {getUser,Axios} from 'tiklab-core-ui';

export class LfsListStore {


    @observable
    lfsRefresh=false

    @observable
    refresh=false

    /**
     * 条件查询仓库lfs文件
     * @param param
     * @returns {Promise<unknown>}
     */
    @action
    findRepositoryLfsList = async (param) =>{
        this.lfsRefresh=true
        const data = await Axios.post('/repositoryLfs/findRepositoryLfsList',param)
        this.lfsRefresh=false
        return data
    }

    /**
     * 删除lfs
     * @param param
     * @returns {Promise<unknown>}
     */
    @action
    deleteRepositoryLfs = async (id) =>{
        this.refresh=true
        const param=new FormData()
        param.append('id',id)
        const data = await Axios.post('/repositoryLfs/deleteRepositoryLfs',param)
        this.refresh=false
        return data
    }
}


let lfsListStore=new LfsListStore()
export default lfsListStore;
