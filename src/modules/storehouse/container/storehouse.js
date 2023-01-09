import React,{useState} from 'react'
import {PlusOutlined} from '@ant-design/icons'
import {inject,observer} from "mobx-react";
import BreadcrumbContent from '../../common/breadcrumb/breadcrumb'
import Btn from '../../common/btn/btn'
import Tabs from '../../common/tabs/tabs'
import '../components/storehouse.css'


const Storehouse = props => {
    const {storehouseStore} = props

    const {storehouseType,setStorehouseType} = storehouseStore

    const lis = [
        {
            id:1,
            title:"所有仓库",
        },
        {
            id:2,
            title:"我的仓库",
        },
        {
            id:3,
            title:"我收藏的",
        }
    ]

    const clickType = item => {
        setStorehouseType(item.id)
    }

    return(
        <div className='storehouse'>
            <div className='storehouse-content code-home-limited code'>
                <div className='storehouse-top'>
                    <BreadcrumbContent firstItem={"仓库"}/>
                    <Btn
                        type={"primary"}
                        title={"新建仓库"}
                        icon={<PlusOutlined/>}
                    />
                </div>
                <div className='storehouse-type'>
                    <Tabs
                        type={storehouseType}
                        tabLis={lis}
                        onClick={clickType}
                    />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default inject('storehouseStore')(observer(Storehouse))
