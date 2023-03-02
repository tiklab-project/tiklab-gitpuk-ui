import {observable,action} from 'mobx';
import {
    FindFileTree,
    ReadFile,
    WriteFile,
    FindCloneAddress,
    FindLatelyBranchCommit
} from '../api/File';

import {message} from 'antd';

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
        const data = await FindFileTree(value)
        if(data.code===0){
            this.codeTreeData = data.data && data.data
        }
        else {
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
        const data = await ReadFile(value)
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
        const data = await WriteFile(value)
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
        const data = await FindCloneAddress(param)
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
        const data = await FindLatelyBranchCommit(value)
        if(data.code===0){
            this.latelyBranchCommit = data.data && data.data
        }
        return data
    }



}

export const FILE_STORE='fileStore'

