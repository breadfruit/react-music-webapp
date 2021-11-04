import React, { useState, useRef, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import {  getName } from "../../../api/utils";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,

} from "./style";

function NormalPlayer(props) {
    const { song, fullScreen } = props;
    const { toggleFullScreenDispatch } = props;
  return (
    <CSSTransition
      classNames="normal"
       in={fullScreen} 
      timeout={400}
      mountOnEnter
    //   onEnter={enter}
    //   onEntered={afterEnter}
    //   onExit={leave}
    //   onExited={afterLeave}
    >
      <NormalPlayerContainer >
        <div className="background">
          <img
            src={song.al.picUrl + "?param=300x300"}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back" >
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <div className="text">
            <h1 className="title">{song.name}</h1>
            <h1 className="subtitle">{getName(song.ar)}</h1>
          </div>
        </Top>
        <Middle >
            <CDWrapper
            >
              <div className="cd">
                <img
                  src={song.al.picUrl + "?param=400x400"}
                  alt=""
                />
              </div>
              {/* <CD playing={playing} image={song.al.picUrl + "?param=300x300"}></CD> */}
              <p className="playing_lyric"></p>
            </CDWrapper>
        </Middle>
        <Bottom className="bottom">
        <Operators>
          <div className="icon i-left" >
            <i className="iconfont">&#xe625;</i>
          </div>
          <div className="icon i-left">
            <i className="iconfont">&#xe6e1;</i>
          </div>
          <div className="icon i-center">
            <i className="iconfont">&#xe723;</i>
          </div>
          <div className="icon i-right">
            <i className="iconfont">&#xe718;</i>
          </div>
          <div className="icon i-right">
            <i className="iconfont">&#xe640;</i>
          </div>
        </Operators>
      </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
}

export default React.memo(NormalPlayer);
