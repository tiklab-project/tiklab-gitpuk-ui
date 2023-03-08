import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios} from 'tiklab-core-ui';

export class BranchStore{

    // 分支
    @observable
    branchList = []

    // 刷新
    @observable
    fresh = false

    /**
     * 获取所有分支
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findAllBranch = async value =>{
        const params = new FormData()
        params.append('rpyId',value)
        const data = await Axios.post('/branch/findAllBranch',params)
        if(data.code===0){
            this.branchList = data.data && data.data
        }
    }


    /**
     * 添加分支
     * @param value
     * @returns {Promise<void>}
     */
    @action
    createBranch = async value =>{
        const data = await Axios.post('/branch/createBranch',value)
        if(data.code===0){
            message.info('创建成功',0.5)
            this.fresh = !this.fresh
        }
    }

    /**
     * 删除分支
     * @param value
     * @returns {Promise<void>}
     */
    @action
    deleteBranch = async value =>{
        const data = await Axios.post('/branch/deleteBranch',value)
        if(data.code===0){
            message.info('删除成功',0.5)
            this.fresh = !this.fresh
        }
    }

}


export const BRANCH_STORE='branchStore'