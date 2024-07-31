import {observable,action} from 'mobx';
import {message} from 'antd';
import {Axios, getUser} from 'thoughtware-core-ui';

export class SystemCountStore {

    //数量
    @observable
    systemCount=''

    /**
     * 系统设置汇总
     * @param value
     * @returns {Promise<void>}
     */
    @action
    collectCount = async () =>{
        const data = await Axios.post('/systemCount/collectCount')
        if (data.code===0){
            this.systemCount=data.data
        }
    }
}

const systemCountStore=new SystemCountStore()
export default  systemCountStore
