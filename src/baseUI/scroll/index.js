import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle, useMemo } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from 'styled-components';
import { debounce } from "../../api/utils";

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`

export const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`



//而函数式组件天生不具备被上层组件直接调用 ref 的条件，
//因此需要用 React 当中一些特殊的方式来处理，即使用 forwardRef 进行包裹。
const Scroll = forwardRef((props, ref) => {

    const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;

    const { pullUp, pullDown, onScroll } = props;

    //better-scroll 实例对象
    const [bScroll, setBScroll] = useState ();
    //current 指向初始化 bs 实例需要的 DOM 元素 
    const scrollContaninerRef = useRef ();

    //接下来创建 better-scroll，
    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === "horizental",
            scrollY: direction === "vertical",
            probeType:3,
            click: click,
            bounce:{
              top: bounceTop,
              bottom: bounceBottom
            }
        })
        setBScroll(scroll);
        return () => {
            setBScroll(null);
        }

    }, [onScroll, bScroll])

    useEffect(() => {
        if(!bScroll || onScroll) return;
        bScroll.on ('scroll', (scroll) => {
            onScroll (scroll);
        })
        return () => {
            bScroll.off('scroll')
        }
    }, [onScroll, bScroll])
    //进行上拉到底的判断，调用上拉刷新的函数
    useEffect(() => {
        if(!bScroll || !pullUp) return
        bScroll.on('scrollEnd', () => {
            if(bScroll.y > bScroll.maxScrollY + 100){
                //调用上拉刷新的函数
                pullUp ();
            }
        });
        return () => {
            bScroll.off('scrollEnd')
        }
    },[pullUp, bScroll])

    //进行下拉的判断，调用下拉刷新的函数
    useEffect(() => {
        if(!bScroll || !pullDown) return
        bScroll.on('touchEnd', (pos) => {
            if(pos.y >50){
                pullDown();
            }
        })
        return () => {
            bScroll.off('touchEnd')
        }

    },[pullDown, bScroll])

    //useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值
    //让外部组件通过ref对组件进行操作
    useImperativeHandle(ref, () => ({
        refresh() {
            if(bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0,0)
            }
        },
        getBScroll() {
            if(bScroll){
                return bScroll
            }
        }
    }))
    return (
        <ScrollContainer ref={scrollContaninerRef}>
          {props.children}
        </ScrollContainer>
    );
})





//基本配置
Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    click: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,
    bounceBottom: PropTypes.bool,
    pullUp: PropTypes.func,// 上拉加载逻辑
    pullDown: PropTypes.func,// 下拉加载逻辑
}

//设置默认值
Scroll.defaultProps = {
    // 滚动的方向
    direction: 'vertical',
    // 是否支持点击
    click: true,
    //是否刷新
    refresh: true,
    //滑动触发的回调函数
    onScroll: null,
    //是否显示上拉 loading 动画
    pullUpLoading: false,
    //是否显示下拉 loading 动画
    pullDownLoading: false,
    // 是否支持向上吸顶
    bounceTop: true,
    // 是否支持向下吸底
    bounceBottom: true,
    pullUp: null,
    pullDown: null,
}


export default Scroll;
