import React from 'react';
import { TopDesc, Menu } from './style';
import SongsList from '../../application/SongList/';

function AlbumDetail(props) {
  const { currentAlbum, pullUpLoading } = props;

  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.logo}>
        <div className="background">
          <div className="filter"></div>
        </div>

        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.logo} alt=""/>
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            {/* <span className="count">{Math.floor(currentAlbum.subscribedCount/1000)/10}万</span> */}
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.dissname}</div>
          {/* 个人资料 */}
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.headurl} alt=""/>
              <img src={currentAlbum.ifpicurl} alt=""/>
            </div>
            <div className="name">{currentAlbum.nickname || currentAlbum.nick}</div>
          </div>
        </div>
      </TopDesc>
    )
  };

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    )
  };
  const renderSongList = () => {
    return (
      <SongsList
        songs={currentAlbum.songlist}
        collectCount={currentAlbum.visitnum}
        showCollect={true}
        loading={pullUpLoading}
        musicAnimation={props.musicAnimation}
        showBackground={true}
      ></SongsList>
    )
  };

  return (
    <div>
      { renderTopDesc() }
      { renderMenu() }
      { renderSongList() }
    </div>
  )
}
export default React.memo(AlbumDetail);