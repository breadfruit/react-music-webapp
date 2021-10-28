
import * as actionTypes from './constants';
import { fromJS} from 'immutable'


const defaultStatus = fromJS({
    bannerList: [],
    recommendList: []
})



export default (state = defaultStatus, action) => {
    switch(action.type) {
        case action.type.CHANGE_BANNER:
            return state.set('bannerList', action.data)
        case action.type.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data);
        default: 
            return state;
    }
}