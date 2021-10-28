import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构


const defaultState = fromJS({
    bannerList: [],
    recommendList: []
})


export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANDE_BANNER:
            return state.set('bannerList', action.data)
        case actionTypes.CHANGE_RECOMMEND_LISR:
            return state.set('recommendList', action.data)
        default:
            return state
    }
}