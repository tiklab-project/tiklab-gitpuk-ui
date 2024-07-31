/**
 * 合并分支确认界面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useRef,useEffect} from 'react';
import "./MergeAddVerifyBasic.scss"
import {
    BranchesOutlined, CheckCircleOutlined,
    CloseCircleOutlined, CommentOutlined, DeleteOutlined, ExclamationCircleOutlined, FormOutlined, MessageOutlined,
    PlusCircleOutlined, UpOutlined, CloseOutlined, UserAddOutlined, UserDeleteOutlined,PlusSquareOutlined,MinusSquareOutlined
} from "@ant-design/icons";
import {Dropdown, Input, Modal} from "antd";
import Btn from "../../common/btn/Btn";
import Profile from "../../common/profile/Profile";
import {getUser} from "thoughtware-core-ui";
import MergeClashPop from "./MergeClashPop";
import MergeAddVerifyBasicDrop from "./MergeAddVerifyBasicDrop";
import mergeAuditorStore from "../store/MergeAuditor";


const { confirm } = Modal;
const MergeAddVerifyBasic = (props) => {
    const {repositoryInfo,mergeData,mergeConditionList,createMergeComment,deleteMergeComment,findConditionType,
        setFindConditionType,commitsStatistics,auditorUserList,getMergeAuditorList,deGetMergeConditionList,match}=props
    const {findDmUserList,createMergeAuditor,deleteMergeAuditor}=mergeAuditorStore
    const inputValue = useRef(null);

    const userId=getUser().userId
    const webUrl = `${match.params.namespace}/${match.params.name}`

    //输入框类型
    const [viewInput,setViewInput] = useState([])

    const [commitValue,setCommitValue]=useState(null)

    //输入的提交评论内容 （key：动态id或者合并请求id,value:input值）
    const [commitValueList,setCommitValueList]=useState([])

    //回复人 （key：动态id,value:@人）
    const [replyUserList,setReplyUserList]=useState([])

    //冲突线下解决的弹窗
    const [clashVisible,setClashVisible]=useState(false)
    //审核人状态
    const [auditorVisible,setAuditorVisible]=useState(false)
    //用户
    const [userList,setUserList]=useState([])

    useEffect(()=>{
        findDmUserList({"domainId":repositoryInfo.rpyId}).then(res=>{
            setUserList(res.data)
        })

    },[])
    debugger
    //@ 人
    const getReplyUser = (key) => {
        const user=replyUserList.filter(replyUser=>replyUser.key===key);
        if (user.length>0){
            return user[0]
        }
        return null
    }

    //获取输入评论的内容
    const getCommentValue = (key) => {
        const value=commitValueList.filter(comment=>comment.key===key);
        if (value.length>0){
            return value[0]
        }
        return null
    }

    //截取回复内容
    const sliceData = (data,replyUserName) => {
       const size= replyUserName.length+1
       return  data.slice(size)
    }


    //切换输入框的 type:comment(评论下面提交评论)、condition(动态里面提交新的评论)
    const cuteViewInput = (key,value) => {
        if (value){
            setViewInput(viewInput.concat([{key:key,value:value}]))
        }else {
           setViewInput(viewInput.filter(item=>item.key!==key))
           getCommentValue(key).value=null
        }
    }

    //不同类型的图标
    const basicIcon = (type) =>{

        switch(type){
            case 'create':
                return <PlusCircleOutlined />
            case 'close':
                return <CloseCircleOutlined />
            case 'open':
                return <CheckCircleOutlined />
            case 'comment':
                return <CommentOutlined />
            case 'complete':
                return <BranchesOutlined />
            case 'addAuditor':
                return <UserAddOutlined />
            case 'removeAuditor':
                return <UserDeleteOutlined />
            case 'pass':
                return <PlusSquareOutlined />
            case 'notPass':
                return <MinusSquareOutlined />
        }
    }

    //输入评论内容
    const inputCommit = (event,key) => {
        const commentValue=getCommentValue(key);
        if (commentValue){
            commentValue.value=event.target.value
        }else {
            const value =commitValueList.concat([{key:key,value:event.target.value}])
            setCommitValueList(value)
        }
        setCommitValue(event.target.value)
    }

    //创建评论 1.评论下面评论、2.动态评论
    const createComment = (conditionId,type) => {
        createMergeComment({
            mergeConditionId:type==='comment'?conditionId:null,
            mergeRequestId:mergeData.id,
            repositoryId:mergeData.repository.rpyId,
            commentUser:{
                id:getUser().userId
            },
            replyUser:{
                id:getReplyUser(conditionId)&&getReplyUser(conditionId).value
            },
            data:type==='comment'?getCommentValue(conditionId).value:getCommentValue(mergeData.id).value,
            createType:type
        }).then(res=>{
            if (res.code===0){
               const key= type==='comment'?conditionId:mergeData.id
                //添加评论后清空input框输入内容
               getCommentValue(key).value=null
                //添加成功后 移除
                if (getReplyUser(conditionId)!==null){
                    getReplyUser(conditionId).value=null
                }
            }
        })
    }

    //回复评论
    const replyComment = (comment) => {
        const data="@"+comment.commentUser.name+" "
        const commentValue=getCommentValue(comment.mergeConditionId)
        //添加内容
        if (commentValue){
            commentValue.value=data
        }else {
            const value =commitValueList.concat([{key:comment.mergeConditionId,value:data}])
            setCommitValueList(value)
        }
        //打开输入评论框
        setViewInput(viewInput.concat([{key:comment.mergeConditionId,value:true}]))

        //添加回复人
        const replyUser=getReplyUser(comment.mergeConditionId)
        if (replyUser){
            replyUser.value=comment.commentUser.id
        }else {
            setReplyUserList([{key:comment.mergeConditionId,value:comment.commentUser.id}])
        }

        //聚焦
        inputValue.current.focus({
            cursor: 'end',
        })
    }

    //切换查询动态类型
    const cutCondition = (type) => {
        setFindConditionType(type)
    }

    //移除审核人
    const deleteAuditor = (auditor) => {
        deleteMergeAuditor(auditor.id).then(res=>{
            if (res.code===0){
                getMergeAuditorList()
                deGetMergeConditionList()
            }
        })
    }


    //删除弹窗
    const  DeletePop = (commitId) =>{
        confirm({
            title: "请问确定是否要删除次此条评论",
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            style:{marginTop:100},
            onOk() {
                deleteMergeComment(commitId)
            },
            onCancel() {
            },
        });
    }

    //跳转在线解决冲突界面
    const goClashEdit = () => {
        props.history.push(`/repository/${webUrl}/mergeClashEdit/${mergeData.id}`)
    }

    //搜索用户信息
    const changeUser = (e) => {
        const userName=e.target.value;
        findDmUserList({"domainId":repositoryInfo.rpyId,account:userName}).then(res=>{
            setUserList(res.data)
        })
    }

    //添加审核成员
    const addAuditorUser = (userId) => {
        createMergeAuditor({
            repositoryId:repositoryInfo.rpyId,
            mergeRequestId:mergeData.id,
            user:{
                id:userId
            },
            auditStatus:0
        }).then(res=>{
            if (res.code===0){
                getMergeAuditorList()
                deGetMergeConditionList()
            }
        })
    }

    //评论
    const comment = (item) => {
        return <div className='verify-basic-comment'>
            {
                item.mergeCommentList.map(comment=>{
                    return(
                        <div key={comment.id} className='verify-basic-comment-nav'>
                            <div className='basic-comment-title'>
                                <Profile userInfo={comment.commentUser}/>
                                <div className='comment-title-user'>{comment.commentUser.name}</div>
                                <div className='comment-title-time'>{comment.createTime}</div>
                                <div className='comment-title-icon reply-icon' onClick={()=>replyComment(comment)}>
                                    <MessageOutlined />
                                    <span className='comment-title-icon-left'>回复</span>
                                </div>
                                <div className='comment-title-icon reply-icon' onClick={()=>DeletePop(comment.id)}>
                                    <DeleteOutlined />
                                    <span className='comment-title-icon-left'>删除</span>
                                </div>
                            </div>
                            <div className='basic-comment-data'>
                                {
                                    ( comment.replyUser&&comment.replyUser.name)?
                                    <div>
                                        <span className='comment-reply-user'>
                                            {"@"+comment.replyUser.name}
                                        </span>
                                        <span>
                                            {sliceData(comment.data,comment.replyUser.name)}
                                        </span>
                                    </div>:
                                     <>
                                         {comment.data}
                                     </>
                                }
                            </div>
                        </div>
                    )})
            }
            {view(item.id,"comment")}
        </div>
    }


    //评论框
    const view = (key,type) => (
        <div className='commit-view-input'>
            <Profile userInfo={getUser()}/>
            <div className='commit-view-border'>
                {
                    (viewInput.filter(a=>a.key===key).length>0&& viewInput.filter(a=>a.key===key)[0]) ?
                        <>
                            <Input.TextArea
                                ref={inputValue}
                             /*   ref={key=>key && key.focus()}*/
                                placeholder='请输入评论'
                                onChange={(event)=>inputCommit(event,key)}
                                value={getCommentValue(key)?.value}
                            />
                            <div className='view-input-btn'>
                                <Btn
                                    type={'common'}
                                    title={'取消'}
                                    isMar={true}
                                    onClick={()=>cuteViewInput(key,false)}
                                />
                                {
                                    (getCommentValue(key)?.value)?
                                        <Btn
                                            type={'primary'}
                                            title={'确定'}
                                            onClick={()=>createComment(key,type)}
                                        />:
                                        <Btn
                                            type={'disabled'}
                                            title={'确定'}
                                        />
                                }

                            </div>
                        </>
                        :
                        <Input
                            placeholder='请输入评论'
                            onClick={()=>cuteViewInput(key,true)}
                        />
                }
            </div>
        </div>
    )

    //查询的item
    const items=[
        {
            key: 'all',
            label: (
                <div className='tile-right-nav'  onClick={()=>cutCondition("all")}>
                    全部动态
                </div>
            ),
        },
        {
            key: 'exec',
            label: (
                <div className='tile-right-nav' onClick={()=>cutCondition("exec")}>
                    操作历史
                </div>
            ),
        },
    ]


    return(
        <div className='verify-basic'>
            <div className='verify-basic-left'>
                {
                    (commitsStatistics?.clash===0&&mergeData?.mergeState!==2)&&
                    <div className='verify-basic-pass'>
                        已达到合并请求,可以合并
                    </div>||
                    commitsStatistics?.clash===1&&
                    <div className='verify-basic-clash'>
                        <div className='clash-left'>
                            合并请求源与目标分支文件冲突
                        </div>
                        <div className='clash-right'>
                            <div onClick={()=>goClashEdit(true)}>在线解决</div>
                            <div onClick={()=>setClashVisible(true)}>本地解决</div>
                        </div>
                    </div>
                }

                <div className='verify-basic-style'>
                    <div className='verify-basic-border'>
                        <div className='verify-basic-tile'>
                            <div className='basic-tile-left'>最新动态</div>
                            <div className='basic-tile-right'>
                                <Dropdown     menu={{items, selectedKeys: [findConditionType]}}  trigger={['click']}    placement={'bottomRight'} >
                                    <div className='basic-tile-right-icon' >
                                        <div>{findConditionType==='all'?'全部动态':'操作历史'}</div>
                                        <UpOutlined />
                                    </div>
                                </Dropdown>
                                {/*  <DownOutlined />*/}
                            </div>
                        </div>

                        <div className='verify-basic-log'>
                            {
                                mergeConditionList.length >0&&
                                mergeConditionList.map((item,key)=>{
                                    return(
                                        <div className='basic-log-title'>
                                            <div className='basic-log-left'>
                                                <span className='log-left-icon'>{basicIcon(item.type)}</span>
                                                <span className='log-left-line'/>
                                            </div>
                                            <div className='basic-log-right'>
                                                <div className='right-data-nav'>
                                                    <div className='right-title'>
                                                        <span className='title-user'>{item.user?.name}</span>
                                                        <span className='title-desc'>{item.data}</span>
                                                    </div>
                                                    <div className='right-time'>{item.createTime}</div>
                                                </div>
                                                {
                                                    (mergeConditionList.length-1!== key||item.type==="comment")&&
                                                    <div className='right-desc'>
                                                        {
                                                            ( item.type==="comment"&&item.mergeCommentList)&&
                                                            comment(item)
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {view(mergeData.id,"condition")}
                        </div>

                    </div>
                </div>
                <MergeClashPop
                    {...props}
                    visible={clashVisible}
                    setVisible={setClashVisible}
                    mergeData={mergeData}
                />
            </div>
            <div className='verify-basic-right'>
                <div className='verify-basic-right-nav'>
                    <div className='right-nav-title'>发起人</div>
                    <div className='right-nav-text'>{mergeData?.user.name}</div>
                </div>
                <div className='verify-basic-right-nav'>
                    <div className='right-nav-style right-nav-title'>
                        <div className='right-nav-text'>评审人</div>
                        {
                            (mergeData&&mergeData.user.id===userId) &&
                            <Dropdown
                                overlay={<MergeAddVerifyBasicDrop
                                    mergeData={mergeData}
                                    userList={userList}
                                    auditorUserList={auditorUserList}
                                    changUser={changeUser}
                                    addAuditorUser={addAuditorUser}
                                />}
                                trigger={['click']}
                                placement={'bottomLeft'}
                                visible={auditorVisible}
                                onVisibleChange={auditorVisible=>setAuditorVisible(auditorVisible)}
                            >
                              <FormOutlined className='right-nav-icon'/>
                            </Dropdown>
                        }
                    </div>
                    {
                        auditorUserList.length>0&&auditorUserList.map((item,index)=>{
                            return(
                                <div key={index}>
                                    <div className='auditor-nav-style'>
                                        <div className='right-nav-text'>{item.user?.name}</div>
                                        {
                                            (mergeData.user.id===userId&&mergeData?.user.id!==item.user.id)&&
                                                <div className='category-action' onClick={()=>deleteAuditor(item)}>
                                                    <CloseOutlined className='auditor-nav-icon right-nav-icon'/>
                                                </div>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )

}
export default MergeAddVerifyBasic
