import React from 'react'
import { SongList, SongItem } from "./style";
import { getName } from '../../api/utils';


const SongerList = React.forwardRef((props, refs) => {
    //点击单曲执行响应的回调函数
    const selectItem = (e, index) => {
        console.log(index)
    }
    //加收藏
    const collect = (count) => {
        return(
            <div className="add_list">
                <i className="iconfont">&#xe62d;</i>
                <span>收藏({Math.floor(count/1000)/10}万)</span>
            </div>
        )
    }
    const totalCount = songs.length;
    const songList = (list) => {
        let res = [];
        const {collectCount, showCollect, songs} = props;


        for(let i = 0; i < list.length; i++) {
            let item = list[i]
            return (
                res.push(<li key={item.id} onClick = {(e) => selectItem(e, i)}>
                    <div>
                        <div className='index'>{i+1}</div>
                        <div className="info">
                            <span>{item.name}</span>
                            <span>
                            { item.ar ? getName(item.ar): getName(item.artists) } - { item.al ? item.al.name : item.album.name}
                            </span>
                        </div>
                    </div>
                </li>)
            )
        }
    }
    
    return (
        <SongList ref={refs} showBackground={props.showBackground}>
            <div className="first_line">
                <div className="play_all"  onClick={(e) => selectItem(e, 0)}>
                    <i className="iconfont">&#xe6e3;</i>
                    <span>播放全部 <span className="sum">(共{totalCount}首)</span></span>
                </div>
                {showCollect? collect(count) : null}
            </div>
            <SongItem>
                {songList(songs)}
            </SongItem>
        </SongList>
    )
})

export default React.memo(SongsList);