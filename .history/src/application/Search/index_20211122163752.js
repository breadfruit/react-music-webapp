import React, {useState, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';


function Search (props) {
    const [show, setShow] = useState (false);
    useEffect(() => {
        setShow(true)
    }, []);
    return (
        <CSSTransition
        in={show}
        timeout={300}
        appear={true}
        classNames="fly"
        unmountOnExit
        onExited={() => props.history.goBack ()}
      >
        <Container>
          <div> 返回 </div>
        </Container>
      </CSSTransition>
    )
}

export default React.memo(Search)