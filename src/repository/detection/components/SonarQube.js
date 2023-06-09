/**
 * @name: SonarQube
 * @author: limingliang
 * @date: 2023-05-22 14:30
 * @description：SonarQube 代码质量检测
 * @update: 2023-05-22 14:30
 */
import React,{useState,useEffect} from 'react';
import {inject, observer} from "mobx-react";
import "./SonarQube.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import InfoSetting from "./InfoSetting";
import {Button, Spin} from "antd";
import {findCommitId, setBranch, setFileAddress} from "../../file/components/Common";
const SonarQube = (props) => {
    const {deployStore,match,fileStore,repositoryStore,codeScanStore} = props
    const {repositoryInfo,webUrl} = repositoryStore
    const {findFileTree,codeTreeData}=fileStore
    const {codeScanExec,findScanState,createCodeScan,findScanResult,scanResult,findCodeScanByRpyId,codeScan}=codeScanStore
    const {findDeployServerList,deployServerList,findDeployEnvList,deployEnvList,fresh} = deployStore

    const urlInfo = match.params.branch
    const branch = setBranch(urlInfo,repositoryInfo)
    const fileAddress = setFileAddress(location,webUrl+"/tree/"+urlInfo)
    const [addVisible,setAddVisible] = useState(false)
    const [spinningState,setSpinningState]=useState(false)


    useEffect( ()=>{
        findDeployEnvList()
        findScanResult(repositoryInfo.rpyId,"190bcb9ab2f9")
        findDeployServerList("sonar")
        findCodeScanByRpyId(repositoryInfo.rpyId)
    },[fresh])

    useEffect( ()=>{
        findFileTree({
            rpyId:repositoryInfo.rpyId,
            path:fileAddress[1],
            branch:branch,
            findCommitId:findCommitId(urlInfo)
        })
    },[])



    const codeExec = () => {

       codeScanExec(repositoryInfo.rpyId)
        //定时任务
        let timer=setInterval(()=>{
           findScanState(repositoryInfo.rpyId).then(res=>{
              if (res.code===0){
                  switch (res.data.runState){
                      case "true":
                          clearInterval(timer)
                          break
                      case "false":
                          clearInterval(timer)
                          break
                  }
              }else {
                  clearInterval(timer)
              }
          })
        },2000)
    }



    const goSonar =async (type) => {
        switch (type){
            case "details":
                window.open(`${codeScan?.deployServer.serverAddress}/project/issues?id=${match.params.name}&resolved=false`)
                break
            case "bugs":
                window.open(`${codeScan?.deployServer.serverAddress}/project/issues?resolved=false&types=BUG&id=${match.params.name}`)
                break
            case "smells":
                window.open(`${codeScan?.deployServer.serverAddress}/project/issues?resolved=false&types=CODE_SMELL&id=${match.params.name}`)
                break
            case "vu":
                window.open(`${codeScan?.deployServer.serverAddress}/project/issues?resolved=false&types=VULNERABILITY&id=${match.params.name}`)
                break
        }
    }
    return(
        <div className='sonar'>
            <Spin  spinning={spinningState}>
                <div className='sonar-content xcode-home-limited '>
                    {codeTreeData?
                        <>
                            <div className='sonar-content-top'>
                                <BreadcrumbContent firstItem={`${match.params.name}检测任务`}/>
                                <div className={"sonar-content-but"}>
                                    <div className='apart'>
                                        <Btn
                                            type={'common'}
                                            title={'设置'}
                                            onClick={()=>setAddVisible(true)}
                                        />
                                    </div>
                                    <Btn
                                        type={'primary'}
                                        title={'运行检测'}
                                        onClick={ codeExec}
                                    />
                                </div>
                            </div>

                            <div className='sonar-content-data'>
                                 <div className={"result " + (scanResult?.scanStatus==='OK'&&' result-success '||
                                     scanResult?.scanStatus==="false"&&" result-false"||scanResult?.scanStatus==="not"&&" result-not")}>
                                    <div className='result-text'>
                                        <div >检测结果：</div>
                                        <div className='result-text-top'>
                                            {scanResult?.scanStatus==="OK"&&"通过"||
                                             scanResult?.scanStatus==="false"&&"失败"||
                                             scanResult?.scanStatus==="not"&&"未连接"
                                                }
                                        </div>
                                    </div>
                                </div>
                                <div className='result-detail'>
                                    <div className='result-detail-border '>
                                        <div className='result-detail-nav'>
                                            bugs数量：
                                            <span className='result-detail-nav-text' onClick={()=>goSonar("bugs")} >
                                                {scanResult?.bugs}
                                            </span>
                                        </div>
                                        <div className='result-detail-nav'>代码异常数：
                                            <span className='result-detail-nav-text'  onClick={()=>goSonar("smells")}>
                                               {scanResult?.codeSmells}
                                            </span>
                                        </div>
                                        <div className='result-detail-nav'>安全漏洞：
                                            <span className='result-detail-nav-text' onClick={()=>goSonar("vu")}>
                                              {scanResult?.vulnerabilities}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='sonar-content-button'>
                                        <Button size={'large'} onClick={()=>goSonar("details")}  >查看详情</Button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>日志：</div>
                                <div className='sonar-content-log'>

                                </div>
                            </div>
                        </>
                        :
                        <div >
                            <BreadcrumbContent firstItem={`代码检测`}/>
                            <div className='not-data-desc'>
                                <div className='desc-title'>sonar代码检测</div>
                                <div>该代码仓库为提交文件,请先提交文件在使用该功能</div>
                            </div>
                        </div>
                    }
                </div>
            </Spin>
            <InfoSetting
                addVisible={addVisible}
                setAddVisible={setAddVisible}
                repositoryName={match.params.name}
                deployServerList={deployServerList}
                deployEnvList={deployEnvList}
                createCodeScan={createCodeScan}
                repositoryInfo={repositoryInfo}
                codeScan={codeScan}
            />
        </div>
    )


}
export default inject('repositoryStore','deployStore','fileStore','codeScanStore')(observer(SonarQube))
