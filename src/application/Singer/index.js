import React, { useState, useEffect, useRef, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { Container } from "./style";
import { ImgWrapper, CollectButton, SongListWrapper, BgLayer } from "./style";
import Header from "../../baseUI/header/index";
import Scroll from "../../baseUI/scroll/index";
import SongsList from "../SongList";
import Loading from "./../../baseUI/loading/index";
import { getSingerInfo, changeEnterLoading } from "./store/actionCreators";
import { connect } from 'react-redux'

function Singer(props) {
    const setShowStatusFalse = useCallback(() => {
        setShowStatus(false);
    }, []);

    const {
        artist: immutableArtist,
        songs: immutableSongs,
        loading,
    } = props;

    const { getSingerDataDispatch } = props;
    
    const id = props.match.params.id;
    useEffect(() => {
        getSingerDataDispatch(id);
    }, [getSingerDataDispatch, id])


    const artist = immutableArtist ? immutableArtist.toJS() : [];
    const songs = immutableSongs ? immutableSongs.toJS() : [];

    const [showStatus, setShowStatus] = useState(true);

    const collectButton = useRef();
    const imageWrapper = useRef();
    const songScrollWrapper = useRef();
    const songScroll = useRef();
    const header = useRef();
    const layer = useRef();
    // 图片初始高度
    const initialHeight = useRef(0);

    // 往上偏移的尺寸，露出圆角
    const OFFSET = 5;
    

    useEffect(() => {    
        let h = imageWrapper.current.offsetHeight;
        initialHeight.current = h;
        songScrollWrapper.current.style.top = `${h - OFFSET}px`;
        //把遮罩先放在下面，以裹住歌曲列表
        layer.current.style.top = `${h - OFFSET}px`;
        songScroll.current.refresh();
        console.log('songs----',songs)
        // eslint-disable-next-line
    }, []);

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => props.history.goBack()}
        >
            <Container>
                <Header title={"头部"}></Header>
                <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
                    <div className="filter"></div>
                </ImgWrapper>
                <CollectButton ref={collectButton}>
                    <i className="iconfont">&#xe62d;</i>
                    <span className="text">收藏</span>
                </CollectButton>
                <BgLayer ref={layer}></BgLayer>
                <SongListWrapper ref={songScrollWrapper} >
                    <Scroll ref={songScroll}>
                        <SongsList
                            songs={songs}
                            showCollect={true}
                        ></SongsList>
                    </Scroll>
                </SongListWrapper>
                {loading ? (<Loading></Loading>) : null}
            </Container>
        </CSSTransition>
    )
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
    artist: state.getIn(["singerInfo", "artist"]),
    songs: state.getIn(["singerInfo", "songsOfArtist"]),
    loading: state.getIn(["singerInfo", "loading"]),
});
// 映射dispatch到props上
const mapDispatchToProps = dispatch => {
    return {
        getSingerDataDispatch(id) {
            dispatch(changeEnterLoading(true));
            dispatch(getSingerInfo(id));
        }
    };
};

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));