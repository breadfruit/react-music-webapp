import React from 'react'


import {
    changePlayingState,
    changeShowPlayList,
    changeCurrentIndex,
    changeCurrentSong,
    changePlayList,
    changePlayMode,
    changeFullScreen
  } from "./store/actionCreators";


function Player () {
    const {} = props;
    const {}  = props;
    return (
        <div>player</div>
    )
}

const mapStateToProps = state => ({
    fullScreen: state.getIn (["player", "fullScreen"]),
    playing: state.getIn (["player", "playing"]),
    currentSong: state.getIn (["player", "currentSong"]),
    showPlayList: state.getIn (["player", "showPlayList"]),
    mode: state.getIn (["player", "mode"]),
    currentIndex: state.getIn (["player", "currentIndex"]),
    playList: state.getIn (["player", "playList"]),
    sequencePlayList: state.getIn (["player", "sequencePlayList"])
})

const mapDispatchToProps = (dispatch) => {
    return {
            
        togglePlayingDispatch (data) {
            dispatch (changePlayingState (data));
          },
          toggleFullScreenDispatch (data) {
            dispatch (changeFullScreen (data));
          },
          togglePlayListDispatch (data) {
            dispatch (changeShowPlayList (data));
          },
          changeCurrentIndexDispatch (index) {
            dispatch (changeCurrentIndex (index));
          },
          changeCurrentDispatch (data) {
            dispatch (changeCurrentSong (data));
          },
          changeModeDispatch (data) {
            dispatch (changePlayMode (data));
          },
          changePlayListDispatch (data) {
            dispatch (changePlayList (data));
          }
    }
}

// 将 ui 组件包装成容器组件
export default connect (
    mapStateToProps,
    mapDispatchToProps
  )(React.memo (Player));