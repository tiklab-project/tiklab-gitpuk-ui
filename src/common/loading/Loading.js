import React from 'react';
import {Spin} from 'antd';
import './Loading.scss';

/**
 * 全屏加载
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Loading = props =>{
    return (
        <div className='xcode-container'>
            <div className='xcode-shape'/>
            <div className='xcode-shape'/>
            <div className='xcode-shape'/>
        </div>
    )
}

/**
 * 局部加载
 * @param size：大小
 * @param type：类型
 * @returns {JSX.Element}
 * @constructor
 */
const SpinLoading = ({size,type}) => {

    if(type==='list'){
        return  <div style={{textAlign:"center"}} >
                    <Spin size={size?size:'default '}/>
                </div>
    }

    if(type==='table'){
        return   <div style={{textAlign:"center",paddingTop:30}}>
                    <Spin size={size?size:'default '}/>
                </div>
    }

    return  <div style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Spin size={size?size:'default '}/>
            </div>

}

export {Loading,SpinLoading}
