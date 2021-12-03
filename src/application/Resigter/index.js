import React, { memo, useRef, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import {Container} from './style'

function Resigter() {
    const [show, setShow] = useState(false);

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
            unmountOnExit
        >
       <Container>
           <div>
               njdnfdfdfn
           </div>
       </Container>
    </CSSTransition>
    )
}

export default memo(Resigter)