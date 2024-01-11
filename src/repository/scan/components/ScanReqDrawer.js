/**
 * @name: ScanReqDrawer
 * @author: limingliang
 * @date: 2023-11-07 14:30
 * @description：扫描问题右侧抽屉弹窗
 * @update: 2023-11-07 14:30
 */
import React,{useState,useEffect} from 'react';
import {Drawer, Space, Tooltip} from 'antd'
import {CloseOutlined} from "@ant-design/icons";
import "./ScanReqDrawer.scss"
import {MonacoBlob} from "../../../common/editor/Monaco";
const ScanReqDrawer = (props) => {
    const {visible,setVisible,issuesDetails,reqDetails,scanWay,blobFile}=props
    const [fileName,setFileName]=useState('')

    const [dataList,setDataList]=useState([])

    useEffect(async () => {
        if (reqDetails){
            const fileName=reqDetails.fileName.substring(reqDetails.fileName.lastIndexOf("/")+1);
            setFileName(fileName)
        }
        if (blobFile){
            const lines = blobFile.fileMessage.split("\n")
            setDataList(lines)
        }
    }, [reqDetails,blobFile]);
    //取消弹窗
    const cancelDrawer = () => {
        setVisible(false)
    }

    debugger

    return(
        <Drawer
            title={fileName}
            placement='right'
            closable={false}
            width={"60%"}
            contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            className='library-drawer'
            onClose={cancelDrawer}
            visible={visible}
            extra={
                <CloseOutlined style={{cursor:'pointer'}} onClick={cancelDrawer} />
            }
        >
            {scanWay==='sonar'?
                <div className='reqDrawer'>
                    {
                        issuesDetails&&issuesDetails.map(item=>{
                            return(
                                <div key={item.line} className='nav-tabs'>
                                    <div className="nav-tabs-text">{item.line}</div>
                                    {
                                        reqDetails&&reqDetails.issuesLine===item.line?
                                            <div>
                                                <div className='source-line-code-issue'>
                                                    <div dangerouslySetInnerHTML={{__html: item.code}}/>
                                                </div>
                                                <div className='issues_border'>
                                                    {reqDetails.issuesMessage}
                                                </div>
                                            </div>
                                            :
                                            <div dangerouslySetInnerHTML={{__html: item.code}}/>
                                    }
                                </div>
                            )
                        })
                    }
                </div>:
                <div className='reqDrawer'>
                    {
                        dataList&&dataList.map((item,key)=>{
                            return(
                                <div key={key} className='nav-tabs'>
                                    <div className="nav-tabs-text">{key}</div>
                                    {
                                        reqDetails&&reqDetails.problemLine ===key?
                                            <div style={{ whiteSpace: "pre-wrap" }}>
                                                <code className='error_nav'>{item}</code>
                                                <div className='issues_border'>
                                                    {reqDetails.repairDesc}
                                                </div>
                                            </div>
                                            :
                                            <pre style={{ whiteSpace: "pre-wrap" }}>
                                                <code>{item}</code>
                                            </pre>
                                         /*   <div dangerouslySetInnerHTML={{__html: item}}/>*/
                                    }
                                </div>
                            )
                        })
                    }
                </div>
              /*  <MonacoBlob readOnly={true} blobFile={blobFile}/>*/
            }
        </Drawer>
    )
}

export  default ScanReqDrawer
