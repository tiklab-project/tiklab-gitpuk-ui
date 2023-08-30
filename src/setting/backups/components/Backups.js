/**
 * @name: Backups
 * @author: limingliang
 * @date: 2023-06-06 14:30
 * @description：备份
 * @update: 2023-06-06 14:30
 */
import React, {useState,useEffect} from "react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {Button, message, Radio} from 'antd';
import './Backups.scss'
import backupsStore from "../store/BackupsStore"
import {observer} from "mobx-react";
const Backups = (props) => {
    const {backupsExec,gainBackupsRes,findBackups,backupsData,updateBackups}=backupsStore

    const [value, setValue] = useState("false");

    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true)

    // 进度条内容
    const [press,setPress] = useState(null)

    const [input,setInput]=useState(false)
    const [error,setError]=useState("")

    useEffect(async ()=>{

        await timeTask("backups")
        await findBackup()

        setPress(null)
    },[])

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
    const backups =async () => {
        const res=await backupsExec()
        if (res.code===0&&res.data==="OK"){
            timeTask("backups")
        }
    }


    //定时任务
    const timeTask =async (type) => {
        let timer=setInterval(()=>{
            gainBackupsRes(type).then(res=>{
                if (res.code===0){
                    setPress(res.data)
                    if (!res.data){
                        clearInterval(timer)
                        return
                    }
                    if (res.data.includes("Backups file success end")){
                        clearInterval(timer)
                        findBackup()
                    }
                    if (res.data.includes("Backups file fail end")){
                        clearInterval(timer)
                        findBackup()
                    }
                }else {
                    clearInterval(timer)
                }
            })
        },2000)
    }

    const edit = () => {
        setInput(true)

        // 获取 div 元素
        const div = document.getElementById("myDiv");

        //const input = document.createElement("newDiv");
        const input = document.createElement("input");
        input.type = "text";
        input.value = div.innerHTML;
        input.setAttribute("style", "border-style:solid;border-color: #e9e9e9;")

        div.parentNode.replaceChild(input, div);
        input.focus();

        // 当 input 元素失去焦点时，将其替换为 div 元素
        input.onblur = function() {
            setInput(false)
            input.parentNode.replaceChild(div, input);
            if (!input.value){
                return message.error("备份路径不能为空")
            }
            div.innerHTML = input.value;
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
                    <BreadcrumbContent firstItem={'Backups'}/>
                </div>
                <div className='backups-nave'>
                    <div className='backups-data'>
                        <div className='backups-nav-title'>备份路径：</div>
                        <div  >{backupsData?.backupsAddress}</div>
                       {/* <div className='backups-exec' onClick={edit}>修改</div>*/}
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
                    <div className='backups-data'>
                        <div className='backups-nav-title'>最近备份结果：</div>
                        <div>{backupsData?.newResult==='success'&&<div style={{color:" #55a532"}}>{'成功'}</div>
                            ||backupsData?.newResult==='non'&&<div style={{color:" #999999"}}>{'未执行'}</div>
                            ||backupsData?.newResult==='fail'&&<div style={{color:" #ff5500"}}>{'失败'}</div>
                        }</div>
                    </div>
                    <Button type="primary" className='backups-button' onClick={backups}>手动备份</Button>
                </div>
                <div className='log'>日志</div>
                <div className='progress-content-log' id='data-import' onWheel={()=>setIsActiveSlide(false)}>
                    {renderPressLog()}
                </div>
            </div>
        </div>
    )
}
export default  observer(Backups)
