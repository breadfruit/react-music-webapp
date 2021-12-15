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

export const LoginForm = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

