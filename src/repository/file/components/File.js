import React, {useEffect,useState,useRef,} from "react";
import {Input, Dropdown, Col} from "antd";
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
import {setBranch,setFileAddress,findType,findCommitId} from "./Common";
import {SpinLoading} from "../../../common/loading/Loading";
import fileStore from '../store/FileStore';
import "./File.scss";
import tagStore from "../../tag/store/TagStore";
import FolderCreatePop from "./FolderCreatePop";

const File = props =>{

    const {repositoryStore,location,match} = props
    const {findRepositoryByAddress,repositoryInfo} = repositoryStore
    const {findFileTree,codeTreeData,findCloneAddress,cloneAddress,findLatelyBranchCommit,latelyBranchCommit} = fileStore
    const {findTagByName} = tagStore
    const webUrl = `${match.params.namespace}/${match.params.name}`

    const searValue = useRef(null)
    const urlInfo = match.params.branch

    const branch = setBranch(urlInfo,repositoryInfo)
    const fileAddress = setFileAddress(location,webUrl+"/code/"+urlInfo)


    //文本框搜索
    const [searInput,setSearInput] = useState(false)
    //加载
    const [isLoading,setIsLoading] = useState(true)

    //选择的代码类型 分支、tag、commit
    const [data,setData]=useState(null)

    const [triggerVisible,setTriggerVisible] = useState(false)
    //文件夹弹窗状态
    const [folderVisible,setFolderVisible]=useState(false)

    useEffect(()=>{
        setData({type:'branch',value:branch})
    },[])

    useEffect(async ()=>{
        if(repositoryInfo.name){
            // 获取文件，同时监听路由变化
            findFileTree({
                rpyId:repositoryInfo.rpyId,
                path:fileAddress[1],
                branch:branch,
                findType:findType(urlInfo)
            }).then(res=>{
                setIsLoading(false)
                res.code===500001 && props.history.push("/404")
            })

            // 获取文件地址
            findCloneAddress(repositoryInfo.rpyId)
        }
    },[repositoryInfo.name,location.pathname])


    useEffect(async ()=>{
        let branchName;
        if (urlInfo&&urlInfo.endsWith("tag")){
            const res=await findTagByName(repositoryInfo.rpyId,urlInfo.substring(0,urlInfo.length-"tag".length))
            if (res.code===0){
                branchName=res.data.commitId
            }
        }else {
            branchName=branch
        }
        findRepositoryByAddress(webUrl).then(res=>{
            // 获取最近提交信息
            findLatelyBranchCommit({
                rpyId:res.data.rpyId,
                branch:branchName,
                findCommitId:findCommitId(urlInfo)
            })
        })

    },[urlInfo,location.pathname])


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
        props.history.push(`/repository/${webUrl}${record.path}`)
    }

    /**
     * 跳转到上一个文件路由0
     * @param fileParent
     */
    const goFileParent = fileParent => {
        props.history.push(`/repository/${webUrl}/code/${urlInfo}${fileParent}`)
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
        // props.history.push(`/ide/${repositoryInfo.name}`)
    }

    //打开创建文件夹的弹窗
    const openFolderPop = () => {
        setFolderVisible(true)
        setTriggerVisible(false)
    }


    const addFileMenu = (
        <div className="file-add-menu">
            <div className="file-add-item">新建文件</div>
            <div className="file-add-item" onClick={openFolderPop}>新建文件夹</div>
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
        <div className="xcode code gittok-width">
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className="code-content">
                    <BreadcrumbContent firstItem={"Code"}/>
                    <div className="code-content-head">
                        <BreadChang
                            {...props}
                            repositoryInfo={repositoryInfo}
                            branch={urlInfo}
                            fileAddress={fileAddress}
                            type={"tree"}
                            setData={setData}
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
                                {
                                    data&&data.type==='branch'?
                                        <Dropdown overlay={addFileMenu}
                                                  trigger={["click"]}
                                                  placement={"bottomCenter"}
                                                  visible={triggerVisible}
                                                  onOpenChange={visible=>setTriggerVisible(visible)}
                                        >
                                            <PlusOutlined/>
                                        </Dropdown>:
                                        <PlusOutlined/>
                                }
                            </div>
                            <div className="code-desc">
                                <Btn title={"WEB IDE"} onClick={()=>goWebIde()}/>
                            </div>
                            <div className="code-clone">
                                <Clone cloneAddress={cloneAddress} data={data} repositoryInfo={repositoryInfo}/>
                            </div>
                        </div>
                    </div>
                    <RecentSubmitMsg {...props} latelyBranchCommit={latelyBranchCommit} repositoryInfo={repositoryInfo} webUrl={webUrl}/>
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
            </Col>
            <FolderCreatePop {...props} folderVisible={folderVisible}
                             setFolderVisible={setFolderVisible}
                             repositoryInfo={repositoryInfo}
                             data={data}
            />
        </div>
    )
}

export default inject("repositoryStore")(observer(File))
