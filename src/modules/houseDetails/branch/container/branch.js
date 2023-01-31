import React,{useState,useEffect} from 'react'
import {PlusOutlined,SearchOutlined,DeleteOutlined,DownOutlined} from '@ant-design/icons'
import {Input,Space,Tooltip,Popconfirm} from 'antd'
import {inject,observer} from 'mobx-react'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import Btn from '../../../common/btn/btn'
import Tabs from '../../../common/tabs/tabs'
import Listname from '../../../common/list/listname'
import BranchAdd from '../components/branchAdd'
import '../components/branch.scss'

const Branch = props =>{

    const {houseStore,branchStore} = props

    const {houseInfo} = houseStore
    const {createBranch,findAllBranch,branchList,fresh,deleteBranch} = branchStore

    const [branchType,setBranchType] = useState(1)
    const [addVisible,setAddVisible] = useState(false)

    useEffect(()=>{
        houseInfo.name && findAllBranch(houseInfo.codeId)
    },[houseInfo.name,fresh])

    const clickType = item => {
        setBranchType(item.id)
    }

   const delBranch = item =>{
       deleteBranch({
           codeId:houseInfo.codeId,
           branchName:item.branchName
       })
   }


   const goCode = item =>{
       props.history.push(`/index/house/${houseInfo.name}/tree/${item.branchName}`)
   }

    const renderData = item => {
        return(
            <div className='branch-tables-item' key={item.branchName}>
                <div className='branch-tables-icon'>
                    <Listname text={item.branchName}/>
                </div>
                <div className='branch-tables-name'>
                    <div className='name-text-title'>
                        <span className='name-text-name'
                              onClick={()=>goCode(item)}
                        >
                            {item.branchName}
                        </span>
                        {
                            item.defaultBranch &&
                            <span className='name-text-type name-text-default'>默认</span>
                        }
                    </div>
                    <div className='name-text-desc'>
                        <span className='desc-name'>admin</span>
                        <span>2天前更新</span>
                    </div>
                </div>
                <div className='branch-tables-commit'>
                    <span className='commit-num-left'>13</span>
                    <span className='commit-num-right'>0</span>
                </div>
                <Space className='branch-tables-action'>
                    <Tooltip title='合并请求'>
                        <span className='branch-tables-combine'>
                            合并请求
                        </span>
                    </Tooltip>
                    <Tooltip title='对比'>
                        <span className='branch-tables-compare'>
                            对比
                        </span>
                    </Tooltip>
                    <Tooltip title='下载'>
                        <span className='branch-tables-download'>
                            <svg className='icon' aria-hidden='true'>
                                <use xlinkHref='#icon-xiazai'/>
                            </svg>
                            <DownOutlined style={{fontSize:13,paddingLeft:5}}/>
                        </span>
                    </Tooltip>
                    {
                        item.defaultBranch ?
                        <span className='no-del'>
                            <DeleteOutlined/>
                        </span>
                            :
                        <Tooltip title='删除'>
                            <Popconfirm
                                title="你确定删除吗"
                                onConfirm={()=>delBranch(item)}
                                okText="确定"
                                cancelText="取消"
                                placement="topRight"
                            >
                                <span className='branch-tables-del'>
                                    <DeleteOutlined/>
                                </span>
                            </Popconfirm>
                        </Tooltip>
                    }
                </Space>
            </div>
        )
    }

    return(
        <div className='branch'>
            <div className='branch-content xcode-home-limited xcode'>
                <div className='branch-content-top'>
                    <BreadcrumbContent firstItem={'分支'}/>
                    <Btn
                        type={'primary'}
                        title={'新建分支'}
                        icon={<PlusOutlined/>}
                        onClick={()=>setAddVisible(true)}
                    />
                    <BranchAdd
                        createBranch={createBranch}
                        branchList={branchList}
                        houseInfo={houseInfo}
                        addVisible={addVisible}
                        setAddVisible={setAddVisible}
                    />
                </div>
                <div className='branch-content-type'>
                    <Tabs
                        type={branchType}
                        tabLis={ [
                            {
                                id:1,
                                title:'所有分支',
                            },
                            {
                                id:2,
                                title:'活跃分支',
                            },
                            {
                                id:3,
                                title:'非活跃分支',
                            }
                        ]}
                        onClick={clickType}
                    />
                    <div className='branch-type-input'>
                        <Input
                            allowClear
                            placeholder='分支名称'
                            // onChange={onChangeSearch}
                            prefix={<SearchOutlined />}
                            style={{ width: 200 }}
                        />
                    </div>
                </div>
                <div className='branch-content-tables'>
                    {
                        branchList && branchList.map(item=>{
                            return renderData(item)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default inject('houseStore','branchStore')(observer(Branch))
