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

    useEffect(async () => {
        if (reqDetails){
            const fileName=reqDetails.fileName.substring(reqDetails.fileName.lastIndexOf("/")+1);
            setFileName(fileName)
        }
    }, [reqDetails]);
    //取消弹窗
    const cancelDrawer = () => {
        setVisible(false)

    }


    return(
        <Drawer
            title={fileName}
            placement='right'
            closable={false}
            width={"60%"}
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
                <MonacoBlob readOnly={true} blobFile={blobFile}/>
            }
        </Drawer>
    )
}

export  default ScanReqDrawer
