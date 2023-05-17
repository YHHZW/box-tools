import React from "react"
import { Button, Input, Radio } from 'antd'
import { Form } from '../../lib'
import Test from './Test'

const { useForm, Field } = Form

const FormTest: React.FC = () => {
    const [ form ] = useForm()

    return (
        <div>
            <Form
                onFinish={(values) => console.log(values)}
                onFinishFailed={(err) => console.log(err)}
                form={form}
            >
                <Field name={'username'} rules={[{required: true, message: "请输入姓名！"}]}>
                    <Input placeholder="用户名"  />
                </Field>
                <Field name={"password"} rules={[{required: false, message: "请输入密码！"}]}>
                    <Input placeholder="密码" type="password" />
                </Field>
                <Field name={'type'} rules={[{required: true, message: '请输入00'}]}>
                    <Radio.Group>
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                    </Radio.Group>
                </Field>
                <Button htmlType="submit">提交</Button>
                <Button onClick={() => console.log('Hhh')}>哈哈哈</Button>
            </Form>
            <Test />
        </div>
    )
}

export default FormTest