import {SET_CURRENT_INDEX, SET_FULL_SCREEN, SET_PLAYLIST, SET_PLAYING_STATE, SET_PLAY_MODE, SET_PLAY_MODE, SET_CURRENT_SONG, SET_SHOW_PLAYLIST, SET_SEQUENCE_PLAYLIST} from './constants'

import {fromJS} from 'immutable'
import { nativeTouchData } from 'react-dom/test-utils'
//获取当前播放列表
export const changeCurrentSong = (data) => ({
    type: SET_CURRENT_SONG,
    data: fromJS(data)
})
//获取当前播放索引
export const changeCurrentSongIndex = (data) => ({
    type: SET_CURRENT_INDEX,
    data: fromJS(data)
})

//当前是否播放
export const changePlayingState = (data) => ({
    type: SET_PLAYING_STATE,
    data: data
})
//当前播放模式
export const changePlayMode = (data) => ({
    type: SET_PLAY_MODE,
    data: fromJS(data)
})
//当前是否全屏
export const changeFullScreen = (data) => ({
    type: SET_FULL_SCREEN,
    data

})
//获取按顺序列表
export const changeSequecePlayList  = (data) => ({
    type: SET_SEQUENCE_PLAYLIST,
    data: fromJS(data)
})

//获取最近播放列表
export const changePlayList  = (data) => ({
    type: SET_PLAYLIST,
    data: fromJS (data)
  });

export const changeShowPlayList = (data) => ({
    type: SET_SHOW_PLAYLIST,
    data
});
  