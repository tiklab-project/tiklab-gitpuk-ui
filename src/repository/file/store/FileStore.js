import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios} from 'tiklab-core-ui';
import {Service} from "../../../common/utils/Requset";

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
        const data = await Axios.post('/repositoryFile/findFileTree',value)
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
    readBareRepoFile = async value =>{
        const data = await Axios.post('/repositoryFile/readBareRepoFile',value)
        if(data.code===0){
            this.blobFile = data.data && data.data
        } else {
            this.blobFile = ''
            message.error(data.msg)
        }
        return data
    }

    /**
     * 下载文件
     * @param value
     * @returns {Promise<*>}
     */
    @action
    downloadLfsFile = async value =>{
        const data = await Axios.post('/repositoryFile/downLoadLfsFile',value)
        if(data.code===0) {

            const base64String = data.data;
            // 解码 base64 数据为二进制
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: 'application/octet-stream' });
            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = value.fileName;
            downloadLink.style.display = 'none';

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
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

    //根据code 查询切换code的类型
    @action
    findRefCodeType = async (repoId,code) =>{
        const param = new FormData()
        param.append('repoId',repoId)
        param.append('refCode',code)
        const data = await Axios.post('/rpy/findRefCodeType',param)

        return data
    }

    /**
     * 获取最近提交信息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findLatelyBranchCommit = async value =>{
        const data = await Axios.post('/commit/findBareLatelyCommit',value)
        if(data.code===0){
            this.latelyBranchCommit = data.data && data.data
        }
        return data
    }

    /**
     * 查询裸仓库所有的文件
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findBareAllFile = async value =>{
        const data = await Axios.post('/repositoryFile/findBareAllFile',value)
        return data
    }
    /**
     * 创建裸仓库文件
     * @param value
     */
    @action
    createBareFolder = async value =>{
        const data = await Axios.post('/repositoryFile/createBareFolder',value)
        if(data.code!==0){
            message.error(data.msg)
        }
        return data
    }

    /**
     * 删除裸仓库文件
     * @param value
     */
    @action
    deleteBareFile = async value =>{
        const data = await Service("/repositoryFile/deleteBareFile", value)
        if (data.code===0){
            message.success("删除成功")
        }
        return data
    }

    /**
     * 修改裸仓库文件
     * @param value
     */
    @action
    updateBareFile = async value =>{
        const data = await Service("/repositoryFile/updateBareFile", value)
        if (data.code===0){
            message.success("修改成功")
        }
        return data
    }


}
const fileStore=new FileStore()
export default fileStore

