import React, {Fragment, useEffect} from 'react'
import BranchChang from '../../branch/components/branchChang'
import './breadChang.scss'

const BreadChang = props => {

    const {houseInfo,type,location} = props

    const branch = location.pathname.split('/'+houseInfo.name+'/'+type+'/')

    const breadJump = (name,index) =>{
        let path = `/index/house/${houseInfo.name}/tree`
        for (let i = 0;i <= index;i++){
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
                    <div className='bread-item'> / </div>
                </Fragment>
        })
    }

    return (
        <div className='code-head-left'>
            <div className='code-branch'>
                <BranchChang
                    {...props}
                    houseInfo={houseInfo}
                    type={'code'}
                />
            </div>
            <div className='code-bread'>
                <div className='bread-item'
                     onClick={()=>props.history.push(`/index/house/${houseInfo.name}/tree`)}
                >{houseInfo.name}</div>
                <div className='bread-item'> / </div>
                { renderCodeBread(branch) }

            </div>
        </div>
    )
}

export default BreadChang
