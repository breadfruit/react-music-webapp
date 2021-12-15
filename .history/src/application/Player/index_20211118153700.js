import React from 'react'
import { connect } from "react-redux";
import {
    changePlayingState,
    changeShowPlayList,
    changeCurrentIndex,
    changeCurrentSong,
    changePlayList,
    changePlayMode,
    changeFullScreen,
    changeSpeed
} from './store/actionCreators'
function Player () {
    const [currentTime, setCurrentTime] = useState(0);
    const [modeText, setModeText] = useState("");
    const [duration, setDuration] = useState("");
    let percent = isNaN(currentTime / duration) ? 0: currentTime / duration
}

export default Player;