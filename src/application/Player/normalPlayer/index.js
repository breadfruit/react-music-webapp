import React, { useState, useRef, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { getName,  prefixStyle} from "../../../api/utils";
import animations from "create-keyframe-animation";
import {
    NormalPlayerContainer,
    Top,
    Middle,
    Bottom,
    Operators,
    CDWrapper,
    ProgressWrapper,
} from "./style";
import ProgressBar from '../../../baseUI/progressBar/index'
import {formatPlayTime} from '../../../api/utils'


function NormalPlayer(props) {
    const { song, fullScreen, playing, percent, duration, currentTime, handlePrev, handleNext } =  props;
const { toggleFullScreen, clickPlaying, onProgressChange } = props;
    //js帧动画
    const normalPlayerRef = useRef();
    const cdWrapperRef = useRef();

    const [currentState, setCurrentState] = useState(0);
    //处理transform的浏览器兼容问题
    const transform = prefixStyle("transform");

    const _getPosAndScale = () => {
        const targetWidth = 40;
        const paddingLeft = 40;
        const paddingBottom = 30;
        const paddingTop = 80;
        const width = window.innerWidth * 0.8;
        const scale = targetWidth / width;
        // 两个圆心的横坐标距离和纵坐标距离
        const x = -(window.innerWidth / 2 - paddingLeft);
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
        return {
            x,
            y,
            scale
        };
    };
  
    const enter = () => {
        normalPlayerRef.current.style.display = "block";
        const { x, y, scale } = _getPosAndScale();
        let animation = {
            0: {
                transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
            },
            60: {
                transform: `translate3d(0, 0, 0) scale(1.1)`
            },
            100: {
                transform: `translate3d(0, 0, 0) scale(1)`
            }
        };
        animations.registerAnimation({
            name: "move",
            animation,
            presets: {
                duration: 400,
                easing: "linear"
            }
        });
        animations.runAnimation(cdWrapperRef.current, "move");
    };

    const afterEnter = () => {
        const cdWrapperDom = cdWrapperRef.current;
        animations.unregisterAnimation("move");
        cdWrapperDom.style.animation = "";
    };

    const leave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "all 0.4s";
    const { x, y, scale } = _getPosAndScale ();
    cdWrapperDom.style [transform] = `translate3d (${x} px, ${y} px, 0) scale (${scale})`;
    };

    const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "";
    cdWrapperDom.style [transform] = "";
    // 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍 
    // 不置为 none 现在全屏播放器页面还是存在
    normalPlayerRef.current.style.display = "none";
    };
    
    return (
        <CSSTransition
            classNames="normal"
            in={fullScreen}
            timeout={400}
            mountOnEnter
            onEnter={enter}
            onEntered={afterEnter}
            onExit={leave}
            onExited={afterLeave}
        >
            <NormalPlayerContainer ref={normalPlayerRef}>
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
                    <div className="back">
                        <i className="iconfont icon-back">&#xe662;</i>
                    </div>
                    <div className="text">
                        <h1 className="title">{song.name}</h1>
                        <h1 className="subtitle">{getName(song.ar)}</h1>
                    </div>
                </Top>
                <Middle ref={cdWrapperRef}>
                    <CDWrapper
                    >
                    <div className="cd">
                        <img
                            className={`image play ${playing ? "" : "pause"}`}
                            src={song.al.picUrl + "?param=400x400"}
                            alt=""
                        />
                    </div>
                        {/* <CD playing={playing} image={song.al.picUrl + "?param=300x300"}></CD> */}
                    <p className="playing_lyric"></p>
                    </CDWrapper>
                </Middle>
                <Bottom className="bottom">
                    <ProgressWrapper>
                        <span className="time time-l">{formatPlayTime(currentTime)}</span>
                        <div className="progress-bar-wrapper">
                            <ProgressBar
                            percent={percent}
                            percentChange={onProgressChange}
                            ></ProgressBar>
                        </div>
                        <div className="time time-r">{formatPlayTime(duration)}</div>
                    </ProgressWrapper>
                    <Operators>
                        <div className="icon i-left" >
                            <i className="iconfont">&#xe625;</i>
                        </div>
                        <div className="icon i-left" onClick={handlePrev}>
                            <i className="iconfont">&#xe6e1;</i>
                        </div>
                        <div className="icon i-center">
                            <i
                                className="iconfont"
                                onClick={e => clickPlaying(e, !playing)}
                                dangerouslySetInnerHTML={{
                                __html: playing ? "&#xe723;" : "&#xe731;"
                                }}
                            ></i>
                        </div>
                        <div className="icon i-right" onClick={handleNext}>
                            <i className="iconfont">&#xe718;</i>
                        </div>
                        <div className="icon i-right" >
                            <i className="iconfont">&#xe640;</i>
                        </div>
                    </Operators>
                </Bottom>
            </NormalPlayerContainer>
        </CSSTransition>
    );
}

export default React.memo(NormalPlayer);
