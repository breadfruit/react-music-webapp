import styled from 'styled-components';
import style from '../../assets/global-style';
import NeteaseMusic from './netease-music.png'

export const Container = styled.div`
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${props => props.play > 0 ? "60px" : 0};
  width: 100%;
  z-index: 1000;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear{
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active{
    opacity: 1;
    transition: all .3s;
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit{
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit-active{
    opacity: 0;
    transition: all .3s;
    transform: translate3d(100%, 0, 0);
  }
`
export const LoginIconWrapper = styled.div`
  height:250px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginWrapper = styled.div`
      height: 70px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
`

export const Middle = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
`







