import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'tiklab-core-ui';

export class ResourcesStore {
    // 刷新
    @observable
    fresh = false

    /**
     * 查询资源
     * @param param
     * @returns {Promise<void>}
     */
    @action
    findResource = async (param) =>{
        const data = await Axios.post('/resourceMan/findResource',param)
        this.fresh = !this.fresh
        return data
    }


}

const resourcesStore=new ResourcesStore()
export default  resourcesStore
