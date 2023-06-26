/**
 * @name: Backups
 * @author: limingliang
 * @date: 2023-06-06 14:30
 * @description：备份
 * @update: 2023-06-06 14:30
 */

import React, {useState} from "react";
import {Button, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";
import './Backups.scss'
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import backupsStore from "../store/BackupsStore"
const Recover = (props) => {

    const {recoveryData,gainBackupsRes}=backupsStore

    const[fileName,setFileName]=useState(null)
    // 进度条内容
    const [press,setPress] = useState(null)
    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true)

    const fileUpload =  {
        accept:'.gz',
        name: 'uploadFile',
        data:{userId:getUser().userId},
        action: `${node_env==='test'?base_url:window.location.origin}/backups/uploadBackups`,
        headers:{
            ticket:getUser().ticket
        },

        onChange(info) {
            setFileName(null)
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                const size=file.originFileObj.size
                if (file.response) {

                    setFileName(file.name)
                }
                return file;
            });
        },
    }

//定时任务
    const timeTask = (type) => {
        let timer=setInterval(()=>{
            gainBackupsRes(type).then(res=>{
                if (res.code===0){
                    setPress(res.data)
                    if (res.data.includes("Recovery success end")){
                        clearInterval(timer)
                        message.success('恢复成功',0.5)
                    }
                    if (res.data.includes("Recovery fail end")){
                        clearInterval(timer)
                        message.error('恢复失败',0.5)
                    }

                }else {
                    clearInterval(timer)
                }
            })
        },2000)
    }

    //数据恢复
    const recovery =async () => {
        const res=await recoveryData(fileName)
        if (res.code===0&&res.data==="ok"){
            timeTask("recovery")
        }
    }

    //日志
    const renderPressLog = () => {
        const dataImport=document.getElementById("data-import")
        if(dataImport && isActiveSlide){
            dataImport.scrollTop = dataImport.scrollHeight
        }
        return press || '暂无日志'
    }
    return(
        <div className='backups'>
            <div className='xcode-home-limited xcode'>
                <div className='backups-up'>
                    <BreadcrumbContent firstItem={'Recover'}/>
                </div>
                <div className='backups-nave '>
                    <div className='backups-desc backups-data'>请注意：数据恢复，如果有数据，会将你现在的所有数据恢复到备份的版本</div>
                    <div className='backups-desc backups-data'>为防止误操作，导入需要恢复的压缩包,还需点击按钮才执行恢复操作,压缩包仅支持备份的tar.gz压缩文件</div>
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
                    <div className='log'>日志</div>
                    <div className='progress-content-log' id='data-import' onWheel={()=>setIsActiveSlide(false)}>
                        {renderPressLog()}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default  Recover
