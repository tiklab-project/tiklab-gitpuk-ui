import React,{useState,useEffect} from 'react'
import {Select} from 'antd'
import {inject,observer} from 'mobx-react'

const BranchChang = props => {

    const {branchStore,houseInfo,type} = props

    const {findAllBranch,branchList} = branchStore

    useEffect(()=>{
        houseInfo.name && findAllBranch(houseInfo.codeId)
    },[houseInfo.name])

    const changBranch = value => {
        switch (type) {
            case 'commit':
                props.history.push(`/index/house/${houseInfo.name}/commits/${value}`)
                break
            case 'code':
                props.history.push(`/index/house/${houseInfo.name}/tree/${value}`)
        }
    }

    return (
        <Select defaultValue={'master'} onChange={value=>changBranch(value)}>
            {
                branchList && branchList.map(item=>{
                    return <Select.Option value={item.branchName} key={item.branchName}>{item.branchName}</Select.Option>
                })
            }
        </Select>
    )
}

export default inject('branchStore')(observer(BranchChang))
