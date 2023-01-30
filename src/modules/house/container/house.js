import React,{useState,useEffect} from 'react'
import {PlusOutlined,SearchOutlined} from '@ant-design/icons'
import {inject,observer} from 'mobx-react'
import {Input} from 'antd'
import BreadcrumbContent from '../../common/breadcrumb/breadcrumb'
import Btn from '../../common/btn/btn'
import Tabs from '../../common/tabs/tabs'
import HouseAdd from '../components/houseAdd'
import HouseTable from '../components/houseTable'
import '../components/house.scss'


const House = props => {

    const {houseStore,houseGroupStore} = props

    const {houseType,setHouseType,createCode,findUserCode,houseList} = houseStore
    const {findUserGroup,groupList} = houseGroupStore

    const [addHouseVisible,setAddHouseVisible] = useState(false)

    useEffect(()=>{
        // 初始化仓库
        findUserCode()
        // 仓库组
        findUserGroup()
    },[])

    const lis = [
        {
            id:1,
            title:'所有仓库',
        },
        {
            id:2,
            title:'我的仓库',
        },
        {
            id:3,
            title:'我收藏的',
        }
    ]

    const clickType = item => {
        setHouseType(item.id)
    }

    return(
        <div className='storehouse'>
            <div className='storehouse-content xcode-home-limited xcode'>
                <div className='storehouse-top'>
                    <BreadcrumbContent firstItem={'仓库'}/>
                    <Btn
                        type={'primary'}
                        title={'新建仓库'}
                        icon={<PlusOutlined/>}
                        onClick={()=>setAddHouseVisible(true)}
                    />
                    <HouseAdd
                        {...props}
                        createCode={createCode}
                        groupList={groupList}
                        addHouseVisible={addHouseVisible}
                        setAddHouseVisible={setAddHouseVisible}
                    />
                </div>
                <div className='storehouse-type'>
                    <Tabs
                        type={houseType}
                        tabLis={lis}
                        onClick={clickType}
                    />
                    <div className='storehouse-type-input'>
                        <Input
                            allowClear
                            placeholder='仓库名称'
                            // onChange={onChangeSearch}
                            prefix={<SearchOutlined />}
                            style={{ width: 200 }}
                        />
                    </div>
                </div>
                <HouseTable
                    {...props}
                    houseList={houseList}
                />
            </div>
        </div>
    )
}

export default inject('houseStore','houseGroupStore')(observer(House))
