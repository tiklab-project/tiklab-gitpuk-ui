import React,{useEffect,useState} from 'react';
import {Input,Tooltip,Popconfirm} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    TagOutlined
} from '@ant-design/icons';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../common/btn/Btn';
import Tabs from '../../../common/tabs/Tabs';
import Publish from './Publish';
import TagAdd from './TagAdd';
import PublishAdd from './PublishAdd';
import './Tag.scss';
import branchStore from "../../branch/store/BranchStore";
import {inject, observer} from "mobx-react";
import tagStore from "../store/TagStore";
import Omit from "../../../common/omit/Omit";
import EmptyText from "../../../common/emptyText/EmptyText";
const lis = [{id:1, title:'标签'},{id:2, title:'发行版'}]
const Tag = props =>{

    const {repositoryStore,match} = props
    const {repositoryInfo} = repositoryStore
    const {findTag,tagList,deleteTag}=tagStore
    const {branchList,fresh,findBranchList} = branchStore
    const webUrl = `${match.params.namespace}/${match.params.name}`

    const [tagType,setTagType] = useState(1)
    const [publishDetails,setPublishDetails] = useState(false)
    const [addTagVisible,setAddTagVisible] = useState(false)
    const [addPublishVisible,setAddPublishVisible] = useState(false)

    useEffect(()=>{
        repositoryInfo.name && findBranchList({rpyId:repositoryInfo.rpyId})

        findTag(repositoryInfo.rpyId)
    },[repositoryInfo.name,fresh])

    //查询标签
    const findTags = () => {
        findTag(repositoryInfo.rpyId).then(res=>
        res.code===0&&setAddTagVisible(false)
        )
    }

    const clickType = item => {
        setTagType(item.id)
    }


    const goDetails = (text,record) => {
        switch (tagType) {
            case 1:
                break
            case 2:
                setPublishDetails(true)
        }
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
        props.history.push(`/repository/${webUrl}/tree/${value.tagName}tag`)
    }
    //跳转commit 界面
    const goCommit = (value) => {
        props.history.push(`/repository/${webUrl}/commit/${value.commitId}`)
    }

    return(
        <div className='tag'>
            <div className='tag-content xcode-repository-width xcode'>
                <div className='tag-top'>
                    <BreadcrumbContent firstItem={'Tag'}/>
                    {
                        tagType===1?
                            <Btn
                                type={'primary'}
                                title={'新建标签'}
                                icon={<PlusOutlined/>}
                                onClick={()=>setAddTagVisible(true)}
                            />
                            :
                            <Btn
                                type={'primary'}
                                title={'新建发行版'}
                                icon={<PlusOutlined/>}
                                onClick={()=>setAddPublishVisible(true)}
                            />
                    }
                    <TagAdd addTagVisible={addTagVisible} setAddTagVisible={setAddTagVisible} branchList={branchList} repositoryInfo={repositoryInfo}
                            findTags={findTags}
                    />
                    <PublishAdd addPublishVisible={addPublishVisible} setAddPublishVisible={setAddPublishVisible}/>
                </div>
                <div className='tag-type'>
                    <Tabs
                        type={tagType}
                        tabLis={lis}
                        onClick={clickType}
                    />
                    <div className='tag-type-input'>
                        <Input
                            allowClear
                            placeholder='标签名称'
                            // onChange={onChangeSearch}
                            prefix={<SearchOutlined />}
                            style={{ width: 200 }}
                        />
                    </div>
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
                                    <div className='tag-tables-action'>
                                        <Tooltip title='下载'>
                                            <div className='tag-tables-download'>
                                                <svg className='icon' aria-hidden='true'>
                                                    <use xlinkHref='#icon-xiazai'/>
                                                </svg>
                                            </div>
                                        </Tooltip>
                                        <Tooltip title='删除'>
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
                                        </Tooltip>
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
        </div>
    )
}

export default inject('repositoryStore')(observer(Tag))
