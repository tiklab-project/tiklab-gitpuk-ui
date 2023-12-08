import {observable,action} from 'mobx';
import {getUser,Axios} from 'thoughtware-core-ui';

export class TagStore {

    @observable
    tagList=[]

    @observable
    tag=''

    /**
     * 创建标签
     * @param param
     */
    @action
    createTag = async (param) =>{
        const data = await Axios.post('/tag/createTag',param)
        return data
    }

    /**
     * 删除标签
     * @param param
     */
    @action
    deleteTag = async (param) =>{
        const data = await Axios.post('/tag/deleteTag',param)
        return data
    }

    /**
     * 查询标签
     * @param rpyId
     */
    @action
    findTag = async (rpyId) =>{
        const res=new FormData()
        res.append("rpyId",rpyId)
        const data = await Axios.post('/tag/findTag',res)
        if (data.code===0){
            this.tagList=data.data
        }
        return data
    }

    /**
     * 查询标签
     * @param rpyId
     */
    @action
    findTagByName = async (rpyId,tagName) =>{
        const res=new FormData()
        res.append("rpyId",rpyId)
        res.append("tagName",tagName)
        const data = await Axios.post('/tag/findTagByName',res)
        if (data.code===0){
            this.tag=data.data
        }
        return data
    }
}

const tagStore=new TagStore()
export default tagStore
