import {action, observable} from "mobx"
import {Axios, getUser} from "thoughtware-core-ui";

class HomePageStore {

    //最近提交仓库的记录
    @observable
    recordCommitList=[]

    //最近打开的记录
    @observable
    recordOpenList=[]

    /**
     * 查询最近打开的记录
     * @returns {Promise<unknown>}
     */
    @action
    findRecordOpenList = async () =>{
        const param={
            userId:getUser().userId,
        }
        const data = await Axios.post('/recordOpen/findRecordOpenList',param)
        if (data.code===0){
            this.recordOpenList=data.data
        }
        return data
    }

    /**
     * 查询最近上传的记录
     * @returns {Promise<unknown>}
     */
    @action
    findRecordCommitList = async () =>{
        const param={
            userId:getUser().userId,
        }
        const data = await Axios.post('/recordCommit/findRecordCommitList',param)
        if (data.code===0){
            this.recordCommitList=data.data
        }
        return data
    }


}

const homePageStore = new HomePageStore();
export default homePageStore
