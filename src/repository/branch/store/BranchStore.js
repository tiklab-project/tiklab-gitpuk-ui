import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios} from 'thoughtware-core-ui';

export class BranchStore{

    // 分支
    @observable
    branchList = []

    // 刷新
    @observable
    fresh = false

    /**
     * 获取仓库下面所有分支
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
        return data;
    }

    /**
     * 条件查询分支
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findBranchList = async params =>{
        const data = await Axios.post('/branch/findBranchList',params)
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

    /**
     * 修改默认分支
     * @param value
     * @returns {Promise<void>}
     */
    @action
    updateDefaultBranch=async value=>{
        const data = await Axios.post('/branch/updateDefaultBranch',value)
        if(data.code===0){
            message.success('切换成功',1)
        }else {
            message.error('切换失败',1)
        }

    }

}

const branchStore= new BranchStore()
export default branchStore
