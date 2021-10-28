import React, { useEffect } from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import {connect} from 'react-redux'
import * as actionTypes from './store/constant'
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
const mapStateToProps = (state) => {

}

const mapDispatchProps = (state, action) => {

}

export default React.memo (Recommend);