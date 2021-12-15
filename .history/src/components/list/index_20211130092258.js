import React from 'react';
import { 
  ListWrapper,
  ListItem,
  List
} from './style';
import LazyLoad from "react-lazyload";
import { withRouter } from 'react-router-dom';

function RecommendList(props) {
    const enterDetail = (id) => {
      props.history.push(`/recommend/${id}`)
    }
    return (
      <ListWrapper>
        <h1 className="title">推荐歌单</h1>
        <List>
          {
            props.recommendList.map(item => {
              return (
                //   大容器
                <ListItem key={item.item_id} onClick={() => enterDetail(item.item_id)}>
                    {/* 小容器 */}
                  <div className="img_wrapper">
                    {/* 遮罩 */}
                    <div className="decorate"></div>
                    {/* 图片懒加载 */}
                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music"/>}>
                      <img src={item.reimgurl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                    </LazyLoad>
                    {/* 播放量 */}
                    <div className="play_count">
                      <i className="iconfont play">&#xe885;</i>
                      <span className="count">{Math.floor(item.playCount/10000)}万</span>
                    </div>
                  </div>
                  <div className="desc">{item.name}</div>
                </ListItem>
              )
            })
          }
        </List>
      </ListWrapper>
    );
    }
   
  export default withRouter(React.memo(RecommendList));