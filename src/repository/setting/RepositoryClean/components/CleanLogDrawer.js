/**
 * @name: CleanLogDrawer
 * @date: 2023-12-21 14:30
 * @description：仓库清理日志
 * @update: 2023-12-21 14:30
 */
import React, {useState, useEffect, useRef} from 'react';
import {Drawer, Space, Tooltip} from 'antd'
import "./CleanLogDrawer.scss"
import {CloseOutlined} from "@ant-design/icons";
import BreadcrumbContent from "../../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../../common/btn/Btn";
const CleanLogDrawer = (props) => {
    const {visible,setVisible,resultData}=props
    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true);

     const runStatusText = type =>{
        switch (type) {
            case "error":return  "运行失败"
            case "success":return  "运行成功"
            case "halt":return  "运行终止"
            case "run":return  "运行中"
            case "wait":return "等待中"
        }
    }
    //日志
    const renderPressLog = () => {
        const dataImport=document.getElementById("data-import")
        if(dataImport && isActiveSlide){
            dataImport.scrollTop = dataImport.scrollHeight
        }
        return    resultData&&resultData.log || '暂无日志'
    }

    return(
        <Drawer
            width={"60%"}
            visible={visible}
            placement="right"
            closable={false}
            destroyOnClose={true}
            onClose={()=>setVisible(false)}
            contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0,overflow:"hidden"}}
        >
            <div className='clean-log'>
                <div className='clean-log-bread'>
                    <BreadcrumbContent  firstItem={ "thoughtware-gittork"+" # " + "e1ff5e7e"}>
                        <Btn
                            title={<CloseOutlined style={{fontSize:16}}/>}
                            type="text"
                            onClick={ ()=> setVisible(false)}
                        />
                    </BreadcrumbContent>
                    <div className="bread-center">
                        <div className="bread-center-item">
                            <span className='bread-center-name'>开始时间</span>
                            <span className='bread-center-desc'>{resultData?.startTime }</span>
                        </div>
                        <div className="bread-center-item">
                            <span className='bread-center-name'>运行状态</span>
                            <span className={`bread-center-desc bread-center-${resultData?.state}`}>{runStatusText(resultData?.state)}</span>
                        </div>
                        <div className="bread-center-item">
                            <span className='bread-center-name'>运行时长</span>
                            <span className='bread-center-desc'>{resultData?.timeLong}</span>
                        </div>
                    </div>
                </div>
                <div className="clean-log-bottom">
                    <div className='clean-detail-log'
                         id='data-import'
                         onWheel={()=>setIsActiveSlide(false)}>
                        { renderPressLog() }
                    </div>

                </div>
            </div>
        </Drawer>
    )
}
export default CleanLogDrawer
