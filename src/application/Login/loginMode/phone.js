import React, { memo, useRef, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container, IconWrapper, FormWrapper}  from './style'
import { Form, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import imgSrc from '../netease-music.png'
import {getLoginByPhoneRequest} from '../../../api/request'



function LoginPhone(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const onFinish = async (values) => {
        const {phone, password} = values;
        await getLoginByPhoneRequest(phone, password);
        
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
                        label="Phone"
                        name="Phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Phone!',
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

export default  connect()(React.memo(LoginPhone))


