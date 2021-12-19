import {
    fromJS
} from 'immutable'
import {
    getRankListRequest
} from '../../../api/request'

//context
export const CHANGE_RANK_LIST = 'rank/CHANGE_RANK_LIST';

export const CHANGE_LOADING = 'rank/CHANGE_LOADING';


export const defaultState = fromJS({
    rankList: [],
    loading: true
})

//reducer (负责更新视图)
const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case CHANGE_RANK_LIST:
            return state.set('rankList', action.data);
        case CHANGE_LOADING:
            return state.set('loading', action.data);
        default:
            return state
    }
}

//action
const changeRankList = (data) => ({
    type: CHANGE_RANK_LIST,
    data: fromJS (data)
})
const changeLoading = (data) => ({
    type: CHANGE_LOADING,
    data: fromJS(data)
}) 

export const getRankList = () => {
    return dispatch => {
        getRankListRequest().then(data => {
            let list = data.result;
            dispatch(changeRankList(list));
            dispatch(changeLoading(false))
        }).catch(err => {
            console.log(err)
        })
    }
}

export {
    reducer
}

