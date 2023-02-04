import React,{useState,useEffect} from 'react'
import {Select} from 'antd'
import {inject,observer} from 'mobx-react'

const BranchChang = props => {

    const {branchStore,houseInfo,webUrl,type,match} = props

    const {findAllBranch,branchList} = branchStore

    const branch = match.params.branch?match.params.branch:houseInfo && houseInfo.defaultBranch

    useEffect(()=>{
        houseInfo.name && findAllBranch(houseInfo.codeId)
    },[houseInfo.name])

    const changBranch = value => {
        switch (type) {
            case 'commit':
                props.history.push(`/index/house/${webUrl}/commits/${value}`)
                break
            case 'code':
                props.history.push(`/index/house/${webUrl}/tree/${value}`)
        }
    }

    return (
        <Select
            showSearch
            defaultValue={branch}
            onChange={value=>changBranch(value)}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            dropdownRender={(menu) => (
                <>
                    {menu}
                </>
            )}
        >
            {
                branchList && branchList.map(item=>{
                    return <Select.Option value={item.branchName} key={item.branchName}>{item.branchName}</Select.Option>
                })
            }
        </Select>
    )
}

export default inject('branchStore')(observer(BranchChang))
