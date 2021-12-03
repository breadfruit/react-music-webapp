import React,{useEffect, useRef} from 'react'
import {
    MiniPlayerContainer

} from './style'
import { getName } from '../../../api/utils'
import { CSSTransition } from "react-transition-group";
import ProgressCircle from '../../../baseUI/progress-circle/index'
import {getImageUrlRequest } from '../../../api/request'


function MiniPlayer (props) {
    const miniPlayerRef = useRef ();
    const { fullScreen, song, playing, percent} = props;
    const { clickPlaying, toggleFullScreen, togglePlayList, setFullScreen } = props;
    const handleTogglePlaList = (e) => {
        togglePlayList(true);
        e.stopPropagation ();
    }
    const [currentMusicImage, setCurrentMusicImage] = useState('')
    useEffect(() => {
            //获取当前歌曲播放的专辑图片
    getImageUrlRequest(cursong.mid).then(res => {
        let data = res.response.data.imageUrl;
        console.log('当前播放歌曲的专辑照片---', data)
        setCurrentMusicImage(data)
      })
    })
    return (
        <CSSTransition
            in={!fullScreen} 
            timeout={400} 
            classNames="mini" 
            onEnter={() => {
            miniPlayerRef.current.style.display = "flex";
            }}
            onExited={() => {
            miniPlayerRef.current.style.display = "none";
            }}
        >
            <MiniPlayerContainer ref={miniPlayerRef} onClick={() => toggleFullScreen (true)}>
                <div className="icon">
                    <div className="imgWrapper">
                        <img className={`play ? ${playing ? "": "pause"} `} src={song.al.picUrl} width="40" height="40" alt="img" />
                    </div>
                </div>
                <div className="text">
                    <h2 className="name">{song.name}</h2>
                    <p className="desc">{getName (song.ar)}</p>
                </div>
                <div className="control">
                    <ProgressCircle radius={32} percent={percent}>
                        {
                            playing ? <i className="icon-mini iconfont icon-pause" onClick={e => clickPlaying(e, false)}>&#xe650;</i>
                            : <i className="icon-mini iconfont icon-play" onClick={e => clickPlaying(e, true)}>&#xe650;</i>
                        }
                    </ProgressCircle>
                </div>
                <div className="control" onClick = {handleTogglePlaLis}>
                    <i className="iconfont">&#xe640;</i>
                </div>
            </MiniPlayerContainer>
        </CSSTransition>
    )
}

export default React.memo(MiniPlayer);