import styled from 'styled-components';
import style from '../../assets/global-style';
//transform-orifin
//如果定义了两个或更多值并且没有值的关键字，或者唯一使用的关键字是center，
//则第一个值表示水平偏移量，第二个值表示垂直偏移量。
export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${props => props.play > 0 ? "60px": 0};
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear{
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active{
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit{
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active{
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`
//图片有遮罩
export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  transform-origin: top;
  background: url(${props => props.bgUrl});
  background-size: cover;
  z-index: 80;
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.3);
  }
`

export const CollectButton = styled.div`
  position: absolute;
  left: 0; right: 0;
  margin: auto;
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  margin-top: -55px;
  z-index:80;
  background: ${style["theme-color"]};
  color: ${style["font-color-light"]};
  border-radius: 20px;
  text-align: center;
  font-size: 0;
  line-height: 40px;
  .iconfont{
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    vertical-align: 1px;
  }
  .text {
    display: inline-block;
    font-size:14px;
    letter-spacing: 5px;
  }
`

export const SongListWrapper = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  >div{
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`

export const BgLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  z-index: 80;
`