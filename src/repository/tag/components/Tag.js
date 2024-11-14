import React,{useEffect,useState} from 'react';
import {Tooltip, Col} from 'antd';
import {TagOutlined} from '@ant-design/icons';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../common/btn/Btn';
import Publish from './Publish';
import TagAdd from './TagAdd';
import PublishAdd from './PublishAdd';
import './Tag.scss';
import branchStore from "../../branch/store/BranchStore";
import {inject, observer} from "mobx-react";
import tagStore from "../store/TagStore";
import {PrivilegeProjectButton} from 'tiklab-privilege-ui';
import Omit from "../../../common/omit/Omit";
import EmptyText from "../../../common/emptyText/EmptyText";
import DeleteExec from "../../../common/delete/DeleteExec";
import SearchInput from "../../../common/input/SearchInput";
import {getUser} from "tiklab-core-ui";
const lis = [{id:1, title:'标签'},{id:2, title:'发行版'}]
const Tag = props =>{

    const {repositoryStore,match} = props
    const {repositoryInfo} = repositoryStore
    const {findTagList,tagList,deleteTag}=tagStore
    const {branchList,fresh,findBranchList} = branchStore
    const webUrl = `${match.params.namespace}/${match.params.name}`

    const [tagType,setTagType] = useState(1)
    const [publishDetails,setPublishDetails] = useState(false)
    const [addTagVisible,setAddTagVisible] = useState(false)
    const [addPublishVisible,setAddPublishVisible] = useState(false)

    const [tagName,setTagName]=useState()

    useEffect(()=>{
        repositoryInfo.name && findBranchList({rpyId:repositoryInfo.rpyId})

        getTagList()
    },[repositoryInfo.name,fresh])


    //查询标签列表
    const getTagList = () => {
        findTagList({
            rpyId:repositoryInfo.rpyId,
            tagName:tagName
        })
    }


    //查询标签
    const findTags = () => {
        findTagList({rpyId:repositoryInfo.rpyId}).then(res=>
        res.code===0&&setAddTagVisible(false))
    }


    if(publishDetails){
        return  <Publish
                    setPublishDetails={setPublishDetails}
                />
    }

    //删除标签
    const delTag = (value) => {
        deleteTag({rpyId:repositoryInfo.rpyId,tagName:value.tagName}).then(res=>{
            res.code===0&&findTags()
        })
    }

    //跳转file 界面
    const goFile = (value) => {
        props.history.push(`/repository/${webUrl}/code/${value.tagName}`)
    }
    //跳转commit 界面
    const goCommit = (value) => {
        props.history.push(`/repository/${webUrl}/commit/${value.commitId}`)
    }

    //输入搜索的标签名字
    const onChangeSearch = (e) => {
        const value=e.target.value
        setTagName(value)
        if (value===''){
            findTagList({rpyId:repositoryInfo.rpyId})
        }
    }


    //下载当前标签仓库
    const downloadRepo = (data) => {
        const tenantId=getUser().tenant
        window.location.href=`${node_env? base_url:window.location.origin}/repositoryFile/downLoadBareRepo${tenantId?"/"+getUser().tenant:""}?tag=${data.tagName}&type=zip&rpyId=${repositoryInfo?.rpyId}&rpyName=${repositoryInfo.name}`
    }

    //名字搜索标签
    const onSearch =async () => {
        getTagList()
    }

    return(
        <div className='xcode page-width tag'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='tag-content  '>
                    <div className='tag-top'>
                        <BreadcrumbContent firstItem={'Tag'}/>
                        {
                            tagType===1?
                                <PrivilegeProjectButton code={"rpy_tag_add"} domainId={repositoryInfo && repositoryInfo.rpyId}>
                                    <Btn
                                        type={'primary'}
                                        title={'新建标签'}
                                        onClick={()=>setAddTagVisible(true)}
                                    />
                                </PrivilegeProjectButton > :
                                <Btn
                                    type={'primary'}
                                    title={'新建发行版'}
                                    onClick={()=>setAddPublishVisible(true)}
                                />
                        }
                        <TagAdd addTagVisible={addTagVisible}
                                setAddTagVisible={setAddTagVisible}
                                branchList={branchList}
                                tagList={tagList}
                                repositoryInfo={repositoryInfo}
                                findTags={findTags}
                        />
                        <PublishAdd addPublishVisible={addPublishVisible} setAddPublishVisible={setAddPublishVisible}/>
                    </div>
                    <div className='tag-filter'>
                        {/*   <Tabs
                        type={tagType}
                        tabLis={lis}
                        onClick={clickType}
                    />*/}
                        <SearchInput
                            placeholder='搜索标签名称'
                            onChange={onChangeSearch}
                            onPressEnter={onSearch}
                        />
                    </div>
                    <div className='tag-tables'>
                        {
                            tagList.length>0?tagList.map(item=>{
                                    return(
                                        <div className='tag-tables-style'>
                                            <div className=''>
                                                <div className='tag-tables-item'>
                                                    <div style={{paddingTop:5}}>
                                                        <TagOutlined />
                                                    </div>
                                                    <div className='tag-tables-name'>
                                                        <div className='tag-tables-name-cursor' onClick={()=>goFile(item)}>
                                                            {item.tagName}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='tag-tables-item tag-tables-item-top'>
                                                    <div className='tag-tables-commitId'>
                                                        <div className='tag-tables-commitId-cursor' onClick={()=>goCommit(item)}>
                                                            <Omit value={item.commitId} maxWidth={"69px"} />
                                                        </div>

                                                    </div>
                                                    <div>{item.commitDesc}</div>
                                                    <div>{item.timeDiffer}</div>
                                                </div>
                                            </div>
                                            <div className='tag-tables-action' >
                                                <Tooltip title='下载'>
                                                    <div className='tag-tables-download' onClick={()=>downloadRepo(item)}>
                                                        <svg className='icon' aria-hidden='true'>
                                                            <use xlinkHref='#icon-xiazai'/>
                                                        </svg>
                                                    </div>
                                                </Tooltip>
                                                <PrivilegeProjectButton code={"rpy_tag_delete"} domainId={repositoryInfo && repositoryInfo.rpyId}>
                                                    <DeleteExec value={item} deleteData={delTag} title={"确认删除"} type={'tag'}/>
                                                </PrivilegeProjectButton>
                                              {/*  <Tooltip title='删除'>
                                                    <Popconfirm
                                                        title="你确定删除吗"
                                                        onConfirm={()=>delTag(item)}
                                                        okText="确定"
                                                        cancelText="取消"
                                                        placement="topRight"
                                                    >
                                                        <div className='tag-tables-del'>
                                                            <svg className="icon" aria-hidden="true">
                                                                <use xlinkHref="#icon-delete"/>
                                                            </svg>
                                                        </div>
                                                    </Popconfirm>
                                                </Tooltip>*/}
                                            </div>
                                        </div>

                                    )
                                }):
                                <div style={{marginTop:30}}>
                                    <EmptyText title={'暂无标签'}     />
                                </div>

                        }

                        {/*     <Table
                        bordered={false}
                        columns={tagType===1?columnsTag:columnsPublish}
                        dataSource={[]}
                        rowKey={record=>record.id}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={tagType===1?'暂无标签':'暂无发行版'}/>}}
                    />*/}
                    </div>
                </div>
            </Col>
        </div>
    )
}

export default inject('repositoryStore')(observer(Tag))
