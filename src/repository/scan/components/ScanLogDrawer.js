/**
 * @name: ScanLogDrawer
 * @author: limingliang
 * @date: 2023-12-15 14:30
 * @description：扫描日志的抽屉
 * @update: 2023-12-15 14:30
 */
import React, {useState, useEffect, useRef} from 'react';
import {Drawer, Space, Tooltip} from 'antd'
import "./ScanLogDrawer.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {CloseOutlined} from "@ant-design/icons";
import Btn from "../../../common/btn/Btn";
import {runStatusText} from "./ScanLogCommon";
const ScanLogDrawer = (props) => {
    const {visible,setVisible,scanRecord}=props
    const scrollRef = useRef();

    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true);


    const goBack = () => {
        setVisible(false)
    }

    /**
     * 鼠标滚轮滑动事件
     */
    const onWheel = () => {
        if(!isActiveSlide) return
        setIsActiveSlide(false)
    }


    //日志
    const renderPressLog = () => {
        const dataImport=document.getElementById("data-import")
        if(dataImport && isActiveSlide){
            dataImport.scrollTop = dataImport.scrollHeight
        }
        return    scanRecord&&scanRecord.execLog || '暂无日志'
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
          <div className='scan-log'>
              <div className='scan-log-bread'>
                  <BreadcrumbContent  firstItem={ "thoughtware-gittork"+" # " + "e1ff5e7e"}>
                      <Btn
                          title={<CloseOutlined style={{fontSize:16}}/>}
                          type="text"
                          onClick={goBack}
                      />
                  </BreadcrumbContent>
                  <div className="bread-center">
                      <div className="bread-center-item">
                          <span className='bread-center-name'>开始时间</span>
                          <span className='bread-center-desc'>{scanRecord?.createTime }</span>
                      </div>
                      <div className="bread-center-item">
                          <span className='bread-center-name'>运行方式</span>
                          {
                              scanRecord?.scanUser?.nickname?
                                  <span className='bread-center-desc'>{scanRecord?.scanWay==="hand" ? scanRecord?.scanUser?.nickname + " · 手动触发" : "定时触发" }</span>
                                :
                                  <span className='bread-center-desc'>{scanRecord?.scanWay==="hand" ? " 手动触发" : "定时触发" }</span>

                          }
                      </div>
                      <div className="bread-center-item">
                          <span className='bread-center-name'>运行状态</span>
                          <span className={`bread-center-desc bread-center-${scanRecord?.scanResult}`}>{runStatusText(scanRecord?.scanResult)}</span>
                      </div>
                      <div className="bread-center-item">
                          <span className='bread-center-name'>运行时长</span>
                          <span className='bread-center-desc'>{scanRecord?.scanTime}</span>
                      </div>
                  </div>
              </div>
              <div className="scan-log-bottom">
                  <div className='scan-detail-log'
                       id='data-import'
                       onWheel={()=>setIsActiveSlide(false)}>
                      { renderPressLog() }
                  </div>

              </div>
          </div>
        </Drawer>
    )
}
export default ScanLogDrawer
