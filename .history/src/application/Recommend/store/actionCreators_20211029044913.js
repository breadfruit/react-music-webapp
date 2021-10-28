import { fromJS } from 'immutable'
import {getBannerRequest, getRecommendListRequest} from '../../../api/request'
import * as actionTypes from './constant'


export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data:fromJS(data)
})


export const  changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
})



export const getBannerList = () => {
    return (dispatch) => {
        getBannerList().then(data => {
            dispatch(changeBannerList(data))
        }).catch(err => {
            console.log('请求轮播图的资源失败')
        }) 
    }
}


export const  getRecommendLis = () => {
    return (dispatch) => {
        getRecommendListRequest().then(data => {
            dispatch()
        }).catch(err => {
            console.log('请求推荐的资源错误')
        })
    }
}