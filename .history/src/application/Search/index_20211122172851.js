import React, {useState, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';
import SearchBox from './../../baseUI/search-box/index';

function Search (props) {
    const [show, setShow] = useState (false);
    const [query, setQuery] = useState('');
    useEffect(() => {
        setShow(true)
    }, []);
    const handleQuery = (q) => {
        setQuery(q);
        if(!q) return;
        // changeEnterLoadingDispatch(true);
        // getSuggestListDispatch(q);
      }
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
            <div className="search_box_wrapper">
            <SearchBox  newQuery={query} handleQuery={handleQuery}></SearchBox>
            </div>
        </Container>
      </CSSTransition>
    )
}

export default React.memo(Search)