import React from 'react';
import {message, Result} from 'antd';
import {inject, observer} from "mobx-react";

/**
 * 404
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const NotFound = props =>{
    const {match,repositoryStore}=props
    const {deleteRpyByAddress}=repositoryStore
    const webUrl = `${match.params.namespace}/${match.params.name}`

    const subTitle = (
        <>
           没有查询到该仓库，是否删除
            <span style={{color:'var(--tiklab-blue)',cursor:'pointer'}}
                  onClick={()=>deleteRepository()}>点击这里</span>
            删除
        </>
    )


      const deleteRepository = async () => {
        const res=await deleteRpyByAddress(webUrl)
          if (res.code===0){
              message.info('删除成功')
              props.history.push('/index/repository')
          }else {
              message.info(res.msg)
          }
      }

    return(
        <Result
            status='404'
            title='404'
            subTitle={subTitle}
        />
    )
}
export default inject('repositoryStore')(observer(NotFound))
