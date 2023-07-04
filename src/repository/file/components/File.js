import React, {useEffect,useState,useRef,} from "react";
import {Input,Dropdown} from "antd";
import {
    SearchOutlined,
    PlusOutlined,
    FolderOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import EmptyText from "../../../common/emptyText/EmptyText";
import Usher from "./Usher";
import RecentSubmitMsg from "./RecentSubmitMsg";
import BreadChang from "./BreadChang";
import Clone from "./Clone";
import {setBranch,setFileAddress,findCommitId} from "./Common";
import {SpinLoading} from "../../../common/loading/Loading";
import fileStore from '../store/FileStore';
import "./File.scss";

const File = props =>{

    const {repositoryStore,location,match} = props
    const {repositoryInfo} = repositoryStore
    const {findFileTree,codeTreeData,findCloneAddress,cloneAddress,findLatelyBranchCommit,latelyBranchCommit} = fileStore

    const searValue = useRef(null)
    const urlInfo = match.params.branch
    const branch = setBranch(urlInfo,repositoryInfo)
    const fileAddress = setFileAddress(location,repositoryInfo.rpyId+"/tree/"+urlInfo)

    //文本框搜索
    const [searInput,setSearInput] = useState(false)

    //加载
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        if(repositoryInfo.name){
            // 获取文件，同时监听路由变化
            findFileTree({
                rpyId:repositoryInfo.rpyId,
                path:fileAddress[1],
                branch:branch,
                findCommitId:findCommitId(urlInfo)
            }).then(res=>{
                setIsLoading(false)
                res.code===500001 && props.history.push("/index/404")
            })
        }
    },[repositoryInfo.name,location.pathname])

    useEffect(()=>{
        if(repositoryInfo.name){
            // 获取文件地址
            findCloneAddress(repositoryInfo.rpyId)
            // 获取最近提交信息
             findLatelyBranchCommit({
                rpyId:repositoryInfo.rpyId,
                branch:branch,
                findCommitId:findCommitId(urlInfo)
            })
        }
    },[repositoryInfo.name])



    useEffect(()=>{
        // 监听文本框聚焦
        if(searInput){
            searValue.current.focus()
        }
    },[searInput])

    /**
     * 跳转到下一个文件路由
     * @param record
     */
    const goFileChild = record => {
        props.history.push(`/index/repository/${repositoryInfo.rpyId}${record.path}`)
    }

    /**
     * 跳转到上一个文件路由
     * @param fileParent
     */
    const goFileParent = fileParent => {
        props.history.push(`/index/repository/${repositoryInfo.rpyId}/tree/${urlInfo}${fileParent}`)
    }

    /**
     * 文件图标
     * @param fileType
     * @returns {string|*}
     */
    const renderFileIcon = fileType => {
        switch (fileType) {
            case "txt":
            case "yaml":
            case "css":
            case "json":
            case "xml":
            case "cmd":
            case "md":
            case "sql":
            case "ts":
            case "java":
                return fileType
            case "js":
                return "JavaScript"
            case "sh":
                return "powershell"
            case "gitignore":
                return "git"
            default:
                return "txt"
        }
    }

    const goWebIde = () => {
        // props.history.push(`/index/ide/${repositoryInfo.name}`)
    }

    const addFileMenu = (
        <div className="file-add-menu">
            <div className="file-add-item">新建文件</div>
            <div className="file-add-item">新建文件夹</div>
            <div className="file-add-item">上传文件</div>
        </div>
    )

    if(!codeTreeData){
        return  <Usher
                    repositoryInfo={repositoryInfo}
                    fileStore={fileStore}
                />
    }

    const renderCode = item => {
        return (
            <div key={item.fileName} className="code-data-item">
                <div className="code-item-fileName" onClick={()=>goFileChild(item)}>
                    <span style={{paddingRight:5}}>
                        {
                            item.type==="tree" ?
                                <FolderOutlined/>
                                :
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-${renderFileIcon(item.fileType)}`}/>
                                </svg>
                        }
                    </span>
                    <span>{item.fileName}</span>
                </div>
                <div className="code-item-commitMessage">{item.commitMessage}</div>
                <div className="code-item-commitTime">{item.commitTime}</div>
            </div>
        )
    }

    return(
        <div className="code">
            <div className="code-content xcode-home-limited xcode">
                <BreadcrumbContent firstItem={"Code"}/>
                <div className="code-content-head">
                    <BreadChang
                        {...props}
                        repositoryInfo={repositoryInfo}
                        branch={urlInfo}
                        fileAddress={fileAddress}
                        type={"tree"}
                    />
                    <div className="code-head-right">
                        {
                            searInput ?
                                <div className="code-search-input">
                                    <Input
                                        ref={searValue}
                                        placeholder="文件名称"
                                        // onChange={onChangeSearch}
                                        prefix={<SearchOutlined />}
                                        onBlur={()=>setSearInput(false)}
                                        style={{width:200}}
                                    />
                                </div>
                                :
                                <div className="code-search">
                                    <SearchOutlined onClick={()=>setSearInput(true)}/>
                                </div>
                        }
                        <div className="code-file-add">
                            <Dropdown overlay={addFileMenu} trigger={["click"]} placement={"bottomCenter"}>
                                <PlusOutlined/>
                            </Dropdown>
                        </div>
                        <div className="code-desc">
                            <Btn title={"WEB IDE"} onClick={()=>goWebIde()}/>
                        </div>
                        <div className="code-clone">
                            <Clone cloneAddress={cloneAddress}/>
                        </div>
                    </div>
                </div>
                <RecentSubmitMsg {...props} latelyBranchCommit={latelyBranchCommit} repositoryInfo={repositoryInfo}/>
                <div className="code-content-tables">
                    <div className="code-data-item">
                        <div className="code-item-fileName">名称</div>
                        <div className="code-item-commitMessage">提交信息</div>
                        <div className="code-item-commitTime">提交时间</div>
                    </div>
                    {
                        fileAddress[1] &&
                        <div className="code-data-item" onClick={()=>goFileParent(codeTreeData[0].fileParent)}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#icon-fanhui`}/>
                            </svg>
                        </div>
                    }
                    {
                        isLoading ? <SpinLoading type="table"/> :
                            (codeTreeData && codeTreeData.length > 0) ?
                            codeTreeData.map(item=>renderCode(item))
                            :
                            <EmptyText title={"暂无文件"}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default inject("repositoryStore")(observer(File))
