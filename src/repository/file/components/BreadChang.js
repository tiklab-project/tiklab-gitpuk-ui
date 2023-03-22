import React, {Fragment, useEffect} from 'react';
import BranchSelect from './BranchSelect';
import './BreadChang.scss';

/**
 * 文件目录
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const BreadChang = props => {

    const {repositoryInfo,type,branch,webUrl,fileAddress} = props

    /**
     * 目录跳转
     * @param name
     * @param index
     */
    const breadJump = (name,index) =>{
        let path = `/index/repository/${webUrl}/tree/${branch}`
        for (let i = 1;i <= index;i++){
            path = path + '/' + name[i]
        }
        name.length!==index+1 && props.history.push(path)
    }

    /**
     * 渲染文件目录
     * @param name：路由截取部分，继承fileAddress
     * @returns {*}
     */
    const renderCodeBread = name => {
        // 截取路由字符串，分割成数组
        const bread = name[1] && name[1].split('/')
        return bread && bread.map((item,index)=>{
            return  index>0 &&
                <Fragment key={index}>
                    <div className='bread-item' onClick={()=>breadJump(bread,index)}>{item}</div>
                    {
                        type==='blob' && index+1!==bread.length &&
                        <div className='bread-item'> / </div>
                    }
                    {
                        type==='tree' && <div className='bread-item'> / </div>
                    }
                </Fragment>
        })
    }

    return (
        <div className='code-head-left'>
            <BranchSelect
                {...props}
                repositoryInfo={repositoryInfo}
                webUrl={webUrl}
                type={'code'}
            />
            <div className='code-bread'>
                <div className='bread-item'
                     onClick={()=>branch && props.history.push(`/index/repository/${webUrl}/tree/${branch}`)}
                >{repositoryInfo.name}</div>
                <div className='bread-item'> / </div>
                { renderCodeBread(fileAddress) }
            </div>
        </div>
    )
}

export default BreadChang
