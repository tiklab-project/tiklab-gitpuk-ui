/**
 * 文件变动信息
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useEffect} from 'react';
import {Form, Input, Tooltip} from "antd";
import {ArrowRightOutlined, CaretDownOutlined, CaretRightOutlined, CopyOutlined} from "@ant-design/icons";
import {copy} from "../../common/client/Client";
import Btn from "../../common/btn/Btn";
import {commitU4} from "../../repository/file/components/Common";
import {SpinLoading} from "../../common/loading/Loading";
import commitsStore from "../../repository/commits/store/CommitsStore";
import DetailsDiff from "../../common/diffData/DetailsDiff";
const MergeAddFile = (props) => {
    const {webUrl,repositoryInfo,originBranch,targetBranch,mergeId}=props

    const {findDiffFileByBranchs,findDiffFileByMergeId,findDiffBranchFileDetails,findCommitLineFile} = commitsStore

    // 展开的树
    const [expandedTree,setExpandedTree] = useState([])
    // diff文件展开加载状态
    const [expandVisible,setExpandVisible] = useState('')

    //diff文件
    const [commitDiff,setCommitDiff]=useState(null)
    // diff文件列表
    const [commitDiffList,setCommitDiffList] = useState([])


    useEffect(()=>{
        getDiffBranchFile()
    },[])



    //获取两个分支的不同文件
    const getDiffBranchFile = () => {
        if (mergeId){
            findDiffFileByMergeId(mergeId).then(res=>{
                if (res.code===0){
                    setCommitDiff(res.data)
                    res.data&&setCommitDiffList(res.data.diffList)
                }
            })

        }else {
            findDiffFileByBranchs({
                rpyId:repositoryInfo.rpyId,
                branch:originBranch,
                targetBranch:targetBranch,
            }).then(res=>{
                if (res.code===0){
                    setCommitDiff(res.data)
                    res.data&&setCommitDiffList(res.data.diffList)
                }
            })
        }
    }



    const isExpandedTree = key => expandedTree.some(item => item === key)

    /**
     * 文件标题显示
     * @param item
     * @returns {*}
     */
    const filePath = item => item.type==='ADD'?item.newFilePath:item.oldFilePath

    /**
     * 文件展开和闭合
     * @param item
     */
    const setOpenOrClose = item => {
        const path = filePath(item)
        if (isExpandedTree(path)) {
            setExpandedTree(expandedTree.filter(item => item!==path))
        } else {
            setExpandedTree(expandedTree.concat(path))
        }
        if(!item.content){
            setExpandVisible(path)
            // 获取文件内容
            findDiffBranchFileDetails({
                rpyId:repositoryInfo.rpyId,
                branch:originBranch,
                targetBranch:targetBranch,
                filePath:path
            }).then(res=>{
                if(res.code===0){
                    setFileContent(path).content = res.data
                    setCommitDiffList([...commitDiffList])
                }
                setExpandVisible('')
            })
        }
    }

    /**
     * 查看文件路由跳转
     * @param type
     * @param item
     */
    const findFile = (item) => {
        props.history.push(`/repository/${webUrl}/blob/${commitId+commitU4}/${item.newFilePath}`)
    }

    /**
     * 文件内容，查看全部操作
     * @param content
     * @param item
     * @param index
     */
    const expand = (content,item,index) => {
        const path = filePath(content)
        const last = content && content.content[index-1]
        const next = content && content.content[index+1]
        let count = 20 , oldStn = item.left, newStn = item.right
        if(last && next){
            count = next.right - last.right
            oldStn = last.left
            newStn = last.right
        }
        if(!last){
            oldStn = next.left
            newStn = next.right
        }
        // 文件内容
        findCommitLineFile({
            rpyId:repositoryInfo.rpyId,
            branch:originBranch,
            path:content.newFilePath,
            count:count>20 ? 20 :count,
            oldStn:oldStn,
            newStn:newStn,
            queryType:"branch",
            direction:index > 0 ? 'down':'up',
        }).then(res=>{
            if(res.code===0){
                let arr = []
                res.data.map(item=> {
                    arr.push(Object.assign({},item,{expand: true}))
                })
                setFileContent(path).content.splice(index>0?index:index+1,0,...arr)
                setCommitDiffList([...commitDiffList])
            }
        })
    }

    /**
     * 获取符合要求的值
     * @param path
     * @returns {*}
     */
    const setFileContent = path => {
        let a
        commitDiffList && commitDiffList.map(list=>{
            if(filePath(list)===path){
                a = list
            }
        })
        return a
    }

    return(
        <div className='merge-add-table file-info'>
            <div className='file-info-title'>
                <div> {commitDiff && commitDiff.length}文件被修改</div>
                （ <div className='contrast-affected-num'>
                增加行
                <span className='num-add'>+{commitDiff && commitDiff.addLine}</span>
                减少行
                <span className='num-reduce'>-{commitDiff && commitDiff.deleteLine}</span>
            </div> ）
            </div>
            <div className='file-info-content'>
                {
                    commitDiffList?.length>0 && commitDiffList.map((item,index)=>{
                        return(
                            <div key={index}>
                                <div className='file-info-head'>
                                    <div className='file-info-head-icon' onClick={()=>setOpenOrClose(item)}>
                                        {
                                            isExpandedTree(filePath(item))? <CaretDownOutlined/> : <CaretRightOutlined/>
                                        }
                                    </div>
                                    <div className='file-info-head-file'>
                                        <span className='file-info-head-title'>
                                              <Tooltip placement="top" title={filePath(item)} >
                                                     { filePath(item) }
                                              </Tooltip>
                                        </span>
                                        {
                                            item.type==='MODIFY' &&
                                                 <span className='file-info-title-type'>
                                                    {item.oldFileType} <ArrowRightOutlined /> {item.newFileType}
                                                </span>
                                        }
                                        <span className='file-info-title-icon' onClick={()=>copy(filePath(item))}>
                                            <CopyOutlined />
                                         </span>
                                    </div>
                                    <Btn type={'common'} title={'查看文件'} onClick={()=>findFile('blob',item)}/>
                                </div>
                                <div className='item-content' style={isExpandedTree(filePath(item))?{display:'block'}:{display:'none'}}>
                                    {
                                        expandVisible===filePath(item)? <SpinLoading type='list'/> :
                                            <DetailsDiff content={item} expand={expand} />
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default MergeAddFile
