/**
 * @name: CommitsTree
 * @author: limingliang
 * @date: 2025-06-30 14:30
 * @description：提交代码树
 * @update: 2025-06-30 14:30
 */
import React, {useEffect,useState,useRef,Fragment} from "react";
import { Layout, Tooltip} from 'antd';
const { Sider } = Layout;
import "./CommitsTree.scss"
import BreadcrumbContent from "../breadcrumb/Breadcrumb";
import fileTreeImg from "../../assets/images/img/file-tree.png";
import {
    CaretDownOutlined, CaretRightOutlined,
    CheckSquareOutlined, FileTextOutlined,
    FolderOutlined,
    MinusSquareOutlined,
    PlusSquareOutlined, SaveOutlined
} from "@ant-design/icons";
import {observer} from "mobx-react";
const CommitsTree = (props) => {
    const {commitDiff,findCommitFileData,setNavType,navType,borderPath,setBorderPath,type,title}=props
    const textRef = useRef(null);

    //只有一条数据是否有文件夹等级
    const [onLeve,setOnLeve]=useState(false)
    const [diffData,setDiffData]=useState(null)


    const [value,setValue]=useState(null)
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [openNav,setOpenNav]=useState([])

    const [width, setWidth] = useState(320); // 初始宽度

    const [initStep,setInitStep]=useState(3)

    useEffect(() => {

        const checkOverflow = () => {
            if (textRef.current) {
                const  width  = textRef.current.getBoundingClientRect(); // 获取元素的宽度
                const isOverflowing = textRef.current.scrollWidth > textRef.current.clientWidth;
                setIsOverflowing(isOverflowing);
            }
        };

        // 延迟检查，确保样式已应用
        const timer = setTimeout(checkOverflow, 0);
        return () => clearTimeout(timer);
    }, [value]);


    const handleMouseEnter = (value) => {
        setValue(value)
    }


    const clickNavType = (value) => {
        setNavType(value)
        setBorderPath(null)
    }

    const onClickNav = (item) => {
      if (item?.fileType==="tree"){
          if (openNav.includes(item.folderPath) ){
              const data=openNav.filter(a=>a!==item.folderPath)
              setOpenNav(data)
          }else {
              setOpenNav([...openNav,item.folderPath])
          }
      }else {
          setNavType("tree")
          findCommitFileData(item.folderPath)
      }
    }



    //文件的树
    const fileTree = (item,index) => {
        return(
            <Fragment>
                {

                    <div className={`commits-tree-left-nav ${ item.fileType==="file"&&item.folderPath ===borderPath?" commits-tree-choice":''}`}
                         style={{paddingLeft: `${index  * 16}`}}
                         onClick={()=>onClickNav(item)}
                    >
                        {
                            item.fileType==="file"?
                                fileTreeName(item,index):
                                <>
                                    {
                                        index<3?
                                            !openNav.includes(item.folderPath)?
                                                <CaretDownOutlined style={{fontSize:11}}/>:
                                                <CaretRightOutlined style={{fontSize:11}} />:

                                            openNav.includes(item.folderPath)?
                                                <CaretDownOutlined style={{fontSize:11}}/>:
                                                <CaretRightOutlined style={{fontSize:11}} />

                                    }
                                    <FolderOutlined style={{fontSize:16}}/>
                                    <div className='commits-tree-left-nav-name'>
                                        {item.fileName}
                                    </div>
                                    <span className='commits-tree-nav-right'>{item.fileNum}</span>
                                </>
                        }
                    </div>
                /*{
                    item.fileType==="tree"&&
                    <div className='commits-tree-nav-right'>{item.fileNum}</div>
                }*/
                }
                {
                    index<3?
                        (item.fileDiffTreeList?.length&&!openNav.includes(item.folderPath))?
                            item.fileDiffTreeList.map((item1=>fileTree(item1,index+1))):null:

                        (item.fileDiffTreeList?.length&&openNav.includes(item.folderPath))?
                            item.fileDiffTreeList.map((item1=>fileTree(item1,index+1))):null

                }
            </Fragment>
        )
    }

    //文件文件
    const fileTreeName = (item) => {
      return  < >
          {
              item?.type==='ADD'&&
              <PlusSquareOutlined  className={"icon-add icon-left"}/>||
              item?.type==='DELETE'&&
              <MinusSquareOutlined className={"icon-delete icon-left"}/>||
              item?.type==='MODIFY'&&
              <CheckSquareOutlined  className={"icon-left"}/>||
              item?.type==='RENAME'&&
              <CheckSquareOutlined  className={"icon-left"}/>||
              item?.type==='COPY'&&
              <CheckSquareOutlined  className={"icon-left"}/>
          }
          <Tooltip title={item.fileName}>
              <div className={`commits-tree-left-nav-name`}
                   ref={textRef}
                   onMouseEnter={() => handleMouseEnter(item.fileName)}
              >
                  {item.fileName}
              </div>
           </Tooltip>
      </>
    }


    return(
        <Sider trigger={null} collapsible
               collapsedWidth="40"
               width={width}
               resizeable
               onResize={(newWidth) => setWidth(newWidth)}
               className="commits-tree"  >
            <div className='commits-tree-left-style' >
                <div className='commits-tree-left-title-bor'>
                    <div className='commits-tree-left-title'>
                        <BreadcrumbContent firstItem={title} goBack={()=>props.history.go(-1)}/>
                    </div>

                </div>

                <div className='commits-tree-left-cont' >
                    {
                        type==='merge'?
                            <>
                                <div className={`commits-tree-cont-nav ${navType==='info'&&" opt-tree-title-nav"}`}  onClick={()=>clickNavType("info")}>
                                    <FileTextOutlined className={"iconfont"}/>
                                    <div>基本信息</div>
                                </div>
                                <div className={`commits-tree-cont-nav ${navType==='commit'&&" opt-tree-title-nav"}`}  onClick={()=>clickNavType("commit")}>
                                    <SaveOutlined className={"iconfont"} />
                                    <div>提交记录</div>
                                </div>
                            </>:
                            <div className={`commits-tree-cont-nav ${navType==='info'&&" opt-tree-title-nav"}`}  onClick={()=>clickNavType("info")}>
                                <SaveOutlined className={"iconfont"} />
                                <div>提交信息</div>
                            </div>
                    }
                </div>

                <div className='commits-tree'>
                    <div className='commits-tree-title-nav' >
                        <img  src={fileTreeImg}  style={{width:20,height:20}}/>
                        <div>改动文件</div>
                    </div>
                    <div className='commits-tree-left'>
                        <div className='commits-tree-left-data'>
                            {
                                commitDiff&&commitDiff.diffTreeList&&commitDiff.diffTreeList.map(((item,index)=>{
                                    return(
                                        <div>
                                            {
                                                fileTree(item,1)
                                            }
                                        </div>
                                    )}))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Sider>
    )
}
export default observer(CommitsTree)
