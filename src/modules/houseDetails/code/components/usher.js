import React,{useEffect,useState} from 'react'
import {Input} from 'antd'
import {CopyOutlined} from '@ant-design/icons'
import {observer} from 'mobx-react'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import {copy} from '../../../common/client/client'
import './usher.scss'

/*
    仓库为空
*/
const Usher = props =>{

    const {houseInfo,codeStore} = props

    const {cloneAddress} = codeStore

    const courseList = [
        {
            name:'Git全局设置：',
            content:'git config --global user.name "高梦园"\n' +
                'git config --global user.email "2780288581@qq.com"'
        },
        {
            name:'创建 git 仓库：',
            content:'mkdir try\n' +
                'cd try\n' +
                'git init \n' +
                'touch README.md\n' +
                'git add README.md\n' +
                'git commit -m "first commit"\n' +
                'git remote add origin https://gitee.com/gaomengyuana/try.git\n' +
                'git push -u origin "master"'
        },
        {
            name:'已有仓库?',
            content:'cd existing_git_repo\n' +
                'git remote add origin https://gitee.com/gaomengyuana/try.git\n' +
                'git push -u origin "master"'
        },

    ]

    const [urlPrefix,setUrlPrefix] = useState('http')

    return (
        <div className='usher'>
            <div className='usher-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'代码'} secondItem={'node'}/>
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
                                <Input
                                    disabled
                                    value={urlPrefix==='SSH'? cloneAddress && cloneAddress.sshaddress : cloneAddress && cloneAddress.httpAddress}
                                />
                                <div className='url-input-icon'
                                     onClick={()=>copy(urlPrefix==='SSH'? cloneAddress && cloneAddress.sshaddress : cloneAddress && cloneAddress.httpAddress)}
                                >
                                    <CopyOutlined/>
                                </div>
                            </div>
                        </div>
                        <div className='usher-suggest'>
                            我们清冽建议所有的git仓库都有一个
                            <span className='usher-suggest-item'>README</span>，
                            <span className='usher-suggest-item'>LICENSE</span>，
                            <span className='usher-suggest-item'>.gitignore</span>
                            文件
                        </div>
                        <div className='usher-readme'>
                            初始化readme文件
                        </div>
                    </div>
                    <div className='usher-segment-course'>
                        <div className='usher-title'>简易的命令入门教程</div>
                        {
                            courseList.map(item=>{
                                return (
                                    <div key={item.name} className='usher-course-item'>
                                        <div className='course-item-name'>{item.name}</div>
                                        <div className='course-item-content'>{item.content}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Usher)
