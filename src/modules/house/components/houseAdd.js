import React,{useState} from 'react'
import {Modal,Steps,Form,Input,Select,Switch,Checkbox,Row,Col} from 'antd'
import Btn from '../../common/btn/btn'
import HouseUser from './houseUser'
import HousePower from './housePower'
import './houseAdd.scss'

const HouseAdd = props =>{

    const {addHouseVisible,setAddHouseVisible,createCode,groupList} = props

    const [form] = Form.useForm()

    const [addType,setAddType] = useState(1)
    const [powerType,setPowerType] = useState(1)
    const [yUserList,setYUserList] = useState([])
    const [nUserList,setNUserList] = useState([])
    const [member,setMember] = useState([])
    const [codeGroup,setCodeGroup] = useState(null)

    const onOk = value => {
        createCode({
            ...value,
            codeGroup:{groupId:codeGroup}
        }).then(res=>{
            res.code===0 && props.history.push(`/index/house/${value.name}/tree`)
        })
    }

    const onValuesChange = value => {
        if(value.name){
            form.setFieldsValue({
                address:value.name
            })
        }
    }

    const newStoreHouse = (
        <Form
            form={form}
            autoComplete='off'
            layout='vertical'
            initialValues={{group:1}}
            onValuesChange={onValuesChange}
        >
            <Form.Item label='仓库名称' name='name'
                       rules={[
                           {required:true,message:'仓库名称不能为空'},
                           {max:30,message:'请输入1~31位以内的名称'},
                           {
                               pattern: /^[a-zA-Z0-9_]([a-zA-Z0-9_\-.])*$/,
                               message: "只能包含字母和数字、 '_'、 '.'和'-'，且只能以字母、数字或'_'开头",
                           },
                       ]}
            >
                <Input bordered={false} style={{background:'#fff'}}/>
            </Form.Item>
            <div className='storehouseAddModal-path'>
                <Form.Item label={<span style={{opacity:0}}>归属</span>}>
                    <Input
                        bordered={false}
                        style={{background:'#fff'}}
                        disabled={true}
                        value={'http://xcode/tiklab.net'}
                    />
                </Form.Item>
                <Form.Item label={<span style={{opacity:0}}>归属</span>}>
                    <Select bordered={false} style={{background:'#fff',width:150,height:30,margin:'0 3px'}} defaultValue={null}
                            onChange={value=>setCodeGroup(value)}
                    >
                        <Select.Option value={null}>不选择分组</Select.Option>
                        {
                            groupList && groupList.map(item=>{
                                return <Select.Option value={item.groupId} key={item.groupId}>{item.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label='仓库路径' name='address'
                           rules={[
                               {max:30,message:'请输入1~31位以内的名称'},
                               {required:true,message:''},
                               ({ getFieldValue }) => ({
                                   validator(rule, value) {
                                       if(!value || value.trim() === ''){
                                           return Promise.reject('仓库路径不能为空')
                                       }
                                       return Promise.resolve()
                                   },
                               })
                           ]}
                           className='path-tips'
                >
                    <Input bordered={false} style={{background:'#fff'}}/>
                </Form.Item>
            </div>
            <HousePower
                powerType={powerType}
                setPowerType={setPowerType}
                powerTitle={'仓库'}
            />
            {
                powerType===2 &&
                <HouseUser
                    yUserList={[yUserList]}
                    setYUserList={setYUserList}
                    nUserList={nUserList}
                    setNUserList={setNUserList}
                    userId={'11111'}
                    member={member}
                    setMember={setMember}
                    userTitle={'仓库'}
                />
            }
            <Form.Item name='remark' label='仓库描述'>
                <Input.TextArea bordered={false}  style={{background:'#fff'}} />
            </Form.Item>
            {/*<Form.Item  name='dddd'>*/}
            {/*    <Row>*/}
            {/*        <Col span={24}>*/}
            {/*            <Checkbox value={1}*/}
            {/*                      style={{*/}
            {/*                          lineHeight: '32px',*/}
            {/*                      }}*/}
            {/*            >*/}
            {/*                创建 README.md*/}
            {/*            </Checkbox>*/}
            {/*        </Col>*/}
            {/*        <Col span={24}>*/}
            {/*            <Checkbox value={2}*/}
            {/*                      style={{*/}
            {/*                          lineHeight: '32px',*/}
            {/*                      }}*/}
            {/*            >*/}
            {/*                创建 .gitignore*/}
            {/*            </Checkbox>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Form.Item>*/}
        </Form>
    )

    return(
        <Modal
            visible={addHouseVisible}
            onCancel={()=>setAddHouseVisible(false)}
            closable={false}
            mask={false}
            footer={false}
            style={{top:0,padding:0,margin:0,width:'100vw',maxWidth:'100vw'}}
            className='xcode storehouse-add'
            width={'100vw'}
        >
            <div className='storehouseAddModal'>
                <div className='storehouseAddModal-top'>
                    <div className='storehouseAddModal-top-title'>
                        新建仓库
                    </div>

                    {
                        addType===1?
                        <div className='storehouseAddModal-top-leadingIn'>
                            <span>在其他网站已经有仓库了吗？</span>
                            <span className='leadingIn'>点击导入</span>
                        </div>
                            :
                        <div className='storehouseAddModal-top-leadingIn'>
                            <span className='leadingIn' onClick={()=>setAddType(1)}>创建新存储库</span>
                        </div>
                    }
                </div>
                <div className='storehouseAddModal-content'>
                    {
                        addType===1 &&
                        <div className='storehouseAddModal-new'>
                            {newStoreHouse}
                            <Btn
                                onClick={()=>setAddHouseVisible(false)}
                                title={'取消'}
                                isMar={true}
                            />
                            <Btn
                                type={'primary'}
                                onClick={() => {
                                    form
                                        .validateFields()
                                        .then((values) => {
                                            onOk(values)
                                            form.resetFields()

                                        })
                                }}
                                title={'确认'}
                            />
                        </div>
                    }
                </div>
            </div>
        </Modal>
    )
}

export default HouseAdd
