import {observable,action} from 'mobx';
import {getUser,Axios} from 'tiklab-core-ui';
import {message} from 'antd';

export class XcodeUserStore {

    // 用户
    @observable
    xcodeUserList = []

    /**
     * 查询xcode 的用户
     * @returns {Promise<*>}
     */
    @action
    findUserAndRpy = async (param) =>{
        const data = await Axios.post('/gitPukUser/findUserAndRpy',param)
        return data
    }

    /**
     * 移除项目成员
     * @returns {Promise<*>}
     */
    @action
    deleteDmUser = async (userId) =>{
        const param=new FormData()
        param.append("id",userId)
        const data = await Axios.post('dmUser/deleteDmUser',param)
        if(data.code===0){
            message.success("移除成功")
        }else {
            message.success("移除失败")
        }
        return data
    }
    /**
     * 查询
     * @returns {Promise<*>}
     */
    @action
    findDmUserList = async (param) =>{
        const data = await Axios.post('dmUser/findDmUserList',param)
       return data
    }

    /**
     * 通过用户查询仓库组和仓库数量
     * @returns {Promise<*>}
     */
    @action
    findNumByUser = async (param) =>{
        const data = await Axios.post('gitPukUser/findNumByUser',param)
        return data
    }
}

const xcodeUserStore=new XcodeUserStore()
export default xcodeUserStore
