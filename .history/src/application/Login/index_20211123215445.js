import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Container, LoginForm} from './style'


//实现扫码，用户名，邮箱登录


const Login = () => {
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
  
    return (
    <Container>
        <LoginForm>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
            <Form.item>
                <img src='./netease-music.png'></img>
            </Form.item>
            <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
            >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
            Or <a href="">register now!</a>
            </Form.Item>
        </Form>
        </LoginForm>
       
    </Container>
    );
  };


  

export default React.memo(Login)