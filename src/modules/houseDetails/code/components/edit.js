import React,{useEffect,useState} from 'react'
import {Input,Form} from 'antd'
import {MonacoEdit,MonacoPreview} from '../../../common/monaco/monaco'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import Btn from '../../../common/btn/btn'
import './edit.scss'

const Edit = props =>{

    const {match} = props

    const [form] = Form.useForm()

    const [editType,setEditType] = useState('compile')

    return(
        <div className='edit'>
            <div className='edit-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'代码'} goBack={()=>props.history.go(-1)}/>
                <div className='edit-content-head'>
                    编辑文件
                </div>
                <div className='edit-content-title'>
                    <span className='edit-title'>node</span>
                    <span className='edit-title'>/</span>
                    <span className='edit-title'>
                        <Input
                            defaultValue={'.gitignore'}
                            style={{width:'auto'}}
                        />
                    </span>
                </div>
                <div className='edit-content-editor'>
                    <div className='edit-editor-title'>
                        <span className={`editor-title-compile ${editType==='compile'?'editor-title-active':''}`}
                              onClick={()=>setEditType('compile')}
                        >编辑</span>
                        <span className={`editor-title-preview ${editType==='preview'?'editor-title-active':''}`}
                              onClick={()=>setEditType('preview')}
                        >预览</span>
                    </div>
                    <div className='edit-editor-content'>
                        {
                            editType==='compile'?
                            <MonacoEdit
                                readOnly={editType==='compile'}
                            />
                                :
                            <MonacoPreview
                                newValue={'哈哈哈哈'}
                                oldValue={'呜呜呜呜'}
                                language={'java'}
                                renderOverviewRuler={true}
                            />
                        }

                    </div>
                </div>
                <div className='edit-content-msg'>
                    <Form
                        form={form}
                        autoComplete='off'
                        layout='vertical'
                        initialValues={{name1:'更新',name2:'master'}}
                    >
                        <Form.Item label='提交信息' name='name1'>
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item label='目标分支' name='name2'>
                            <Input/>
                        </Form.Item>
                    </Form>
                </div>
                <div className='edit-content-btn'>
                    <Btn
                        title={'取消'}
                        isMar={true}
                        onClick={()=>props.history.go(-1)}
                    />
                    <Btn
                        title={'提交更改'}
                        type={'primary'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Edit
