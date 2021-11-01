
import {fromJS} from 'immutable'
import * as actionTypes from './constants';


export default defaultState = fromJS({
    artist:{},
    songsOfArtist: [],
    loading: true,
})