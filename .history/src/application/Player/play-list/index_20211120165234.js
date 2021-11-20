import { connect } from "react-redux";
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from './style';
import { CSSTransition } from 'react-transition-group';
import React, { useRef, useState, useCallback } from 'react';
import { prefixStyle, getName } from './../../../api/utils';
import { changeShowPlayList, changeCurrentIndex, changePlayMode, changePlayList } from "../store/actionCreators";
import { playMode } from "../../../api/config";
import Scroll from '../../../baseUI/scroll';


// 组件内代码
function PlayList (props) {
  const { showPlayList } = props;
  const { togglePlayListDispatch } = props;
  const playListRef = useRef ();
  const listWrapperRef = useRef ();
  const isShow = useState (false);

  const transform = prefixStyle ("transform");


  const {
    currentIndex,
    currentSong:immutableCurrentSong,
    showPlayList,
    playList:immutablePlayList,
    mode,
    sequencePlayList:immutableSequencePlayList
  } = props;
  const {
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changePlayListDispatch,
    changeModeDispatch,
  } = props;
  
  const currentSong = immutableCurrentSong.toJS ();
  const playList = immutablePlayList.toJS ();
  const sequencePlayList = immutableSequencePlayList.toJS ();
  

  const onEnterCB = useCallback (() => {
    // 让列表显示
    setIsShow (true);
    // 最开始是隐藏在下面
    listWrapperRef.current.style [transform] = `translate3d (0, 100%, 0)`;
  }, [transform]);
  
  const onEnteringCB = useCallback (() => {
    // 让列表展现
    listWrapperRef.current.style ["transition"] = "all 0.3s";
    listWrapperRef.current.style [transform] = `translate3d (0, 0, 0)`;
  }, [transform]);
  
  const onExitingCB = useCallback (() => {
    listWrapperRef.current.style ["transition"] = "all 0.3s";
    listWrapperRef.current.style [transform] = `translate3d (0px, 100%, 0px)`;
  }, [transform]);
  
  const onExitedCB = useCallback (() => {
    setIsShow (false);
    listWrapperRef.current.style [transform] = `translate3d (0px, 100%, 0px)`;
  }, [transform]);

  const getCurrentIcon = (item) => {
    // 是不是当前正在播放的歌曲
    const current = currentSong.id === item.id;
    const className = current ? 'icon-play' : '';
    const content = current ? '&#xe6e3;': '';
    return (
      <i className={`current iconfont ${className}`} dangerouslySetInnerHTML={{__html:content}}></i>
    )
  };
  const getPlayMode = () => {
    let content, text;
    if (mode === playMode.sequence) {
      content = "&#xe625;";
      text = "顺序播放";
    } else if (mode === playMode.loop) {
      content = "&#xe653;";
      text = "单曲循环";
    } else {
      content = "&#xe61b;";
      text = "随机播放";
    }
    return (
      <div>
        <i className="iconfont" onClick={(e) => changeMode (e)}  dangerouslySetInnerHTML={{__html: content}}></i>
        <span className="text" onClick={(e) => changeMode (e)}>{text}</span>
      </div>
    )
  };
  const changeMode = (e) => {
    let newMode = (mode + 1) % 3;
    // 具体逻辑比较复杂 后面来实现
  };

  return (
    <CSSTransition 
      in={showPlayList} 
      timeout={300} 
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper 
        ref={playListRef} 
        style={isShow === true ? { display: "block" } : { display: "none" }} 
        onClick={() => togglePlayListDispatch (false)}
      >
        <div className="list_wrapper" ref={listWrapperRef} >
        <ListHeader>
  <h1 className="title">
    { getPlayMode () }
    <span className="iconfont clear" onClick={handleShowClear}>&#xe63d;</span>
  </h1>
</ListHeader>
<ScrollWrapper>
  <Scroll >
    <ListContent>
      {
        playList.map ((item, index) => {
          return (
            <li className="item" key={item.id}>
              {getCurrentIcon (item)}
              <span className="text">{item.name} - {getName (item.ar)}</span>
              <span className="like">
                <i className="iconfont">&#xe601;</i>
              </span>
              <span className="delete">
                <i className="iconfont">&#xe63d;</i>
              </span>
            </li>
          )
        })
      }
    </ListContent>
  </Scroll>
</ScrollWrapper>
        </div>
      </PlayListWrapper>
    </CSSTransition>
  )
}



export default React.memo(PlayList)