import {observable,action} from 'mobx';
import {getUser,Axios} from 'tiklab-core-ui';
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

    // 加载
    @observable
    isLoading = false

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
       this.isLoading = true
       const data=  await Axios.post('/rpyGroup/createGroup',{
            ...values,
            user:{id:getUser().userId}
        })
       if(data.code===0){
           message.info('创建成功',0.5)
       }else{
           message.info(data.msg)
       }
        this.isLoading = false
       return data
    }

    /**
     * 删除仓库组
     * @param value 仓库id
     * @returns {Promise<*>}
     */
    @action
    deleteGroup = async value =>{
        this.isLoading = true
        const param=new FormData()
        param.append("groupId",value)
        const data = await Axios.post('/rpyGroup/deleteGroup',param)
        this.isLoading = false
        return data
    }

    /**
     * 更新仓库组
     * @param values
     * @returns {Promise<*>}
     */
    @action
    updateGroup = async values =>{
        this.isLoading = true
        const data = await Axios.post('/rpyGroup/updateGroup',values)
        if(data.code===0){
            message.success('更新成功')
        }
        this.isLoading = false
        return data
    }

    /**
     * 通过名字查询
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findGroupByName = async value =>{
        const param=new FormData()
        param.append("groupName",value)
        const data = await Axios.post('/rpyGroup/findGroupByName',param)
        if(data.code===0){

            this.groupInfo=data.data
        }
        return data
    }

    /**
     * 分页查询仓库组
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findRepositoryGroupPage = async (param) =>{
        const data = await Axios.post('/rpyGroup/findRepositoryGroupPage',param)
        if(data.code===0){
            this.groupList = data.data && data.data
        }
        return data
    }

    /**
     * 查询所有仓库组
     * @returns {Promise<*>}
     */
    @action
    findAllGroup = async () =>{
        const data = await Axios.post('/rpyGroup/findAllGroup')
        if(data.code===0){
            this.groupList = data.data && data.data
        }
        return data
    }
    /**
     * 查询自己创建和授权可以看见的仓库组
     * @returns {Promise<*>}
     */
    @action
    findCanCreateRpyGroup = async () =>{
        const param=new  FormData()
        param.append('userId',getUser().userId)
        const data = await Axios.post('/rpyGroup/findCanCreateRpyGroup',param)

        if(data.code===0){
            this.groupList = data.data && data.data
        }
        return data
    }

}

const groupStore=new GroupStore()
export default groupStore
