import React,{useState,useRef,useEffect} from 'react';
import {Col, Input} from 'antd';
import {FolderOutlined} from '@ant-design/icons';
import {getUser} from 'tiklab-core-ui';
import BreadcrumbContent from '../../common/breadcrumb/Breadcrumb';
import Btn from '../../common/btn/Btn';
import Tabs from '../../common/tabs/Tabs';
import './MergeDetails.scss';

const MergeDetails = props =>{

    const {setDetails} = props

    const descInputValue = useRef()
    const [detailsType,setDetailsType] = useState(1)
    const [descInput,setDescInput] = useState(false)
    const [viewInput,setViewInput] = useState(false)
    const [nodeId,setNodeId] = useState([])

    useEffect(()=>{
        if(descInput){
            descInputValue.current.focus()
        }
    },[descInput])

    const clickType = item => {
        setDetailsType(item.id)
    }

    const isExpandedTree = key => nodeId.some(item => item === key)

    const setOpenOrCloseInput = group =>{
        if (isExpandedTree(group.id)) {
            setNodeId(nodeId.filter(item => item!==group.id))
        } else {
            setNodeId(nodeId.concat(group.id))
        }
    }

    const lis = [
        {
            id:1,
            title:`动态(${9})`,
        },
        {
            id:2,
            title:`提交(${1})`,
        },
        {
            id:3,
            title:`变化(${7})`,
        }
    ]

    const mergeDetailsData = [
        {
            id:1,
            type:'AUTH',
            title:'该代码评审已合并',
            time:'4天前'
        },
        {
            id:2,
            type:'POSS',
            title:'通过了该评审',
            time:'7天前',
            nodeData: [
                {
                    id:'2-1',
                    node:'daszzzs',
                    time:'5天前 10:10'
                },
                {
                    id:'3-2',
                    node:'zzz',
                    time:'4天前 10:10'
                }
            ]
        },
        {
            id:3,
            type:'COMMENT',
            title: '发布了整体评论',
            time:'3天前',
            nodeData: [
                {
                    id:'3-1',
                    node:'dass',
                    time:'3天前'
                },
                {
                    id:'3-2',
                    node:'合并请求',
                    time:'4天前'
                }
            ]
        }
    ]

    const renderNodeData = item =>{
        return (
            <div key={item.id} className='log-node-item'>
                <div className='node-item-left'>
                    <div className='node-left-line'/>
                    <div className='left-avatar'>
                        {/*<Profile userInfo={getUser()}/>*/}
                    </div>
                </div>
                <div className='node-item-right'>
                    <div className='reply-user'>
                        <div className='reply-user-user'>莫凶凶</div>
                        <div className='reply-user-time'> · {item.time}</div>
                        <div className='reply-user-reply'> · 回复</div>
                    </div>
                    <div className='reply-comment'>
                        {item.node}
                    </div>
                </div>
            </div>
        )

    }

    const renderNode = (item,nodeData) => {
        return  <div className='log-comment'>
                    <div className='log-right-node'>
                        {
                            nodeData.map(item=>renderNodeData(item))
                        }
                    </div>
                    <div className='log-right-comment'>
                        <div className='reply-input-user'>
                            {/*<Profile userInfo={getUser()}/>*/}
                        </div>
                        <div className='reply-input'>
                            {
                                isExpandedTree(item.id) ?
                                    <>
                                        <Input.TextArea
                                            ref={ip=>ip && ip.focus()}
                                            placeholder='请输入评论'
                                        />
                                       <div className='reply-input-btn'>
                                           <Btn
                                               type={'common'}
                                               title={'取消'}
                                               isMar={true}
                                               onClick={()=>setOpenOrCloseInput(item)}
                                           />
                                           <Btn
                                               type={'primary'}
                                               title={'确定'}
                                               onClick={()=>setOpenOrCloseInput(item)}
                                           />
                                       </div>
                                    </>
                                    :
                                    <Input
                                        placeholder='请输入评论'
                                        onFocus={()=>setOpenOrCloseInput(item)}
                                    />
                            }
                        </div>
                    </div>
                </div>
    }

    const renderMergeDetailsData = (item) => {
        return (
            <div className='log-content-item' key={item.id}>
                <div className='log-left'>
                    <span className='log-left-icon'><FolderOutlined /></span>
                    <span className='log-left-line'/>
                </div>
                <div className='log-right'>
                    <div className='log-right-desc'>
                        <div className='desc-user-title'>
                            {/*<Profile userInfo={getUser()}/>*/}
                            <span className='desc-user'>莫凶凶</span>
                            <span className='desc-title'>{item.title}</span>
                        </div>
                        <div className='desc-time'>
                            {item.time}
                        </div>
                    </div>
                    {
                        item.nodeData &&
                        renderNode(item,item.nodeData)
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='xcode page-width mergeDetails'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='mergeDetails-content '>
                    <BreadcrumbContent firstItem={'Merge Requests'} secondItem={'34567'} goBack={()=>setDetails(false)}/>
                    <div className='mergeDetails-head'>
                        <div className='mergeDetails-head-left'>
                            <div className={`head-left-status status-1`}>已关闭</div>
                            <div className='head-left-time'>2个月前</div>
                            <div className='head-left-user'>admin</div>
                        </div>
                        <div className='mergeDetails-head-right'>
                            <Btn
                                type={'common'}
                                title={'编辑'}
                                isMar={true}
                            />
                            <Btn
                                type={'common'}
                                title={'重新打开合并请求'}
                            />
                        </div>
                    </div>
                    <Tabs
                        type={detailsType}
                        tabLis={lis}
                        onClick={clickType}
                    />
                    <div className='mergeDetails-log'>
                        <div className='mergeDetails-log-title'>
                            <div className='log-left'>
                                <span className='log-left-icon'><FolderOutlined /></span>
                                <div className='log-left-line'/>
                            </div>
                            <div className='log-title-right'>
                                <div className='right-title-time'>
                                    <div className='right-title'>
                                        {/*<Profile userInfo={getUser()}/>*/}
                                        <span className='title-user'>莫凶凶</span>
                                        <span className='title-title'>创建了合并请求，描述如下：</span>
                                    </div>
                                    <div className='right-time'>
                                        01月05日 18:12
                                    </div>
                                </div>
                                <div className='right-desc'>
                                    {
                                        descInput ?
                                            <div>
                                                <Input.TextArea
                                                    ref={descInputValue}
                                                    placeholder={'添加描述'}
                                                />
                                                <div className='right-desc-btn'>
                                                    <Btn
                                                        type={'common'}
                                                        title={'取消'}
                                                        isMar={true}
                                                        onClick={()=>setDescInput(false)}
                                                    />
                                                    <Btn
                                                        type={'primary'}
                                                        title={'确定'}
                                                        onClick={()=>setDescInput(false)}
                                                    />
                                                </div>
                                            </div>
                                            :
                                            <div className='right-desc-content'
                                                 onClick={()=>setDescInput(true)}
                                            >
                                                合并请求
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='mergeDetails-log-content'>
                            {
                                mergeDetailsData.map(item=>renderMergeDetailsData(item))
                            }
                            <div className='log-content-view'>
                                <div className='view-user'>
                                    {/*<Profile userInfo={getUser()}/>*/}
                                </div>
                                <div className='view-input'>
                                    {
                                        viewInput ?
                                            <>
                                                <Input.TextArea
                                                    ref={ip=>ip && ip.focus()}
                                                    placeholder='请输入评论'
                                                />
                                                <div className='view-input-btn'>
                                                    <Btn
                                                        type={'common'}
                                                        title={'取消'}
                                                        isMar={true}
                                                        onClick={()=>setViewInput(false)}
                                                    />
                                                    <Btn
                                                        type={'primary'}
                                                        title={'确定'}
                                                        onClick={()=>setViewInput(false)}
                                                    />
                                                </div>
                                            </>
                                            :
                                            <Input
                                                placeholder='展开讲讲你的看法'
                                                onClick={()=>setViewInput(true)}
                                            />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </div>
    )
}

export default MergeDetails
