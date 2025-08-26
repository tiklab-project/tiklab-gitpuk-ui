/**
 * 代码左侧树结构
 * @param CodLeftNav
 * @returns {JSX.Element}
 * @constructor
 */

import React, {useEffect,useState,useRef,Fragment} from "react";
import { Layout, Tooltip} from 'antd';
const { Sider } = Layout;
import "./CodLeftTree.scss"
import {renderFileIcon} from './Common';
import {
    BranchesOutlined,
    CaretDownOutlined,
    CaretRightOutlined,
    FolderOutlined,
    LeftCircleOutlined, LeftSquareOutlined, MenuFoldOutlined, MenuUnfoldOutlined, RightSquareOutlined
} from "@ant-design/icons";
import {observer} from "mobx-react";
import BranchSelect from "./BranchSelect";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
const CodLeftTree = (props) => {
    const {webUrl,completeTreeData,currentLayerTree,fileAddress,setStoreValue,findState,
        openNav,repositoryInfo,refCode,collapsed,pageType,addState}=props
    //选中的item
    const [choseItem,setChoseItem]=useState(null)

    const [width, setWidth] = useState(300); // 初始宽度
    useEffect(()=>{
        if (currentLayerTree&&fileAddress){
            let type=pageType==="code"?"tree":"blob"
            if (addState){
                const data=fileAddress.slice(1)
                setChoseItem(data+type)
            }else {
                addOpenNav(fileAddress,type)
            }
        }
        if (findState&&currentLayerTree.length){
            setStoreValue("tree",completeTreeData.concat(currentLayerTree))
        }
        setStoreValue("addState",true)
    },[currentLayerTree])

    //初始化的时候添加打开
    const addOpenNav = (value,type) => {
        const path=value.slice(1)
        const data=path.split("/")
        const result = [];
        let currentPath = '';
        for (let i = 0; i < data.length; i++) {
            if (i === 0) {
                currentPath = data[i];
            } else {
                currentPath += '/' + data[i];
            }
            result.push(currentPath);
        }
        setStoreValue("nav",result)
    }

    //打开或者关闭
    const OpenOrCloseNav = (value) => {
        const data=openNav.filter(a=>a===value)
        if (data.length){
            setStoreValue("nav",openNav.filter(a=>a!==value))
        }else {
            openNav.push(value)
        }
    }

    const choiceFile = (value) => {
        setStoreValue("findState")
        OpenOrCloseNav(value.path)
        if (!fileAddress||!fileAddress.endsWith(value.path)){
            props.history.push(`/repository/${webUrl}${value.url}`)
        }
    }


    const treeItem = (data,index) => {
        return(
            <>
                {
                    data?.items?.map(item=>{
                        return(
                            <div key={item.path}>
                                <div
                                     className={`code-left-nav  ${choseItem===item.path+item.type?" code-left-nav-choice":" "}`}
                                     style={{paddingLeft: `${index  * 15}`}}
                                     onClick={()=>choiceFile(item)}
                                >
                                    <div>
                                        {
                                            item.type==="tree" ?
                                                <div className='code-left-nav-tree'>
                                                    {
                                                        openNav.includes(item.path)?
                                                            <CaretDownOutlined style={{fontSize:11}}/>:
                                                            <CaretRightOutlined style={{fontSize:11}} />
                                                    }
                                                    <FolderOutlined/>
                                                </div>
                                                :
                                                <div className='code-left-nav-text ' >
                                                    <svg className="icon" aria-hidden="true">
                                                        <use xlinkHref={`#icon-${renderFileIcon(item.fileType)}`}/>
                                                    </svg>
                                                </div>
                                        }
                                    </div>
                                    <div className='code-left-nav-name'>{item.fileName}</div>
                                </div>
                                {
                                    (openNav.includes(item.path)&&item.type==="tree")?
                                    treeItem(completeTreeData.filter(a=>a.path.endsWith(item.path))[0],index+1):null
                                }
                            </div>
                        )
                    })
                }
            </>
        )
    }

    return(
        <Sider trigger={null}
               collapsible collapsed={collapsed}
               collapsedWidth="40"
               width={width}
               className="codeLft-aside"
               resizeable
               onResize={(newWidth) => setWidth(newWidth)}
        >

            {
                collapsed?
                    <div className='code-left-close' onClick={()=>setStoreValue("collapsed",false)}>
                        <Tooltip title='展开'>
                            <MenuUnfoldOutlined style={{fontSize:17}} />
                        </Tooltip >
                        <div className='code-left-close-text'>文件树</div>
                    </div>
                    :
                    <div className='code-left'>
                        <div className='code-left-title'>
                            <div className='code-left-title-style'>
                                <BreadcrumbContent firstItem={"Code"}/>
                                <div>
                                    <Tooltip title='收起'>
                                        <MenuFoldOutlined style={{fontSize:17}} onClick={()=>setStoreValue("collapsed",true)}/>
                                    </Tooltip >
                                </div>
                            </div>
                        </div>

                        <div className='code-left-branch'>
                            <BranchSelect
                                {...props}
                                repositoryInfo={repositoryInfo}
                                type={'code'}
                                refCode={refCode}
                            />
                        </div>
                        <div className='code-left-border'>
                            <div className='code-left-border-data'>
                                {
                                    completeTreeData?.length>0&&treeItem(completeTreeData[0],0)
                                }
                            </div>
                        </div>
                    </div>
            }
        </Sider>

    )

}
export default observer(CodLeftTree)
