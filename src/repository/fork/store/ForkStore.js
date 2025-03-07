import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios} from 'tiklab-core-ui';
import {Service} from "../../../common/utils/Requset";

export class ForkStore {


    // fork状态
    @observable
    forkState = false

    @observable
    spin=false


    @action
    setForkState = async value =>{
       this.forkState=value
    }

    /**
     * 执行fork仓库
     * @param value
     */
    @action
    execRepositoryFork = async value =>{
        const data = await Service("/repositoryFork/execRepositoryFork", value)
        return data
    }

    /**
     * 分页查询fork仓库
     * @param value
     */
    @action
    findRepositoryForkPage = async value =>{
        const data = await Service("/repositoryFork/findRepositoryForkPage", value)
        return data
    }


    /**
     * 查询fork结果
     * @param value
     */
    @action
    findForkResult = async value =>{
        const param=new FormData()
        param.append("repositoryId",value)
        const data = await Service("/repositoryFork/findForkResult", param)
        return data
    }


    /**
     * 查询可以fork仓库组
     * @param value
     */
    @action
    findCanForkGroup = async value =>{
        this.spin=true
        const data = await Service("/rpyGroup/findCanForkGroup", value)
        this.spin=false
        return data
    }
}
const forkStore=new ForkStore()
export default forkStore

