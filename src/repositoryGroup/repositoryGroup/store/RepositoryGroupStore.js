import {observable,action} from 'mobx';
import {
    CreateGroup,
    DeleteGroup,
    UpdateGroup,
    FindUserGroup
} from '../api/RepositoryGroup';
import {getUser} from 'tiklab-core-ui';
import {message} from 'antd';

export class GroupStore {

    // 仓库组类型
    @observable
    groupType = 1

    // 仓库组列表
    @observable
    groupList = []

    // 单个仓库组信息
    @observable
    groupInfo = ''

    /**
     * 设置单个仓库组信息
     * @param value
     */
    @action
    setGroupInfo = value =>{
        this.groupInfo = value
    }

    /**
     * 设置仓库组类型
     * @param value
     */
    @action
    setGroupType = value =>{
        this.groupType = value
    }

    /**
     * 添加仓库组
     * @param values
     * @returns {Promise<*>}
     */
    @action
    createGroup = async values =>{
        const data = await CreateGroup({
            ...values,
            user:{id:getUser().userId}
        })
        if(data.code===0){
            message.info('创建成功',0.5)
        }
        else {
            message.info(data.msg)
        }
        return data
    }

    /**
     * 删除仓库组
     * @param values
     * @returns {Promise<*>}
     */
    @action
    deleteGroup = async values =>{
        const data = await DeleteGroup(values)
        if(data){

        }
        return data
    }

    /**
     * 更新仓库组
     * @param values
     * @returns {Promise<*>}
     */
    @action
    updateGroup = async values =>{
        const data = await UpdateGroup(values)
        if(data){

        }
        return data
    }

    /**
     * 获取仓库组
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findUserGroup = async values =>{
        const param = new FormData()
        param.append('userId',getUser().userId)
        const data = await FindUserGroup(param)
        if(data.code===0){
            this.groupList = data.data && data.data
        }
        return data
    }

}


export const GROUP_STORE='groupStore'
