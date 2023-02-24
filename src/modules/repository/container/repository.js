import React,{useState,useEffect} from 'react'
import {PlusOutlined,SearchOutlined} from '@ant-design/icons'
import {inject,observer} from 'mobx-react'
import {Input} from 'antd'
import BreadcrumbContent from '../../common/breadcrumb/breadcrumb'
import Btn from '../../common/btn/btn'
import Tabs from '../../common/tabs/tabs'
import RepositoryAdd from '../components/repositoryAdd'
import RepositoryTable from '../components/repositoryTable'
import '../components/repository.scss'


const Repository = props => {

    const {repositoryStore,groupStore} = props

    const {houseType,setHouseType,createCode,isLoading,findUserCode,houseList} = repositoryStore
    const {findUserGroup,groupList} = groupStore

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

    if(addHouseVisible){
        return  <RepositoryAdd
                    {...props}
                    createCode={createCode}
                    groupList={groupList}
                    houseList={houseList}
                    isLoading={isLoading}
                    addHouseVisible={addHouseVisible}
                    setAddHouseVisible={setAddHouseVisible}
                />
    }

    return(
        <div className='repository'>
            <div className='repository-content xcode-home-limited xcode'>
                <div className='repository-top'>
                    <BreadcrumbContent firstItem={'repository'}/>
                    <Btn
                        type={'primary'}
                        title={'新建仓库'}
                        icon={<PlusOutlined/>}
                        onClick={()=>setAddHouseVisible(true)}
                    />
                </div>
                <div className='repository-type'>
                    <Tabs
                        type={houseType}
                        tabLis={lis}
                        onClick={clickType}
                    />
                    <div className='repository-type-input'>
                        <Input
                            allowClear
                            placeholder='仓库名称'
                            // onChange={onChangeSearch}
                            prefix={<SearchOutlined />}
                            style={{ width: 200 }}
                        />
                    </div>
                </div>
                <RepositoryTable
                    {...props}
                    houseList={houseList}
                />
            </div>
        </div>
    )
}

export default inject('repositoryStore','groupStore')(observer(Repository))
