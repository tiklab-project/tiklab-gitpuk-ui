import React, {Fragment, useEffect} from 'react'
import BranchSelect from './branchSelect'
import './breadChang.scss'

const BreadChang = props => {

    const {houseInfo,type,branch,webUrl,fileAddress} = props

    const breadJump = (name,index) =>{
        let path = `/index/house/${webUrl}/tree/${branch}`
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
                houseInfo={houseInfo}
                webUrl={webUrl}
                type={'code'}
            />
            <div className='code-bread'>
                <div className='bread-item'
                     onClick={()=>props.history.push(`/index/house/${webUrl}/tree/${branch}`)}
                >{houseInfo.name}</div>
                <div className='bread-item'> / </div>
                { renderCodeBread(fileAddress) }
            </div>
        </div>
    )
}

export default BreadChang
