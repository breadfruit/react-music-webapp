import React, { memo, useRef, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container, IconWrapper, FormWrapper } from './style'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import imgSrc from '../netease-music.png';
import { getLoginByEmailRequest } from '../../../api/request'


function LoginEmail(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log('phone')
        setShow(true);
    }, []);

    const onFinish = async (values) => {
        const {email, password} = values;
        await getLoginByEmailRequest(email, password);
        
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <CSSTransition
            in={show}
            timeout={300}
            appear={true}
            classNames="fly"
            onExited={props.history.goBack}
        >
           
            <Container>
                <IconWrapper>
                    <img src={imgSrc} style={{ width: '100px', height: '100px', }} alt="" />
                </IconWrapper>
                <FormWrapper>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                </FormWrapper>
            </Container>
        </CSSTransition>
    )
}

export default memo(LoginEmail)



