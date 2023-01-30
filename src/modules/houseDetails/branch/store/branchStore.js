import {observable,action} from 'mobx'

import {
    FindAllBranch,
    CreateBranch,
    DeleteBranch,
} from '../api/branch'

import {message} from 'antd'
import {getUser} from 'tiklab-core-ui'

export class BranchStore{

    @observable branchList = []
    @observable fresh = false

    @action
    findAllBranch = async value =>{
        const params = new FormData()
        params.append('codeId',value)
        const data = await FindAllBranch(params)
        if(data.code===0){
            this.branchList = data.data &&  data.data
        }
    }

    @action
    createBranch = async value =>{
        const data = await CreateBranch(value)
        if(data.code===0){
            message.info('创建成功',0.5)
            this.fresh = !this.fresh
        }
    }

    @action
    deleteBranch = async value =>{
        const data = await DeleteBranch(value)
        if(data.code===0){
            message.info('删除成功',0.5)
            this.fresh = !this.fresh
        }
    }

}


export const BRANCH_STORE='branchStore'
