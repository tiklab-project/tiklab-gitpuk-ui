import notData from "../../assets/images/img/not-data.png";
import React from 'react';

/**
 * 合并请求无数据渲染
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MergeEmpty = (props) => {
    const {text}=props
    return  <div style={{textAlign:'center',marginTop:30}}>
        <img src={notData}  style={{width:80,height:80}}/>
        <div style={{fontSize:15,color:'#999',paddingTop:20}}>{text}</div>
        {/*<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />*/}

    </div>
}
export default MergeEmpty
