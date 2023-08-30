import React from 'react';
import notData from "../../assets/images/img/not-data.png";
import {Empty} from "antd";

/**
 * 无数据渲染
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const EmptyText = props =>{

    const {title,type} = props

    return  <div style={{textAlign:'center',marginTop:30}}>
                <img src={notData} alt="maven" style={{width:50,height:50}}/>
                {/*<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />*/}
                {
                    !type&&
                    <div style={{fontSize:13,color:'#999',paddingTop:10}}>{title ? title : '没有查询到数据'}</div>
                }

            </div>
}

export default EmptyText
