import React, {useEffect, useState, useRef, Fragment} from 'react'
import {Select,Input,Table,Dropdown,Tooltip,Button,Divider} from 'antd'
import {
    SearchOutlined,
    PlusOutlined,
    CopyOutlined,
    FileOutlined,
    FolderOutlined
} from '@ant-design/icons'
import {inject,observer} from 'mobx-react'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import Btn from '../../../common/btn/btn'
import EmptyText from '../../../common/emptyText/emptyText'
import Usher from '../components/usher'
import RecentSubmitMsg from '../components/recentSubmitMsg'
import BreadChang from '../components/breadChang'
import '../components/code.scss'

const Code = props =>{

    const {houseStore,codeStore,location,match} = props

    const {houseInfo} = houseStore
    const {findFileTree,codeTreeData} = codeStore

    const searValue = useRef(null)
    const name = location.pathname.split('/index/house')
    const branch = location.pathname.split('/'+houseInfo.name+'/tree/')

    const [isEmpty,setIsEmpty] = useState(false)
    const [searInput,setSearInput] = useState(false)
    const [cloneVisible,setCloneVisible] = useState(false)

    useEffect(()=>{
        houseInfo.name && findFileTree({
            codeId:houseInfo.codeId,
            path:branch[1]?name[1]:'',
            branch:match.params.branch?match.params.branch:'master'
        })
        .then(res=>{
            res.code===500001 && props.history.push('/index/404')
            res.code===100 && setIsEmpty(true)
        })
    },[houseInfo.name,location.pathname])

    useEffect(()=>{
        if(searInput){
            searValue.current.focus()
        }
    },[searInput])

    const changBranch = value => {
        props.history.push(`/index/house/${houseInfo.name}/tree/${value}`)
    }

    const fileName = record => {
        props.history.push(`/index/house${record.path}`)
    }

    const renderFileType = text => {
        const fileType = text.substring(text.lastIndexOf('.') + 1)
        switch (fileType) {
            case 'js':
                return  <svg className='icon' aria-hidden='true'>
                            <use xlinkHref='#icon-nodejs'/>
                        </svg>
            case 'css':
                return 'css'
            case 'txt':
                return <FileOutlined />
            case 'json':
                return
            case 'xml':
                return

        }
    }

    const goWebIde = () => {
        props.history.push(`/index/ide/${houseInfo.name}`)
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'fileName',
            key: 'fileName',
            width:'60%',
            ellipsis:true,
            render:(text,record)=>{
                return <span className='code-table-name' onClick={()=>fileName(record)}>
                            <span style={{paddingRight:5}}>
                                {
                                    record.fileType==='tree' ?
                                        <FolderOutlined />
                                        :
                                        renderFileType(text)
                                }
                            </span>
                            <span>{text}</span>
                        </span>

            }
        },
        {
            title: '提交信息',
            dataIndex: 'commitMessage',
            key: 'commitMessage',
            width:'30%',
            ellipsis:true,
            render:(text,record)=> {
                return <span className='code-table-msg'>{text}</span>
            }
        },
        {
            title: '提交时间',
            dataIndex: 'commitTime',
            key:'commitTime',
            width:'10%',
            ellipsis:true,
        },
    ]

    const addFileMenu = (
        <div className='file-add-menu'>
            <div className='file-add-item'>新建文件</div>
            <div className='file-add-item'>新建文件夹</div>
            <div className='file-add-item'>上传文件</div>
        </div>
    )

    if(isEmpty){
        return <Usher/>
    }

    const cloneMenu = (
        <div className='clone-menu'>
            <div className='clone-item'>
                <div className='clone-item-title'>使用SSH克隆</div>
                <Input.Group compact>
                    <Input value='git@github.com:ant-design/ant-design.git' style={{width:'calc(100% - 50px)'}}/>
                    <Tooltip title='复制地址'>
                        <Button icon={<CopyOutlined />} />
                    </Tooltip>
                </Input.Group>
            </div>
            <div className='clone-item'>
                <div className='clone-item-title'>使用HTTP克隆</div>
                <Input.Group compact>
                    <Input value='http://172.12.1.10/devops-itdd/tiklab-xcode-ui.git' style={{width:'calc(100% - 50px)'}}/>
                    <Tooltip title='复制地址'>
                        <Button icon={<CopyOutlined />} />
                    </Tooltip>
                </Input.Group>
            </div>
            <div className='clone-download'>
                <div className='clone-item-download'>下载ZIP</div>
                <Divider type='vertical' />
                <div className='clone-item-download'>下载TAR</div>
            </div>
        </div>
    )

    return(
        <div className='code'>
            <div className='code-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'代码'}/>
                <div className='code-content-head'>
                    <BreadChang
                        {...props}
                        houseInfo={houseInfo}
                        type={'tree'}
                    />
                    <div className='code-head-right'>
                        {
                            searInput ?
                                <div className='code-search-input'>
                                    <Input
                                        allowClear
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
                            <Dropdown overlay={addFileMenu} trigger={['click']} placement={'bottomRight'}>
                                <PlusOutlined/>
                            </Dropdown>
                        </div>
                        <div className='code-desc'>
                            <Btn
                                title={'WEB IDE'}
                                onClick={()=>goWebIde()}
                            />
                        </div>
                        <div className='code-clone'>
                            <Dropdown
                                overlay={cloneMenu}
                                trigger={['click']}
                                placement={'bottomRight'}
                                visible={cloneVisible}
                                onVisibleChange={visible=>setCloneVisible(visible)}
                            >
                                <Btn
                                    title={'克隆'}
                                    type={'primary'}
                                    onClick={()=>setCloneVisible(!cloneVisible)}
                                />
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <RecentSubmitMsg
                    {...props}
                    houseInfo={houseInfo}
                />
                <div className='code-content-tables'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={codeTreeData}
                        rowKey={record=>record.fileName}
                        pagination={false}
                        locale={{emptyText: <EmptyText/>}}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('houseStore','codeStore')(observer(Code))
