import React from "react"
import {Button, Checkbox, Input, InputNumber, Radio, Rate, Select, Slider, Switch, Upload} from 'antd'
// import { Form } from '../../lib'
import { Form } from '../../es'
// import { Form } from '../components'

const { Option } = Select
const { useForm, Field } = Form

const FormTest: React.FC = () => {
    const [ form ] = useForm()

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div>
            <Form
                onFinish={(values) => console.log(values)}
                onFinishFailed={(err) => console.log(err)}
                initialValues={{
                    username: '你好啊',
                    password: 1234556,
                    switch: true
                }}
                form={form}
            >
                <div>
                    <Field name={'username'}>
                        <Input placeholder="用户名" style={{width: 200}} />
                    </Field>
                </div>
                <div>
                    <Field name={"password"}>
                        <InputNumber placeholder="密码" style={{width: 200}} />
                    </Field>
                </div>
                <div>
                    <Field name={'type'}>
                        <Radio.Group>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </Radio.Group>
                    </Field>
                </div>
                <div>
                    <Field name={'checkbox'}>
                        <Checkbox.Group>
                            <Checkbox value={'A'}>A</Checkbox>
                            <Checkbox value={'B'}>B</Checkbox>
                            <Checkbox value={'C'}>C</Checkbox>
                        </Checkbox.Group>
                    </Field>
                </div>
                <div>
                    <Field name={'select'}>
                        <Select style={{width: 200}}>
                            <Option value="china">China</Option>
                            <Option value="usa">U.S.A</Option>
                        </Select>
                    </Field>
                </div>
                <div>
                    <Field name={'slider'}>
                        <Slider
                            style={{width: 200}}
                            marks={{
                                0: 'A',
                                20: 'B',
                                40: 'C',
                                60: 'D',
                                80: 'E',
                                100: 'F',
                            }}
                        />
                    </Field>
                </div>
                <div>
                    <Field name={'switch'} valuePropName="checked">
                        <Switch />
                    </Field>
                </div>
                <div>
                    <Field name={'rate'}>
                        <Rate />
                    </Field>
                </div>

                <div>
                    <Field name={'uploadOne'} valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload name="logo" action="/upload.do"  listType="picture">
                            <Button>Click to upload</Button>
                        </Upload>
                    </Field>
                </div>

                <div>
                    <Field name={'uploadTwo'} valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload.Dragger name="files" action="/upload.do">
                            <p className="ant-upload-drag-icon">

                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Field>
                </div>


                <Button htmlType="submit">提交</Button>
                <Button htmlType="reset">哈哈哈</Button>
                <Button type="primary" onClick={() => form.submit()}>另一个提交</Button>
            </Form>
        </div>
    )
}

export default FormTest