/**
 * 文件搜索下拉
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useEffect,useState} from 'react';
import {Tooltip, Dropdown, Col, Input} from 'antd';
import "./FileSearchDrop.scss"
import {SearchOutlined} from "@ant-design/icons";
const FileSearchDrop = (props) => {
    const {searFileList,setDropDownVisible} = props


    useEffect(()=>{

    },[])


    return (
        <div className='file-search-drop'>
            <div className='file-search-drop-content'>
                {
                    searFileList&&searFileList.map((item,index)=>{
                        return(
                            <div key={index} className={`drop-content-nav`}>
                                <Tooltip placement="top" title={item}>
                                    {item}
                                </Tooltip>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}
export default FileSearchDrop
