import React,{useState} from 'react'
import {PlusOutlined,SettingOutlined,LockOutlined,SearchOutlined} from '@ant-design/icons'
import {inject,observer} from 'mobx-react'
import {Table,Tooltip,Space,Input} from 'antd'
import BreadcrumbContent from '../../common/breadcrumb/breadcrumb'
import Btn from '../../common/btn/btn'
import Tabs from '../../common/tabs/tabs'
import EmptyText from '../../common/emptyText/emptyText'
import Listname from '../../common/list/listname'
import HouseAdd from '../components/houseAdd'
import '../components/house.scss'


const House = props => {

    const {houseStore} = props

    const {houseType,setHouseType} = houseStore

    const [addHouseVisible,setAddHouseVisible] = useState(false)

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

    const goDetails = (text,record) => {
        props.history.push(`/index/house/${record.name}/tree`)
    }

    const columns = [
        {
            title: '仓库名称',
            dataIndex: 'name',
            key: 'name',
            width:'60%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='storehouse-tables-name' onClick={()=>goDetails(text,record)}>
                        <div className='name-icon'>
                            <Listname text={text}/>
                        </div>
                        <div className='name-text'>
                            <div className='name-text-title'>
                                <span className='name-text-name'>仓库组/{text}</span>
                                <span className='name-text-lock'><LockOutlined/></span>
                                <span className='name-text-type'>{record.userType === '3' ? '管理员':'开发者'}</span>
                            </div>
                            {
                                record.userType === '2' &&
                                <div className='name-text-desc'>{text}</div>
                            }

                        </div>
                    </div>
                )
            }
        },
        {
            title: '更新',
            dataIndex: 'update',
            key: 'update',
            width:'30%',
            ellipsis:true,
        },
        {
            title: '操作',
            dataIndex: 'action',
            key:'action',
            width:'10%',
            ellipsis:true,
            render:(text,record)=>{
                return(
                    <Space>
                        <Tooltip title='设置'>
                            <span className='storehouse-tables-set'>
                                <SettingOutlined className='actions-se'/>
                            </span>
                        </Tooltip>
                        <Tooltip title='收藏'>
                                <span className='storehouse-tables-collect'>
                                {
                                    record.collect === 0 ?
                                        <svg className='icon' aria-hidden='true'>
                                            <use xlinkHref={`#icon-xingxing-kong`} />
                                        </svg>
                                        :
                                        <svg className='icon' aria-hidden='true'>
                                            <use xlinkHref={`#icon-xingxing1`} />
                                        </svg>
                                }
                                </span>
                        </Tooltip>
                    </Space>
                )
            }
        },
    ]

    const dataSource = [
        {
            id:'1',
            name:'node',
            update:'昨天',
            userType:'1'
        },
        {
            id:'2',
            name:'api',
            update:'2天前',
            userType:'2'
        },
        {
            id:'3',
            name:'boss',
            update:'20分钟前',
            userType: '2'
        }
    ]

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
                <div className='storehouse-tables'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={dataSource}
                        rowKey={record=>record.id}
                        pagination={false}
                        locale={{emptyText: <EmptyText/>}}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('houseStore')(observer(House))
