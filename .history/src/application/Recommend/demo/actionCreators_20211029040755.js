import * as actionTypes from './actionCreators'
import {fromJS} from 'immutable'
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

//修改轮播图
export const changeBannerList  = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data)
})

export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
})

export const getBannerList = () => {
    return (dispatch) => {
    getBannerRequest().then(data => {
        dispatch(changeBannerList(data.banners))
    }).catch(() => {
        console.log('轮播图数据传输错误')
    })
    }
}