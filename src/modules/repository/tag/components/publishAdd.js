import React,{useState,useEffect} from 'react';
import {Modal} from 'antd';
import {CloseOutlined} from '@ant-design/icons'
// import {DocumentEditor} from 'tiklab-slate-ui';
import {autoHeight} from '../../../common/client/client';
import Btn from '../../../common/btn/btn';

const PublishAdd = props =>{

    const {addPublishVisible,setAddPublishVisible} = props
    const [height,setHeight] = useState(0)

    const [documentValue,setDocumentValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
        {
            type: 'image',
            url: 'http://192.168.10.23:3010/images/matflow3.png',
            children: [{ text: '' }],
        },
    ])
    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const onOk = () =>{
        // console.log(documentValue)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setAddPublishVisible(false)}
                title={"取消"}
                isMar={true}
            />
            <Btn
                onClick={()=>onOk()}
                title={"确定"}
                type={"primary"}
            />
        </>
    )

    return (
        <Modal
            visible={addPublishVisible}
            onCancel={()=>setAddPublishVisible(false)}
            closable={false}
            footer={modalFooter}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            width={600}
            className="xcode publish-add-modal"
            destroyOnClose={true}
        >
            <div className='publish-add-up'>
                <div>新建发行版</div>
                <div style={{cursor:'pointer'}} onClick={()=>setAddPublishVisible(false)}>
                    <CloseOutlined />
                </div>
            </div>
            <div className='publish-add-content'>
                {/*<DocumentEditor*/}
                {/*    focusEditor={true}*/}
                {/*    value={documentValue}*/}
                {/*    onChange={setDocumentValue}*/}
                {/*    minHeight={200}*/}
                {/*    {...props}*/}
                {/*/>*/}
            </div>
        </Modal>
    )
}

export default PublishAdd
