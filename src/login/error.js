import React from 'react';
import {Result} from 'antd';

/**
 * 404
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ErrorFound = props =>{

    const subTitle = (
        <>
           没有访问权限或未知错误，
            <span style={{color:'var(--thoughtware-blue)',cursor:'pointer'}}
                  onClick={()=>props.history.push('/home')}>点击这里</span>
            返回首页
        </>
    )

    return(
        <Result
            status='error'
            title='error'
            subTitle={subTitle}
        />
    )
}

export default ErrorFound
