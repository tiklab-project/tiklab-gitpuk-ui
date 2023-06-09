/**
 * @name: Backups
 * @author: limingliang
 * @date: 2023-06-06 14:30
 * @description：备份
 * @update: 2023-06-06 14:30
 */
import React, {useState,useEffect} from "react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {Button, message, Radio, Spin,Upload} from 'antd';
import './Backups.scss'
import {inject, observer} from "mobx-react";
import {UploadOutlined} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";
const Backups = (props) => {
    const {backupsStore} = props
    const {backupsExec,recoveryData,gainBackupsRes,findBackups,backupsData,updateBackups}=backupsStore

    const [value, setValue] = useState("false");
    const [loading,setLoading]=useState(false)

    const[fileName,setFileName]=useState(null)
    const [fileList, setFileList] = useState([]);

    useEffect(async ()=>{
        await findBackup()
    },[loading])


    //查询备份数据
    const findBackup = async () => {
        const res=await findBackups();
        if (res.code===0){
            setValue(res.data.taskState)
        }
    }

    const onChange = (e) => {
        setValue(e.target.value);
        updateB(null,e.target.value)
    }

    //执行备份
    const backups = () => {
        setLoading(true)
        backupsExec()
        timeTask("backups")
    }

    //数据恢复
    const recovery = () => {
        setLoading(true)
        recoveryData(fileName)
        timeTask("recovery")
    }


    //定时任务
    const timeTask = (type) => {
        let timer=setInterval(()=>{
            gainBackupsRes(type).then(res=>{
                if (res.code===0){
                    switch (res.data){
                        case "ok":
                            clearInterval(timer)
                            setLoading(false)
                            message.info(type="backups"?'备份成功':'数据恢复成功',0.5)
                            break
                        case "error":
                            clearInterval(timer)
                            setLoading(false)
                            message.error(type="backups"?'备份失败':'数据恢复失败',0.5)
                            break
                    }
                }else {
                    clearInterval(timer)
                }
            })
        },2000)
    }

    const edit = () => {
        // 获取 div 元素
        const div = document.getElementById("myDiv");

        const input = document.createElement("input");
        input.type = "text";
        input.value = div.innerHTML;
        div.parentNode.replaceChild(input, div);
        input.focus();

        // 当 input 元素失去焦点时，将其替换为 div 元素
        input.onblur = function() {
            div.innerHTML = input.value;
            input.parentNode.replaceChild(div, input);
            updateB(input.value)
        }

    }

    //修改备份数据
    const updateB = (backupsAddress,taskState) => {
      const param={
          backupsAddress:backupsAddress,
          taskState:taskState
      }
        updateBackups(param)
    }

    const fileUpload =  {
        name: 'uploadFile',
        data:{userId:getUser().userId},
        action: 'http://192.168.10.14:8090/backups/uploadBackups',
        headers:{
            ticket:getUser().ticket
        },

        onChange(info) {
            setFileList([])
            setFileName(null)
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                const size=file.originFileObj.size
                if (file.response) {

                    setFileName(file.name)
                    debugger
                }
                return file;
            });
            setFileList(fileList)
        },
    }

    return(
        <div className='backups'>
            <Spin spinning={loading}>
                <div className='xcode-home-limited xcode'>
                    <div className='backups-up'>
                        <BreadcrumbContent firstItem={'Backups'}/>
                    </div>
                    <div className='backups-nave'>
                        <div className='backups-title'>备份服务</div>
                        <div className='backups-data'>
                            <div className='backups-nav-title'>备份路径：</div>
                            <div id='myDiv' >{backupsData?.backupsAddress}</div>
                            <div className='backups-exec' onClick={edit}>修改</div>
                        </div>
                        <div className=''>
                            <div className='backups-data'>
                                <div className='backups-nav-title'>定时备份：</div>
                                <Radio.Group onChange={onChange}  value={value}>
                                    <Radio value={"true"}>开启</Radio>
                                    <Radio value={"false"}>关闭</Radio>
                                </Radio.Group>
                                <div className='backups-desc backups-desc-left'>(开启定时任务后每天晚上14:00定时备份)</div>
                            </div>

                        </div>
                        <div className='backups-data'>
                            <div className='backups-nav-title'>最近备份记录：</div>
                            <div>{backupsData?.newBackupsTime}</div>
                        </div>
                        <Button type="primary" className='backups-button' onClick={backups}>手动备份</Button>
                    </div>


                    <div className='backups-nave backups-nave-top'>
                        <div className='backups-title'>数据恢复</div>
                        <div className='backups-desc backups-nave-top'>请注意：数据恢复，如果有数据，会将你现在的所有数据恢复到备份的版本</div>
                        <div className='backups-desc backups-data'>为防止误操作，导入需要恢复的压缩包,还需点击按钮才执行恢复操作</div>
                        <div className='backups-nave-top'>
                            {
                                fileName
                                    ?<Upload {...fileUpload} >
                                    </Upload>
                                    :  <Upload {...fileUpload} >
                                        <Button icon={<UploadOutlined />}>提交备份压缩文件</Button>
                                    </Upload>
                            }
                        </div>
                        <div className='backups-nave-top'>
                            <Button type="primary" className='backups-button' onClick={recovery}>恢复</Button>
                        </div>
                    </div>
                </div>
            </Spin>

        </div>
    )
}
export default  inject('backupsStore')(observer(Backups))
