import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios} from 'thoughtware-core-ui';

export class FileStore {

    // 代码文件数据
    @observable
    codeTreeData = []

    // 文件内容
    @observable
    blobFile = ''

    // 克隆文件
    @observable
    cloneAddress = ''

    // 最近提交信息
    @observable
    latelyBranchCommit = ''

    /**
     * 获取文件
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findFileTree = async value =>{
        const data = await Axios.post('/rpy/findFileTree',value)
        if(data.code===0){
            this.codeTreeData = data.data
        } else {
            this.codeTreeData = []
        }
        data.code===50001 && message.info(data.msg,0.5)
        return data
    }

    /**
     * 获取文件内容
     * @param value
     * @returns {Promise<*>}
     */
    @action
    readFile = async value =>{
        const data = await Axios.post('/file/readFile',value)
        if(data.code===0){
            this.blobFile = data.data && data.data
        }
        else {
            this.blobFile = ''
        }
        return data
    }

    /**
     * 修改文件内容
     * @param value
     * @returns {Promise<*>}
     */
    @action
    writeFile = async value =>{
        const data = await Axios.post('/file/writeFile',value)
        if(data.code===0){
            message.info('修改成功',0.5)
        }
        return data
    }

    /**
     * 获取克隆地址
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findCloneAddress = async value =>{
        const param = new FormData()
        param.append('rpyId',value)
        const data = await Axios.post('/rpy/findCloneAddress',param)
        if(data.code===0){
            this.cloneAddress = data.data && data.data
        }
        else {
            this.cloneAddress = ''
        }
        return data
    }

    /**
     * 获取最近提交信息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findLatelyBranchCommit = async value =>{
        const data = await Axios.post('/commit/findLatelyBranchCommit',value)
        if(data.code===0){
            this.latelyBranchCommit = data.data && data.data
        }
        return data
    }



}
const fileStore=new FileStore()
export default fileStore

