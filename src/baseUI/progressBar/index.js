import React, {useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import { prefixStyle } from './../../api/utils';

const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner{
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, .3);
    .progress{
      position: absolute;
      height: 100%;
      background: ${style["theme-color"]};
    }
    .progress-btn-wrapper{
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn{
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style["border-color"]};
        border-radius: 50%;
        background: ${style["theme-color"]};
      }
    }
  }
`

function ProgressBar(props){
  const progressBar = useRef();
  const progress = useRef();
  const progressBtn = useRef();
  const [touch, setTouch] = useState({});

  const { percent } = props;

  const transform = prefixStyle('transform');

  const progressBtnWidth = 16;  

  useEffect(() => {
    if(percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progress.current.style.width = `${offsetWidth}px`;
      progressBtn.current.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
    }
    // eslint-disable-next-line
  }, [percent])

  const _offset = (offsetWidth) => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  }

//   const _changePercent = () => {
//     const barWidth = progressBar.current.clientWidth - progressBtnWidth;
//     const curPercent = progress.current.clientWidth / barWidth;
//     props.percentChange(curPercent);
//   }

  const progressClick = (e) => {
    console.log('e', e)
    const rect = progressBar.current.getBoundingClientRect();
    console.log('rect', rect)
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    // _changePercent(percent);
  }


  const progressTouchEnd = (e) => {
    console.log('progressTouchEnd', e)
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch);
    // _changePercent();
  }

  const progressTouchStart = (e) => {
      const startTouch = {};
      //可以操作
      startTouch.initiated = true;
      //相对于文档页面偏移距离
      startTouch.startX = e.touches[0].pageX;
      //当前进度
      startTouch.left = progress.current.clientWidth;
      setTouch(startTouch)
  }

  //当前进度进行偏移,过渡，transform有兼容性问题
  const progressTouchMove = (e) => {
    if(!touch.initiated) return;
    //计算触摸前后的距离
    const deltaX = e.touches[0].pageX - touch.startX;
    //当前最长的进度必须考虑到按钮的宽度，不能计算在内
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    //考虑临界情况，取最小值
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth)
    //进行数据更新
    _offset(offsetWidth)

  }



  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div className="progress-btn-wrapper" ref={progressBtn}
            onTouchStart={progressTouchStart}
            onTouchMove={progressTouchMove}
            onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  )
}

export default React.memo(ProgressBar);