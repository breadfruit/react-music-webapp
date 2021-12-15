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
          <ScrollWrapper></ScrollWrapper>
        </div>
      </PlayListWrapper>
    </CSSTransition>
  )
}
