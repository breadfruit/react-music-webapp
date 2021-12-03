import React, { memo, useRef, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container, QrWrapper, Middle }  from './style'
import { getLoginByQRRequest,getLoginStatusRequest, checkStatusRequest } from '../../../api/request'


function LoginQr(props) {
    const [show, setShow] = useState(false);
    const [qrimg, setQrimg] = useState('');
    const [info, setInfo] = useState('');
    const [timer, setTimer] = useState('')

    useEffect( () => {
        getLoginByQRRequest().then(res => {
            setQrimg(res)
        })

    }, [])
    
    useEffect(() => {
        console.log('phone')
        setShow(true);
    }, []);
    

    return (
        <CSSTransition
            in={show}
            timeout={300}
            appear={true}
            classNames="fly"
            onExited={props.history.goBack}
        >
       <Container>
          <QrWrapper>
                <img src={qrimg}></img>
          </QrWrapper>
          <Middle>
            <h1>扫一扫</h1>
          </Middle>
       </Container>
    </CSSTransition>
    )
}

export default memo(LoginQr);