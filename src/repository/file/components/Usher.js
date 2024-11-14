import React,{useEffect,useState} from 'react';
import {Col, Input} from 'antd';
import {CopyOutlined} from '@ant-design/icons';
import {observer} from 'mobx-react';
import {getUser} from 'tiklab-core-ui';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import {copy} from '../../../common/client/Client';
import './Usher.scss';

/**
 * 空仓库
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Usher = props =>{

    const {repositoryInfo,fileStore} = props

    const {cloneAddress} = fileStore

    //地址类型
    const [urlPrefix,setUrlPrefix] = useState('http')

    /**
     * 初始化readme文件
     */
    const readme = () => {

    }

    return (
        <div className='xcode page-width usher'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='usher-content '>
                    <BreadcrumbContent firstItem={'Code'}/>
                    <div className='usher-segment'>
                        <div className='usher-segment-url'>
                            <div className='usher-title'>快速设置--如果你知道该怎么操作，直接使用下面的地址</div>
                            <div className='usher-url'>
                                <div className='usher-url-switch'>
                                    <div className={`url-switch-prefix ${urlPrefix==='http'?'prefix-active':''}`}
                                         onClick={()=>setUrlPrefix('http')}
                                    >HTTP</div>
                                    <div className={`url-switch-prefix ${urlPrefix==='SSH'?'prefix-active':''}`}
                                         onClick={()=>setUrlPrefix('SSH')}
                                    >SSH</div>
                                </div>
                                <div className='usher-url-input'>
                                    <Input disabled
                                           value={urlPrefix==='SSH'? cloneAddress && cloneAddress.sshaddress : cloneAddress.httpAddress}
                                    />
                                    <div className='url-input-icon'
                                         onClick={()=>copy(urlPrefix==='SSH'? cloneAddress && cloneAddress.sshaddress :cloneAddress.httpAddress)}
                                    ><CopyOutlined/></div>
                                </div>
                            </div>
                            <div className='usher-suggest'>
                                建议所有的git仓库都有一个
                                <span className='usher-suggest-item'>README</span>，
                                <span className='usher-suggest-item'>LICENSE</span>，
                                <span className='usher-suggest-item'>.gitignore</span>
                                文件
                            </div>
                            <div className='usher-readme' onClick={()=>readme()}>
                                初始化readme文件
                            </div>
                        </div>
                        <div className='usher-segment-course'>
                            <div className='usher-title'>简易的命令入门教程</div>
                            <div className='usher-course-item'>
                                <div className='course-item-name'>Git全局设置：</div>
                                <div className='course-item-content'>
                                    <div>git config --global user.name  "{getUser().name}"</div>
                                    <div>git config --global user.email  "{getUser().email?getUser().email:' '}"</div>
                                </div>
                            </div>
                            <div className='usher-course-item'>
                                <div className='course-item-name'>创建 git 仓库：</div>
                                <div className='course-item-content'>
                                    <div>mkdir {repositoryInfo && repositoryInfo.name}</div>
                                    <div>cd {repositoryInfo && repositoryInfo.name}</div>
                                    <div>git init</div>
                                    <div>touch README.md</div>
                                    <div>git add .</div>
                                    <div>git commit -m "first commit"</div>
                                    <div>git remote add origin {urlPrefix==='SSH'? cloneAddress && cloneAddress.sshaddress :cloneAddress.httpAddress}
                                    </div>
                                    <div>git push -u origin master</div>
                                </div>
                            </div>
                            <div className='usher-course-item'>
                                <div className='course-item-name'>已有仓库?</div>
                                <div className='course-item-content'>
                                    <div>cd {repositoryInfo && repositoryInfo.name}</div>
                                    <div>git add .</div>
                                    <div>git commit -m "first commit"</div>
                                    <div>git push -u origin master</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </div>
    )
}

export default observer(Usher)
