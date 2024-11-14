import {observable,action} from 'mobx';
import {getUser,Axios} from 'tiklab-core-ui';

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
    findTagList = async (param) =>{
        const data = await Axios.post('/tag/findTagList',param)
        if (data.code===0){
            this.tagList=data.data
        }
        return data
    }
}

const tagStore=new TagStore()
export default tagStore
