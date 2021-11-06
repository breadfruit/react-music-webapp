import React, { useEffect, useState, useRef} from 'react'
import MiniPlayer from './miniPlayer/index';
import NormalPlayer from './normalPlayer/index'
import {connect} from 'react-redux'
import {
    changePlayingState,
    changeShowPlayList,
    changeCurrentIndex,
    changeCurrentSong,
    changePlayList,
    changePlayMode,
    changeFullScreen
} from "./store/actionCreators";
import {getLyricRequest, getSongUrl} from '../../api/request'
import { isEmptyObject } from "../../api/utils";
function Player(props) {

    const audioRef = useRef();

    console.log('currentsong,----', props)
    //目前播放时间
    const [currentTime, setCurrentTime] = useState(0);
    //歌曲总时长
    const [duration, setDuration] = useState(0);
    //歌曲播放进度
    let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
 
    const { fullScreen, playing, currentIndex, currentSong: immutableCurrentSong } = props;
    const { toggleFullScreenDispatch, togglePlayingDispatch, changeCurrentIndexDispatch, changeCurrentDispatch } = props;
  
    //获取当前播放歌曲信息
    let currentSong = immutableCurrentSong ? immutableCurrentSong.toJS() : [];

    //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
    const [preSong, setPreSong] = useState({});

    useEffect(() => {
        changeCurrentIndexDispatch(0);
    }, [])

    //mock一份playList，后面直接从 redux 拿，现在只是为了调试播放效果。
    const playList = [
        {
        ftype: 0,
        djId: 0,
        a: null,
        cd: '01',
        crbt: null,
        no: 1,
        st: 0,
        rt: '',
        cf: '',
        alia: [
            '手游《梦幻花园》苏州园林版推广曲'
        ],
        rtUrls: [],
        fee: 0,
        s_id: 0,
        copyright: 0,
        h: {
            br: 320000,
            fid: 0,
            size: 9400365,
            vd: -45814
        },
        mv: 0,
        al: {
            id: 84991301,
            name: '拾梦纪',
            picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
            tns: [],
            pic_str: '109951164627180052',
            pic: 109951164627180050
        },
        name: '拾梦纪',
        l: {
            br: 128000,
            fid: 0,
            size: 3760173,
            vd: -41672
        },
        rtype: 0,
        m: {
            br: 192000,
            fid: 0,
            size: 5640237,
            vd: -43277
        },
        cp: 1416668,
        mark: 0,
        rtUrl: null,
        mst: 9,
        dt: 234947,
        ar: [
            {
            id: 12084589,
            name: '妖扬',
            tns: [],
            alias: []
            },
            {
            id: 12578371,
            name: '金天',
            tns: [],
            alias: []
            }
        ],
        pop: 5,
        pst: 0,
        t: 0,
        v: 3,
        id: 1416767593,
        publishTime: 0,
        rurl: null
        }
    ];
    
    useEffect(() => {
        if(!currentSong) return;
        changeCurrentIndexDispatch(0);//currentIndex默认为-1，临时改成0
        let current = playList[0];
        changeCurrentDispatch(current);//赋值currentSong
        audioRef.current.src = getSongUrl(current.id);
        setTimeout(() => {
          audioRef.current.play();
        });
        togglePlayingDispatch(true);//播放状态
        setCurrentTime(0);//从头开始播放
        setDuration((current.dt / 1000) | 0);//时长
    }, []);

    useEffect(() => {
        if (
          !playList.length ||
          currentIndex === -1 ||
          !playList[currentIndex] ||
          playList[currentIndex].id === preSong.id 
        )
          return;
        let current = playList[currentIndex];
        changeCurrentDispatch(current);//赋值currentSong
        setPreSong(current);
        audioRef.current.src = getSongUrl(current.id);
        setTimeout(() => {
          audioRef.current.play();
        });
        togglePlayingDispatch(true);//播放状态
        setCurrentTime(0);//从头开始播放
        setDuration((current.dt / 1000) | 0);//时长
    }, [playList, currentIndex]);

    const clickPlaying = (e, state) => {
        e.stopPropagation();
        togglePlayingDispatch(state);
    }

    const updateTime = e => {
        setCurrentTime(e.target.currentTime);
    };


    const onProgressChange = curPercent => {
        const newTime = curPercent * duration;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
        if (!playing) {
          togglePlayingDispatch(true);
        }
    };


    const handleLoop = () => {
        audioRef.current.currentTime = 0;
        changePlayingState(true);
        audioRef.current.play();
    } 
    const handlePrev = () => {
        if(playList.length === 1) {
            handleLoop();
            return;
        }
        let index = currentIndex - 1;
        if (index < 0) index = playList.length - 1;
        if (!playing) togglePlayingDispatch(true);
        changeCurrentIndexDispatch(index);
    }
    const handleNext = () => {
        if(playList.length === 1) {
            handleLoop();
            return;
        }
        let index = currentIndex + 1;
        if (index === playList.length) index = 0;
        if (!playing) togglePlayingDispatch(true);
        changeCurrentIndexDispatch(index);
    }
    return (
        <div>
            { isEmptyObject(currentSong) ? null : 
            <MiniPlayer
                song={currentSong}
                fullScreen={fullScreen}
                playing={playing}
                toggleFullScreen={toggleFullScreenDispatch}
                clickPlaying={clickPlaying}
            /> 
            }
            { isEmptyObject(currentSong) ? null : 
            <NormalPlayer
                song={currentSong}
                fullScreen={fullScreen}
                playing={playing}
                toggleFullScreen={toggleFullScreenDispatch}
                clickPlaying={clickPlaying}
                duration={duration}//总时长
                currentTime={currentTime}//播放时间
                percent={percent}//进度
                onProgressChange={onProgressChange}//进度条被滑动或点击时用来改变percent的回调函数
                handlePrev={handlePrev}
                handleNext={handleNext}
            />
            }
            <audio 
                ref={audioRef}
                onTimeUpdate={updateTime}
            ></audio>
        </div>
    )
}

const mapStateToProps = state => ({
    fullScreen: state.getIn(["player", "fullScreen"]),
    playing: state.getIn(["player", "playing"]),
    currentSong: state.getIn(["player", "currentSong"]),
    showPlayList: state.getIn(["player", "showPlayList"]),
    mode: state.getIn(["player", "mode"]),
    currentIndex: state.getIn(["player", "currentIndex"]),
    playList: state.getIn(["player", "playList"]),
    sequencePlayList: state.getIn(["player", "sequencePlayList"])
})

const mapDispatchToProps = (dispatch) => {
    return {

        togglePlayingDispatch(data) {
            dispatch(changePlayingState(data));
        },
        toggleFullScreenDispatch(data) {
            dispatch(changeFullScreen(data));
        },
        togglePlayListDispatch(data) {
            dispatch(changeShowPlayList(data));
        },
        changeCurrentIndexDispatch(index) {
            dispatch(changeCurrentIndex(index));
        },
        changeCurrentDispatch(data) {
            dispatch(changeCurrentSong(data));
        },
        changeModeDispatch(data) {
            dispatch(changePlayMode(data));
        },
        changePlayListDispatch(data) {
            dispatch(changePlayList(data));
        }
    }
}

// 将 ui 组件包装成容器组件
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(Player));