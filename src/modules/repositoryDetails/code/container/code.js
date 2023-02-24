import React, {useEffect,useState,useRef,} from 'react'
import {Input,Dropdown} from 'antd'
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
import {setBranch,setFileAddress,findCommitId} from '../components/common'
import {SpinLoading} from '../../../common/loading/loading'
import '../components/code.scss'

const Code = props =>{

    const {repositoryStore,codeStore,location,match} = props

    const {houseInfo,webUrl} = repositoryStore
    const {findFileTree,codeTreeData,findCloneAddress,cloneAddress,findLatelyBranchCommit,latelyBranchCommit} = codeStore

    const searValue = useRef(null)
    const urlInfo = match.params.branch
    const branch = setBranch(urlInfo,houseInfo)
    const fileAddress = setFileAddress(location,webUrl+'/tree/'+urlInfo)
    const [searInput,setSearInput] = useState(false)
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        if(houseInfo.name){
            // 树文件dd
            findFileTree({
                codeId:houseInfo.codeId,
                path:fileAddress[1],
                branch:branch,
                findCommitId:findCommitId(urlInfo)
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
                branch:branch,
                findCommitId:findCommitId(urlInfo)
            })
        }
    },[houseInfo.name])

    useEffect(()=>{
        // 监听文本框聚焦
        if(searInput){
            searValue.current.focus()
        }
    },[searInput])

    const goFileName = record => {
        props.history.push(`/index/house/${webUrl}${record.path}`)
    }

    const goFileParent = fileParent => {
        props.history.push(`/index/house/${webUrl}/tree/${urlInfo}${fileParent}`)
    }

    const renderFileType = fileType => {
        switch (fileType) {
            case 'txt':
            case 'yaml':
            case 'css':
            case 'json':
            case 'xml':
            case 'cmd':
            case 'md':
            case 'sql':
            case 'ts':
            case 'java':
                return fileType
            case 'js':
                return 'JavaScript'
            case 'sh':
                return 'powershell'
            case 'gitignore':
                return 'git'
            default:
                return 'txt'
        }
    }

    const goWebIde = () => {
        // props.history.push(`/index/ide/${houseInfo.name}`)
    }

    const addFileMenu = (
        <div className='file-add-menu'>
            <div className='file-add-item'>新建文件</div>
            <div className='file-add-item'>新建文件夹</div>
            <div className='file-add-item'>上传文件</div>
        </div>
    )

    if(!houseInfo.notNull){
        return  <Usher
                    houseInfo={houseInfo}
                    codeStore={codeStore}
                />
    }

    const renderCode = item => {
        return (
            <div key={item.fileName} className='code-data-item'>
                <div className='code-item-fileName' onClick={()=>goFileName(item)}>
                    <span style={{paddingRight:5}}>
                        {
                            item.type==='tree' ?
                                <FolderOutlined/>
                                :
                                <svg className='icon' aria-hidden='true'>
                                    <use xlinkHref={`#icon-${renderFileType(item.fileType)}`}/>
                                </svg>
                        }
                    </span>
                    <span>{item.fileName}</span>
                </div>
                <div className='code-item-commitMessage'>{item.commitMessage}</div>
                <div className='code-item-commitTime'>{item.commitTime}</div>
            </div>
        )
    }

    return(
        <div className='code'>
            <div className='code-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'Code'}/>
                <div className='code-content-head'>
                    <BreadChang
                        {...props}
                        houseInfo={houseInfo}
                        webUrl={webUrl}
                        branch={urlInfo}
                        fileAddress={fileAddress}
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
                            <Dropdown overlay={addFileMenu} trigger={['click']} placement={'bottomCenter'}>
                                <PlusOutlined/>
                            </Dropdown>
                        </div>
                        <div className='code-desc'>
                            <Btn title={'WEB IDE'} onClick={()=>goWebIde()}/>
                        </div>
                        <div className='code-clone'>
                            <Clone cloneAddress={cloneAddress}/>
                        </div>
                    </div>
                </div>
                <RecentSubmitMsg {...props} latelyBranchCommit={latelyBranchCommit} webUrl={webUrl}/>
                <div className='code-content-tables'>
                    <div className='code-data-item'>
                        <div className='code-item-fileName'>名称</div>
                        <div className='code-item-commitMessage'>提交信息</div>
                        <div className='code-item-commitTime'>提交时间</div>
                    </div>
                    {
                        fileAddress[1] &&
                        <div className='code-data-item' onClick={()=>goFileParent(codeTreeData[0].fileParent)}>
                            <svg className='icon' aria-hidden='true'>
                                <use xlinkHref={`#icon-fanhui`}/>
                            </svg>...
                        </div>
                    }
                    {
                        isLoading ? <SpinLoading type='table'/> :
                        codeTreeData && codeTreeData.length > 0 ?
                            codeTreeData.map(item=>renderCode(item))
                            :
                            <EmptyText title={'暂无文件'}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default inject('repositoryStore','codeStore')(observer(Code))
