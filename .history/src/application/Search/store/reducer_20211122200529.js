import { SET_HOT_KEYWRODS, SET_SUGGEST_LIST, SET_RESULT_SONGS_LIST, SET_ENTER_LOADING } from './constants';
import { fromJS } from 'immutable';
import { getHotKeyWordsRequest, getSuggestListRequest, getResultSongsListRequest } from './../../../api/request';