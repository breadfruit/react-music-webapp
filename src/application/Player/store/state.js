import * as actionTypes from './constants';
import {fromJS} from 'immutable';
import {playMode} from '../../../api/config'

export const defaultState  = fromJS({
    fullScreen: false,
    playing: true,
    sequencePlayList: [],
    playList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    showPlayList: false,
    currentSong: {}
})