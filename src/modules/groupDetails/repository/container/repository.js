import React,{useState,useEffect} from 'react';
import {LockOutlined,PlusOutlined} from '@ant-design/icons'
import {inject,observer} from 'mobx-react'
import Btn from '../../../common/btn/btn'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import RepositoryTable from '../../../repository/components/repositoryTable'
import RepositoryAdd from '../../../repository/components/repositoryAdd'
import Listname from '../../../common/list/listname'
import '../components/repository.scss'


const Repository = props =>{

    const [addHouseVisible,setAddHouseVisible] = useState(false)

    return (
        <div className='group-house'>
            <div className='group-house-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'Storehouse'} />
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
                        <RepositoryAdd
                            addHouseVisible={addHouseVisible}
                            setAddHouseVisible={setAddHouseVisible}
                        />
                    </div>
                </div>
                <RepositoryTable
                    {...props}
                />
            </div>
        </div>
    )
}

export default inject('houseGroupStore')(observer(Repository))
