import {observable,action} from 'mobx';
import {getUser,Axios} from 'tiklab-core-ui';
import {message} from 'antd';

export class BackupsStore {

    @observable
    backupsData=''

    @observable
    backupsRes=''
    /**
     * 修改备份数据
     * @param values
     * @returns {Promise<*>}
     */
    @action
    updateBackups = async(value)  =>{
        const data = await Axios.post('/backups/updateBackups',value)
        if(data.code===0){
            message.info('修改成功',0.5)
            this.fresh = !this.fresh
        }
    }

    /**
     * 执行备份
     * @param values
     * @returns {Promise<*>}
     */
    @action
    backupsExec = async()  =>{
        const data = await Axios.post('/backups/backupsExec')

        return data
    }

    /**
     * 查询备份数据
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findBackups = async()  =>{
        const data = await Axios.post('/backups/findBackups')
        if (data.code===0){
            this.backupsData=data.data
        }
        return data
    }

    /**
     * 查询备份结果
     * @param values
     * @returns {Promise<*>}
     */
    @action
    gainBackupsRes = async(value)  =>{
        const param=new FormData()
        param.append('type',value)
        const data = await Axios.post('/backups/gainBackupsRes',param)
        if (data.code===0){
            this.backupsRes=data.data
        }
        return data
    }


    /**
     * 数据恢复
     * @param values
     * @returns {Promise<*>}
     */
    @action
    recoveryData = async(value)  =>{
        const param=new FormData()
        param.append("userId",getUser().userId)
        param.append("fileName",value)
        const data = await Axios.post('/backups/recoveryData',param)

        return data
    }
}
export const BACKUPS_STORE='backupsStore'
