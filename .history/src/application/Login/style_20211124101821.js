import styled from 'styled-components';
import style from '../../assets/global-style';
import NeteaseMusic from './netease-music.png'

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: ${props => props.play > 0 ? "60px": 0};
    width: 100%;
    z-index: 100;
    overflow: hidden;
    background: #f2f3f4;
    transform-origin: right bottom;
`

export const LoginWrapper = styled.div`
  display: flex;
  .gap {
    margin-right: 15px;
  }
`

export const LoginLeft = styled.div`
  width: 250px;
  .login-content {
    border-right: 1px dotted #ccc;
    height: 220px;
    .login-bg {
      width: 250px;
      height: 140px;
      margin-bottom: 30px;
    }
  }
`

export const LoginRight = styled.div`
  padding: 3px 0 3px 39px;
  margin-top: -15px;
  .icons-wrapper {
    
  }
`

export const PhoneLoginModal = styled.section`
  display: flex;
  justify-content: center;
`

