import React, {useState, useEffect, useCallback} from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';
import SearchBox from './../../baseUI/search-box/index';
import {connect} from 'react-redux'
import { getHotKeyWords, changeEnterLoading, getSuggestList } from './store/actionCreators';


function Search (props) {
    const [show, setShow] = useState (false);
    const [query, setQuery] = useState('');

    const {
        hotList, 
        enterLoading, 
        suggestList: immutableSuggestList, 
        songsCount, 
        songsList: immutableSongsList
      } = props;
      
      const suggestList = immutableSuggestList.toJS ();
      const songsList = immutableSongsList.toJS ();
      
      const {
        getHotKeyWordsDispatch,
        changeEnterLoadingDispatch,
        getSuggestListDispatch,
        getSongDetailDispatch
      } = props;
    useEffect(() => {
        setShow(true)
    }, []);
    const handleQuery = (q) => {
        setQuery(q);
        if(!q) return;
        // changeEnterLoadingDispatch(true);
        // getSuggestListDispatch(q);
      }
    const searchBack = useCallback(() => {
        setShow (false);
    }, [])
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
            <SearchBox  back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
            </div>
        </Container>
      </CSSTransition>
    )
}



// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
    hotList: state.getIn(['search', 'hotList']),
    enterLoading: state.getIn(['search', 'enterLoading']),
    suggestList: state.getIn(['search', 'suggestList']),
    songsCount: state.getIn(['player', 'playList']).size,
    songsList: state.getIn(['search', 'songsList'])
  });
  
  // 映射dispatch到props上
  const mapDispatchToProps = (dispatch) => {
    return {
      getHotKeyWordsDispatch() {
        dispatch(getHotKeyWords());
      },
      changeEnterLoadingDispatch(data) {
        dispatch(changeEnterLoading(data))
      },
      getSuggestListDispatch(data) {
        dispatch(getSuggestList(data));
      },
      getSongDetailDispatch(id) {
        dispatch(getSongDetail(id));
      }
    }
  };
  
  // 将ui组件包装成容器组件
  export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search));