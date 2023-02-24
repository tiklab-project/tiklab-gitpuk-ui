import React from 'react'
import {Spin} from 'antd'
import './loading.scss'

const Loading = props =>{
    return (
        <div className='xcode-container'>
            <div className='xcode-shape'/>
            <div className='xcode-shape'/>
            <div className='xcode-shape'/>
        </div>
    )
}

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
