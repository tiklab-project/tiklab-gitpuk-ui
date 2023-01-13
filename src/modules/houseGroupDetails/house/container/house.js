import React,{useState,useEffect} from 'react';
import {LockOutlined,PlusOutlined} from '@ant-design/icons'
import Btn from '../../../common/btn/btn'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import HouseTable from '../../../house/components/houseTable'
import HouseAdd from '../../../house/components/houseAdd'
import Listname from '../../../common/list/listname'
import '../components/house.scss'


const House = props =>{

    const [addHouseVisible,setAddHouseVisible] = useState(false)

    return (
        <div className='group-house'>
            <div className='group-house-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'仓库'} />
                <div className='group-house-head'>
                    <div className='head-left'>
                        <div className='head-left-icon'>
                            <Listname text={'X'}/>
                        </div>
                        <div className='head-left-desc'>
                            <span className='desc-name'>tiklab-boss</span>
                            <span className='desc-lock'><LockOutlined/></span>
                            <span className='desc-type'>管理员</span>
                        </div>
                    </div>
                    <div className='head-right'>
                        <Btn
                            type={'primary'}
                            title={'新建仓库'}
                            icon={<PlusOutlined/>}
                            onClick={()=>setAddHouseVisible(true)}
                        />
                        <HouseAdd
                            addHouseVisible={addHouseVisible}
                            setAddHouseVisible={setAddHouseVisible}
                        />
                    </div>
                </div>
                <HouseTable
                    {...props}
                />
            </div>
        </div>
    )
}

export default House
