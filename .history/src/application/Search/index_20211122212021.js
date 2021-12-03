import React, {useState, useEffect, useCallback} from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';
import SearchBox from './../../baseUI/search-box/index';
import {connect} from 'react-redux'
import { getHotKeyWords, changeEnterLoading, getSuggestList } from './store/actionCreators';
import { getRankListRequest } from '../../api/request';


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

    const renderHotKey = () => {
        let list = hotList? hotList : [];
        return (
            <ul>
                {
                    list.map(item => {
                        return (
                            <li className="item" key={item.first} onClick={() => setQuery (item.first)}>
                                <span>{item.first}</span>
                            </li>
                        )
                    })
                }
            </ul>
        )
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