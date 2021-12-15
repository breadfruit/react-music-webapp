import { CHANGE_CURRENT_ALBUM, CHANGE_TOTAL_COUNT, CHANGE_PULLUP_LOADING, CHANGE_START_INDEX, CHANGE_ENTER_LOADING } from './constants';
import { getAlbumDetailRequest } from '../../../api/request';
import { fromJS } from 'immutable';

const changeCurrentAlbum = (data) => ({
  type: CHANGE_CURRENT_ALBUM,
  data: fromJS(data)
});

export const changePullUpLoading = (data) => ({
  type: CHANGE_PULLUP_LOADING,
  data
});
export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
});

const changeTotalCount = (data) => ({
  type: CHANGE_TOTAL_COUNT,
  data
});

export const changeStartIndex = (data) => ({
  type: CHANGE_START_INDEX,
  data
});

export const getAlbumList = (id) => {
  return dispatch => {
    getAlbumDetailRequest(id).then(res => {
      //console.log('详情页面数据---', res.response.cdlist[0].songlist)
      let data = res.response.cdlist[0];
      dispatch(changeCurrentAlbum(data));
      dispatch(changeEnterLoading(false));
      dispatch(changeStartIndex(0));
      dispatch(changeTotalCount(data.tracks.length))
    }).catch(() => {
      console.log("获取album数据失败!")
    })
  }
};
