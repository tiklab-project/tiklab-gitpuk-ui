import React,{useState,useEffect} from 'react'
import {PlusOutlined,SearchOutlined,DownOutlined,BranchesOutlined} from '@ant-design/icons'
import {Input,Space,Tooltip,Popconfirm} from 'antd'
import {inject,observer} from 'mobx-react'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import Btn from '../../../common/btn/btn'
import Tabs from '../../../common/tabs/tabs'
import EmptyText from '../../../common/emptyText/emptyText'
import BranchAdd from '../components/branchAdd'
import '../components/branch.scss'

const Branch = props =>{

    const {repositoryStore,branchStore} = props

    const {houseInfo,webUrl} = repositoryStore
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
       props.history.push(`/index/house/${webUrl}/tree/${item.branchName}`)
   }

    const renderData = item => {
        return(
            <div className='branch-tables-item' key={item.branchName}>
                <div className='branch-tables-icon'>
                    <BranchesOutlined/>
                </div>
                <div className='branch-tables-name'>
                    <div className='name-text-title'>
                        <span className='name-text-name' onClick={()=>goCode(item)}>
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
                    <Tooltip title={'超前master0个提交，滞后13个提交'}>
                        <span className='commit-num-left'>13</span>
                        <span className='commit-num-right'>0</span>
                    </Tooltip>
                </div>
                <div className='branch-tables-action'>
                    <Tooltip title='合并请求'>
                        <div className='branch-tables-combine'>合并请求</div>
                    </Tooltip>
                    <Tooltip title='对比'>
                        <div className='branch-tables-compare'>对比</div>
                    </Tooltip>
                    <Tooltip title='下载'>
                        <div className='branch-tables-download'>
                            <svg className='icon' aria-hidden='true'>
                                <use xlinkHref='#icon-xiazai'/>
                            </svg>
                            <DownOutlined style={{fontSize:13,paddingLeft:5}}/>
                        </div>
                    </Tooltip>
                    {
                        item.defaultBranch ?
                        <div className='no-del'>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-delete"/>
                            </svg>
                        </div>
                            :
                        <Tooltip title='删除'>
                            <Popconfirm
                                title="你确定删除吗"
                                onConfirm={()=>delBranch(item)}
                                okText="确定"
                                cancelText="取消"
                                placement="topRight"
                            >
                                <div className='branch-tables-del'>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-delete"/>
                                    </svg>
                                </div>
                            </Popconfirm>
                        </Tooltip>
                    }
                </div>
            </div>
        )
    }

    return(
        <div className='branch'>
            <div className='branch-content xcode-home-limited xcode'>
                <div className='branch-content-top'>
                    <BreadcrumbContent firstItem={'Branch'}/>
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
                            {id:1, title:'所有分支'},
                            {id:2, title:'活跃分支'},
                            {id:3, title:'非活跃分支'}
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
                        branchList && branchList.length > 0 ?
                        branchList.map(item=> renderData(item) )
                        :
                        <EmptyText title={'暂无分支'}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default inject('repositoryStore','branchStore')(observer(Branch))
