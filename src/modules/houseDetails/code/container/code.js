import React, {useEffect,useState,useRef,} from 'react'
import {Input,Table,Dropdown} from 'antd'
import {
    SearchOutlined,
    PlusOutlined,
    FolderOutlined
} from '@ant-design/icons'
import {inject,observer} from 'mobx-react'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import Btn from '../../../common/btn/btn'
import EmptyText from '../../../common/emptyText/emptyText'
import Usher from '../components/usher'
import RecentSubmitMsg from '../components/recentSubmitMsg'
import BreadChang from '../components/breadChang'
import Clone from '../components/clone'
import {interceptUrl} from '../../../common/client/client'
import Loading from '../../../common/loading/loading'
import '../components/code.scss'

const Code = props =>{

    const {houseStore,codeStore,location,match} = props

    const {houseInfo,webUrl} = houseStore
    const {findFileTree,codeTreeData,findCloneAddress,cloneAddress,findLatelyBranchCommit,latelyBranchCommit} = codeStore

    const searValue = useRef(null)
    const urlInfo = match.params

    const branch = urlInfo.branch?urlInfo.branch:houseInfo.defaultBranch
    const fileAddress = interceptUrl(location.pathname,webUrl+'/tree/'+urlInfo.branch)
    const [searInput,setSearInput] = useState(false)
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        if(houseInfo.name){
            // 树文件
            findFileTree({
                codeId:houseInfo.codeId,
                path:fileAddress[1],
                branch:branch
            }).then(res=>{
                setIsLoading(false)
                res.code===500001 && props.history.push('/index/404')
            })
        }
    },[houseInfo.name,location.pathname])

    useEffect(()=>{
        if(houseInfo.name){
            // 文件地址
            findCloneAddress(houseInfo.codeId)
            // 最近提交信息
            houseInfo.notNull && findLatelyBranchCommit({
                codeId:houseInfo.codeId,
                branchName:branch
            })
        }
    },[houseInfo.name])

    useEffect(()=>{
        // 监听文本框聚焦
        if(searInput){
            searValue.current.focus()
        }
    },[searInput])

    const fileName = record => {
        props.history.push(`/index/house/${urlInfo.namespace}${record.path}`)
    }

    const renderFileType = fileType => {
        switch (fileType) {
            case 'js':
            case 'java':
                return  'JavaScript'
            case 'css':
                return 'css'
            case 'txt':
                return 'TXT'
            case 'json':
                return 'json'
            case 'xml':
                return 'xml'
            case 'yaml':
                return 'YAML'
            default:
                return 'JavaScript'
        }
    }

    const goWebIde = () => {
        props.history.push(`/index/ide/${houseInfo.name}`)
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'fileName',
            key: 'fileName',
            width:'60%',
            ellipsis:true,
            render:(text,record)=>{
                return <span className='code-table-name' onClick={()=>fileName(record)}>
                            <span style={{paddingRight:5}}>
                                {
                                    record.type==='tree' ?
                                        <FolderOutlined/>
                                        :
                                        <svg className='icon' aria-hidden='true'>
                                            <use xlinkHref={`#icon-${renderFileType(record.fileType)}`}/>
                                        </svg>
                                }
                            </span>
                            <span>{text}</span>
                        </span>

            }
        },
        {
            title: '提交信息',
            dataIndex: 'commitMessage',
            key: 'commitMessage',
            width:'30%',
            ellipsis:true,
            render:(text,record)=> {
                return <span className='code-table-msg'>{text}</span>
            }
        },
        {
            title: '提交时间',
            dataIndex: 'commitTime',
            key:'commitTime',
            width:'10%',
            ellipsis:true,
        },
    ]

    const addFileMenu = (
        <div className='file-add-menu'>
            <div className='file-add-item'>新建文件</div>
            <div className='file-add-item'>新建文件夹</div>
            <div className='file-add-item'>上传文件</div>
        </div>
    )

    if(isLoading){
        return <Loading/>
    }

    if(!houseInfo.notNull){
        return  <Usher
                    houseInfo={houseInfo}
                    codeStore={codeStore}
                />
    }

    return(
        <div className='code'>
            <div className='code-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'代码'}/>
                <div className='code-content-head'>
                    <BreadChang
                        {...props}
                        houseInfo={houseInfo}
                        webUrl={webUrl}
                        branch={branch}
                        type={'tree'}
                    />
                    <div className='code-head-right'>
                        {
                            searInput ?
                                <div className='code-search-input'>
                                    <Input
                                        ref={searValue}
                                        placeholder='文件名称'
                                        // onChange={onChangeSearch}
                                        prefix={<SearchOutlined />}
                                        onBlur={()=>setSearInput(false)}
                                        style={{width:200}}
                                    />
                                </div>
                                :
                                <div className='code-search'>
                                    <SearchOutlined onClick={()=>setSearInput(true)}/>
                                </div>
                        }
                        <div className='code-file-add'>
                            <Dropdown overlay={addFileMenu} trigger={['click']} placement={'bottomRight'}>
                                <PlusOutlined/>
                            </Dropdown>
                        </div>
                        <div className='code-desc'>
                            <Btn
                                title={'WEB IDE'}
                                onClick={()=>goWebIde()}
                            />
                        </div>
                        <div className='code-clone'>
                            <Clone cloneAddress={cloneAddress}/>
                        </div>
                    </div>
                </div>
                <RecentSubmitMsg
                    {...props}
                    latelyBranchCommit={latelyBranchCommit}
                />
                <div className='code-content-tables'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={codeTreeData}
                        rowKey={record=>record.fileName}
                        pagination={false}
                        locale={{emptyText: <EmptyText/>}}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('houseStore','codeStore')(observer(Code))
