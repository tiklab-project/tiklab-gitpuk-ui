/**
 * @name: BranchSetting
 * @author: limingliang
 * @date: 2023-08-24 14:30
 * @description：分子设置
 * @update: 2023-08-24 14:30
 */
import React,{useState,useEffect} from 'react';
import {Modal, Form, Input, Select, Button, Table, Space, Switch, Tooltip} from 'antd';
import "./BranchSetting.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import branchStore from "../../branch/store/BranchStore";
import {inject, observer} from "mobx-react";
import {setBranch} from "../../file/components/Common";
import EmptyText from "../../../common/emptyText/EmptyText";
import {
    BranchesOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    FilePdfOutlined,
    RightOutlined
} from "@ant-design/icons";
import {Validation} from "../../../common/client/Client";
import RepositoryPower from "../../repository/components/RepositoryPower";
import Btn from "../../../common/btn/Btn";
import {PrivilegeProjectButton} from "thoughtware-privilege-ui";
const BranchSetting = (props) => {
    const {repositoryStore,match} = props
    const {repositoryInfo} = repositoryStore
    const {findAllBranch,branchList,updateDefaultBranch} = branchStore

    const urlInfo = match.params.branch
    //默认分支
    const branch = setBranch(urlInfo,repositoryInfo && repositoryInfo)

    const [branchData,setBranchData]=useState()
    const [branchRuleList,setBranchRuleList]=useState([])

    const [expandedTree,setExpandedTree] = useState([])  // 树的展开与闭合


    useEffect(()=>{
        // 获取全部分支
        repositoryInfo.name && findAllBranch(repositoryInfo.rpyId)
        setBranchData(branch)
    },[repositoryInfo.name])

    const columns = [
        {
            title: '分支规则',
            dataIndex: 'name',
            key: 'name',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '允许推送',
            dataIndex: 'address',
            key: 'address',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '允许合并',
            dataIndex: 'timedState',
            key: 'timedState',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '合并规则',
            dataIndex: 'timedState',
            key: 'timedState',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '操作',
            dataIndex: 'action',
            key:'action',
            width:'10%',
            ellipsis:true,
            render:(text,record)=>{

            }
        },
    ]


    //选择分支
    const choiceBranch = (value) => {
        setBranchData(value)

    }

    const cutBranch =async () => {
        updateDefaultBranch({
            name:branchData,
            rpyId:repositoryInfo.rpyId
        })
    }

    /**
     * 是否存在key
     * @param key
     * @returns {boolean}
     */
    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    /**
     * 展开和闭合
     * @param key
     */
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            // false--闭合
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            // ture--展开
            setExpandedTree(expandedTree.concat(key))
        }
    }


    const lisItem = (item,index) =>{
        return <div key={item.key} className={`${index>0?' border-top':''}`}>
            <div className={`branch-setting-li-top ${isExpandedTree(item.key) ?'branch-setting-li-select':''}`}
                 onClick={()=>setOpenOrClose(item.key)}>
                <div className='branch-setting-li-icon'>{item.icon}</div>
                <div className='branch-setting-li-center'>
                    <div className='branch-setting-li-title'>{item.title}</div>
                    {
                        !isExpandedTree(item.key) &&
                        <div className='branch-setting-li-desc'>{item.desc}</div>
                    }
                </div>
                <div className='branch-setting-li-down'>
                    {isExpandedTree(item.key)? <DownOutlined />:<RightOutlined />}
                </div>
            </div>
            <div className={`${isExpandedTree(item.key)? 'branch-setting-li-bottom':'branch-setting-li-none'}`}>
                {
                    isExpandedTree(item.key) && item.content
                }
            </div>
        </div>
    }



    const lis = [
        {
            key:1,
            title:'切换分支',
            desc: '切换分支',
            icon:   <BranchesOutlined style={{fontSize:16}} />,
            enCode:'house_update',
            content: <div className='branch-setting-mode'>
                    <div className='mode-title'>默认分子</div>
                    <div className='mode-desc'>默认分支被视为代码库中的基本分支，是所有 clone、代码提交和合并请求的目标分支</div>
                    <div >
                        <Select style={{width:300}}  defaultValue={branch}   allowClear onChange={choiceBranch}>
                            {
                                branchList.length&&branchList.map(item=>{
                                        return(
                                            <Select.Option key={item.branchName} value={item.branchName}>{item.branchName}</Select.Option>
                                        )
                                    }
                                )
                            }
                        </Select>
                        <div style={{marginTop:20}}>
                            {
                                branchData===branch?
                                    <Button type="primary" disabled>更新</Button>:
                                    <Button type="primary" onClick={cutBranch}>更新</Button>
                            }
                        </div>
                    </div>
                </div>
        },

        {
            key:3,
            title:'分支规则',
            desc: '分支规则',
            icon: <FilePdfOutlined style={{fontSize:16}}/>,
            enCode:'house_delete',
            content:
                <div className='branch-setting-rule'>
                    <div className='rule-justify'>
                        <div className='rule-title'>保护分支规则</div>

                        {  branchRuleList.length?
                            <Button type="primary" >添加分支规则</Button>
                            :null
                        }

                    </div>
                    <div className='rule-desc'>可限制允许推送与合并保护分支的角色和用户,创建合并请求并邀请其他成员评审代码</div>
                    <div style={{marginTop:10}}>
                        {
                            branchRuleList.length?
                                <Table
                                    bordered={false}
                                    columns={columns}
                                    dataSource={branchRuleList}
                                    rowKey={record=>record.groupId}
                                    pagination={false}
                                    locale={{emptyText: <EmptyText title={'暂无分支规则'}/>}}
                                />:
                                <div>
                                    <EmptyText type={"branchSetting"} />
                                    <div className='rule-text'>
                                        没有设置规则
                                        <span className='rule-text-color' disabled>
                                            添加分支规则
                                        </span>
                                    </div>
                                </div>

                        }

                    </div>
                </div>
        }
    ]

    return(
        <div className='branch-setting'>
            <div className='xcode-repository-width-setting xcode'>
                <BreadcrumbContent firstItem={'BranchSetting'}/>
                <div className='border-margin'>
                    <div className='branch-setting-li'>
                        {
                            lis.map((item,index)=> lisItem(item,index) )
                        }
                    </div>
                </div>


                {/*<div className='branch-setting-mode'>
                    <div className='mode-title'>默认分子</div>
                    <div className='mode-desc'>默认分支被视为代码库中的基本分支，是所有 clone、代码提交和合并请求的目标分支</div>
                    <div style={{display:'flex'}}>
                        <Select style={{width:300}}  defaultValue={branch}   allowClear onChange={choiceBranch}>
                            {
                                branchList.length&&branchList.map(item=>{
                                        return(
                                            <Select.Option key={item.branchName} value={item.branchName}>{item.branchName}</Select.Option>
                                        )
                                    }
                                )
                            }
                        </Select>
                        <div style={{marginLeft:30}}>
                            {
                                branchData===branch?
                                    <Button type="primary" disabled>更新</Button>:
                                    <Button type="primary" onClick={cutBranch}>更新</Button>
                            }
                        </div>
                    </div>
                </div>
                <div className='branch-setting-rule'>
                    <div className='rule-justify'>
                        <div className='rule-title'>保护分支规则</div>

                        {  branchRuleList.length?
                            <Button type="primary" >添加分支规则</Button>
                            :null
                        }

                    </div>
                    <div className='rule-desc'>可限制允许推送与合并保护分支的角色和用户,创建合并请求并邀请其他成员评审代码</div>
                    <div style={{marginTop:10}}>
                        {
                            branchRuleList.length?
                                <Table
                                    bordered={false}
                                    columns={columns}
                                    dataSource={branchRuleList}
                                    rowKey={record=>record.groupId}
                                    pagination={false}
                                    locale={{emptyText: <EmptyText title={'暂无分支规则'}/>}}
                                />:
                                <div>
                                    <EmptyText type={"branchSetting"} />
                                    <div className='rule-text'>
                                        没有设置规则
                                        <span className='rule-text-color' disabled>
                                            添加分支规则
                                        </span>
                                    </div>
                                </div>

                        }

                    </div>
                </div>*/}
            </div>
        </div>
    )
}
export default inject('repositoryStore')(observer(BranchSetting))
