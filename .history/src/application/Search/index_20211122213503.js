import React, {useState, useEffect, useCallback} from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container, ShortcutWrapper, HotKey} from './style';
import SearchBox from './../../baseUI/search-box/index';
import {connect} from 'react-redux'
import { getHotKeyWords, changeEnterLoading, getSuggestList } from './store/actionCreators';

import Scroll from '../../baseUI/scroll';

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
      useEffect (() => {
        setShow (true);
        // 用了 redux 缓存，不再赘述
        if (!hotList.size)
          getHotKeyWordsDispatch ();
      }, []);


      useEffect(() => {
        setShow(true);
        if(!hotList.size)
          getHotKeyWordsDispatch();
          // eslint-disable-next-line
      }, []);
    
      const renderHotKey = () => {
        let list = hotList ? hotList.toJS(): [];
        return (
          <ul>
            {
              list.map(item => {
                return (
                  <li className="item" key={item.first} onClick={() => setQuery(item.first)}>
                    <span>{item.first}</span>
                  </li>
                )
              })
            }
          </ul>
        )
      };

  】
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
            <ShortcutWrapper show={!query}>
                <Scroll>
                    <div>
                    <HotKey>
                        <h1 className="title"> 热门搜索 </h1>
                        {renderHotKey ()}
                    </HotKey>
                    </div>
                </Scroll>
            </ShortcutWrapper>
        </Container>
      </CSSTransition>
    )
}



    // 映射 Redux 全局的 state 到组件的 props 上
    const mapStateToProps = (state) => ({
        hotList: state.getIn (['search', 'hotList']),
        enterLoading: state.getIn (['search', 'enterLoading']),
        suggestList: state.getIn (['search', 'suggestList']),
        songsCount: state.getIn (['player', 'playList']).size,
        songsList: state.getIn (['search', 'songsList'])
    });
    
  // 映射 dispatch 到 props 上
  const mapDispatchToProps = (dispatch) => {
    return {
      getHotKeyWordsDispatch () {
        dispatch (getHotKeyWords ());
      },
      changeEnterLoadingDispatch (data) {
        dispatch (changeEnterLoading (data))
      },
      getSuggestListDispatch (data) {
        dispatch (getSuggestList (data));
      },
    }
  };
  
  // 将ui组件包装成容器组件
  export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search));