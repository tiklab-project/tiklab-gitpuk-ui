import React, {Fragment, useEffect} from 'react';
import BranchSelect from './branchSelect';
import './breadChang.scss';

const BreadChang = props => {

    const {repositoryInfo,type,branch,webUrl,fileAddress} = props

    const breadJump = (name,index) =>{
        let path = `/index/repository/${webUrl}/tree/${branch}`
        for (let i = 1;i <= index;i++){
            path = path + '/' + name[i]
        }
        name.length!==index+1 && props.history.push(path)
    }

    const renderCodeBread = name => {
        const zz = name[1] && name[1].split('/')
        return zz && zz.map((item,index)=>{
            return  index>0 &&
                <Fragment key={index}>
                    <div className='bread-item' onClick={()=>breadJump(zz,index)}>{item}</div>
                    {
                        type==='blob' && index+1!==zz.length &&
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
