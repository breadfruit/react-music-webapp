import React, { memo,useState, useEffect } from 'react'
import { Button } from 'antd'
import { Container,LoginWrapper, LoginIconWrapper } from './style'
import { CSSTransition } from 'react-transition-group';
// import { getLoginByQRRequest } from '../../api/request'
import imgSrc from './netease-music.png'
import { renderRoutes } from 'react-router-config';
//实现扫码，用户名，邮箱登录


/**
 * 登录页面(模态框)
 */
function Login(props) {

  
  const [show, setShow] = useState(false);

 

  useEffect(() => {
    setShow(true);
  }, []);



  // other handle
  const handleLogin = (loginMode) => {
    props.history.push(`/login/${loginMode}`)
  }

  const handleResigter = () => {
    props.history.push(`/resigter`)
  }

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      onExited={props.history.goBack}
    >
      <Container>
        <LoginIconWrapper>
          <img src={imgSrc} style={{ width: '100px', height: '100px', }} alt="" />
        </LoginIconWrapper>
        <LoginWrapper>
          <div className="login-bg"></div>
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => handleLogin('phone')}
          >
            手机号
          </Button>
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => handleLogin('email')}
          >
            网易云邮箱
          </Button>
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => handleLogin('qr')}
          >
            扫码
          </Button>

        </LoginWrapper>
        <LoginWrapper>
            <Button
              type="ghost"
              onClick={() => handleResigter()}
              shape="round"
              size="large"
              className="gap"
            >
              注册
            </Button>
        </LoginWrapper>
        {renderRoutes(props.route.routes)}
      </Container>
    </CSSTransition>
  )
 
  
}

export default memo(Login)
