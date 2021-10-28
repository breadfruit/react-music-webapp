import { fromJS } from 'immutable'
import {getBannerRequest, getRecommendListRequest} from '../../../api/request'
import * as actionTypes from './constant'


export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data:fromJS(data)
})




export const getBannerList = () => {
    return (dispatch) => {
        getBannerList().then(data => {
            dispatch()
        })
    }
}