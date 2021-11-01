import styled from 'styled-components'
import style from '../../assets/global-style'


export const Container = styled.div`
    postition: fixed;
    top: 0;
    lft: 0;
    right: 0;
    bottom: ${props => props.play > 0 ? "60px" : 0}
    width: 100%;
    z-index: 100;
`