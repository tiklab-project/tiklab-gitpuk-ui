import React, {useEffect,useState,useRef,} from "react";
import {Input, Dropdown, Col, Tooltip} from "antd";
import {
    SearchOutlined,
    PlusOutlined,
    FolderOutlined, ForkOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import EmptyText from "../../../common/emptyText/EmptyText";
import Usher from "./Usher";
import RecentSubmitMsg from "./RecentSubmitMsg";
import BreadChang from "./BreadChang";
import Clone from "./Clone";
import {findRefCode,setFileAddress} from "./Common";
import {SpinLoading} from "../../../common/loading/Loading";
import fileStore from '../store/FileStore';
import "./File.scss";
import tagStore from "../../tag/store/TagStore";
import CreateFolderPop from "./CreateFolderPop";
import CreateFilePop from "./CreateFilePop";
import FileSearchDrop from "./FileSearchDrop";
import Btn from "../../../common/btn/Btn";
import ForkChoicePop from "../../fork/components/ForkChoicePop";

const File = props =>{

    const {repositoryStore,location,match} = props
    const {repositoryInfo} = repositoryStore
    const {findFileTree,codeTreeData,findCloneAddress,cloneAddress,findLatelyBranchCommit,latelyBranchCommit
        ,findBareAllFile,findRefCodeType} = fileStore
    const webUrl = `${match.params.namespace}/${match.params.name}`

    const searValue = useRef(null)
    const urlInfo = match.params.branch

    //refCode
    const refCode = findRefCode(location,repositoryInfo,"code")

    const fileAddress = setFileAddress(location,webUrl+"/code/"+urlInfo)

    //文本框搜索
    const [searInput,setSearInput] = useState(false)
    //加载
    const [isLoading,setIsLoading] = useState(true)

    const [triggerVisible,setTriggerVisible] = useState(false)
    //文件夹弹窗状态
    const [folderVisible,setFolderVisible]=useState(false)

    //文件弹窗状态
    const [fileVisible,setFileVisible]=useState(false)

    //裸仓库的所有文件
    const [fileList,setFileList]=useState([])
    const [searFileList,setSearchFileList]=useState([])
    //下拉框状态
    const [dropDownVisible,setDropDownVisible] = useState(false)

    const [forkVisible,setForkVisible]=useState(false)

    // 代码类型branch、tag、commit
    const [refCodeType,setRefCodeType]=useState('branch')

    //localStorage.removeItem(webUrl)

    const a=localStorage.getItem(webUrl)

    useEffect( async ()=>{
        if(repositoryInfo.name){
            //根据路径总的code查询code类型
             getBareRepoType()
            // 获取文件地址
            findCloneAddress(repositoryInfo.rpyId)
        }
    },[repositoryInfo.name,location.pathname])


    useEffect(()=>{
        // 监听文本框聚焦
        if(searInput){
            searValue.current.focus()
        }
    },[searInput])

    //查询裸仓库的类型
    const getBareRepoType=()=>{
        const match = location.pathname.match(/code\/([^\/]+)/);
        if (match){
            const code=match[1]
            findRefCodeType(repositoryInfo.rpyId,code).then(res=>{
                if (res.code===0){
                    setRefCodeType(res.data)
                    //查询文件树
                    getFileTree(res.data)
                    //查询最新提交
                    getNewCommit(res.data)
                }
            })
        }else {
            getFileTree("branch")
            getNewCommit("branch")
        }
    }

    //获取仓库文件树
    const getFileTree = (codeType) => {
        // 获取文件，同时监听路由变化
        findFileTree({
            rpyId:repositoryInfo.rpyId,
            path:fileAddress[1],
            refCode:refCode,
            refCodeType:codeType
        }).then(res=>{
            setIsLoading(false)
            res.code===500001 && props.history.push("/404")
        })
    }

    //获取最近的提交
    const getNewCommit = (refCodeType) => {
        // 获取最近提交信息
        findLatelyBranchCommit({
            rpyId:repositoryInfo.rpyId,
            refCode:refCode,
            refCodeType:refCodeType
        })
    }

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
    const chanVisible = (value) => {
        setTriggerVisible(value)
    }


    //打开创建文件夹的弹窗
    const openFolderPop = () => {
        setFolderVisible(true)
        setTriggerVisible(false)
    }

    //打开创建文件的弹窗
    const openFilePop = () => {
        setFileVisible(true)
        setTriggerVisible(false)
    }


    //打开查询框
    const openInput = () => {
        findBareAllFile({
            rpyId:repositoryInfo.rpyId,
            refCode:refCode,
            refCodeType:refCodeType
        }).then(res=>{
            if (res.code===0){
                setFileList(res.data)
            }
        })
        setSearInput(true)
    }


    //搜索
    const onChangeSearch = (e) => {
        const searchName=e.target.value
        let files=[]
        fileList.map(item=>{
            const fileName=item.slice(item.lastIndexOf("/")+1)
           if (fileName.includes(searchName)) {
               files.push(item)
           }
        })
        setSearchFileList(files)
    }

    const cuteDropDownVisible = (value) => {
        setDropDownVisible(value)
       if (!value){
           setSearchFileList(null)
       }

    }

    //创建文件 下拉
    const addFileMenu = (
        <div className="file-add-menu">
            <div className="file-add-item" onClick={openFilePop} >新建文件</div>
            <div className="file-add-item" onClick={openFolderPop}>新建文件夹</div>
        {/*    <div className="file-add-item">上传文件</div>*/}
        </div>
    )

    //打开fork弹窗
    const openFork = () => {
      setForkVisible(true)
    }

    if(!codeTreeData){
        return  <Usher
                    repositoryInfo={repositoryInfo}
                    fileStore={fileStore}
                />
    }

    //仓库文件
    const renderCode = item => {
        return (
            <div key={item.fileName} className="code-data-item">
                <div className='code-item-fileName'>
                    <div className='code-item-fileName-text' onClick={()=>goFileChild(item)}>
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
                    {
                        item.lfs&& <div className='code-item-fileName-fls'>LFS</div>
                    }
                </div>

                <div className="code-item-commitMessage">{item.commitMessage}</div>
                <div className="code-item-commitTime">{item.commitTime}</div>
            </div>
        )
    }

    return(
        <div className="xcode code page-width">
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
                            refCode={refCode}
                        />
                        <div className="code-head-right">
                            {
                                searInput ?
                                    <div className="code-search-input">
                                        <Dropdown
                                            overlay={<FileSearchDrop
                                                setDropDownVisible={setDropDownVisible}
                                                searFileList={searFileList}
                                            />}
                                            trigger={['click']}
                                            placement={'bottomLeft'}
                                            visible={dropDownVisible}
                                            onVisibleChange={visible=>cuteDropDownVisible(visible)}
                                            getPopupContainer={e => e.parentElement}
                                        >
                                            <Input
                                                ref={searValue}
                                                placeholder="文件名称"
                                                onChange={onChangeSearch}
                                                prefix={<SearchOutlined />}
                                                onBlur={()=>setSearInput(false)}
                                                style={{width:400}}
                                            />
                                        </Dropdown>

                                    </div>
                                    :
                                    <div className="code-search">
                                        <SearchOutlined onClick={openInput}/>
                                    </div>
                            }
                            <div className="code-file-add">
                                {
                                    refCodeType==='branch'?
                                        <Dropdown overlay={addFileMenu}
                                                  trigger={["click"]}
                                                  placement={"bottomCenter"}
                                                  getPopupContainer={e => e.parentElement}
                                                  visible={triggerVisible}
                                                  onVisibleChange={visible=>chanVisible(visible)}
                                        >
                                            <PlusOutlined/>
                                        </Dropdown>:
                                        <Tooltip placement="topRight" title={"只支持分支视图操作"}>
                                            <PlusOutlined className='not-disabled'/>
                                        </Tooltip>
                                }
                            </div>
                            <div className="code-desc">
                                <Btn  title={"Fork"} onClick={openFork}/>
                            </div>
                            {/*<div className="code-desc">
                                <Btn title={"WEB IDE"} onClick={()=>goWebIde()}/>
                            </div>*/}
                            <div className="code-clone">
                                <Clone cloneAddress={cloneAddress}
                                       repositoryInfo={repositoryInfo}
                                       refCode={refCode}
                                       refCodeType={refCodeType}
                                      />
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
            <CreateFolderPop {...props} folderVisible={folderVisible}
                             setFolderVisible={setFolderVisible}
                             branch={refCode}
                             webUrl={webUrl}
                             folderPath={`${repositoryInfo.name}${fileAddress[1]?fileAddress[1]:''}`}
            />
            <CreateFilePop {...props} fileVisible={fileVisible}
                             setFileVisible={setFileVisible}
                             branch={refCode}
                             webUrl={webUrl}
                             folderPath={`${repositoryInfo.name}${fileAddress[1]?fileAddress[1]:''}`}
            />
            <ForkChoicePop {...props} visible={forkVisible}
                           setVisible={setForkVisible}
                           repository={repositoryInfo}

            />
        </div>
    )
}

export default inject("repositoryStore")(observer(File))
