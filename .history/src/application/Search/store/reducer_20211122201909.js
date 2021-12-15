import { SET_HOT_KEYWRODS, SET_SUGGEST_LIST, SET_RESULT_SONGS_LIST, SET_ENTER_LOADING } from './constants';
import { fromJS } from 'immutable';
import { getHotKeyWordsRequest, getSuggestListRequest, getResultSongsListRequest } from './../../../api/request';

const changeHotKeyWords = (data) => ({
    type: SET_HOT_KEYWRODS,
    data: fromJS(data)
})

const changeSuggestList = (data) => ({
    type: SET_SUGGEST_LIST,
    data: fromJS (data)
});


const changeResultSongs = (data) => ({
    type: SET_RESULT_SONGS_LIST,
    data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
    type: SET_ENTER_LOADING,
    data
  });


export const getHotKeyWords = () => {
    return dispath => {
        getHotKeyWordsRequest().then(data => {
            //拿到关键词
            let lists = data.result.hots;
            dispath(changeHotKeyWords (list))
        })
    }
}