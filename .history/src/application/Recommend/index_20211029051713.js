import React, { useEffect } from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import {connect} from 'react-redux'
import * as actionTypes from './store/actionCreators'
import Scroll from '../../baseUI/scroll/index'
import {Content} from './style'



function Recommend (props) {

  const {bannerList, recommendList} = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

//进行更新视图，初始化
  useEffect(() => {
    getBannerDataDispatch();
    getRecommendListDataDispatch();
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS () : [];
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content>
      <Scroll>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content> 
  )
}
//输出samrt组件，类似处理业务层
//告诉父组件需要的state和更新的dispatch
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn (['recommend', 'bannerList']),
  recommendList: state.getIn (['recommend', 'recommendList']),
});

const mapDispatchProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      //将结果更新视图
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchProps)(React.memo(Recommend))