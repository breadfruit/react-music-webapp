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
        const {email, password} = values
        console.log('Received values of form: ', email, password);
        await getLoginByEmailRequest(email, password);
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
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="/resigter">register now!</a>
                        </Form.Item>
                    </Form>
                </FormWrapper>
            </Container>
        </CSSTransition>
    )
}

export default memo(LoginEmail)



