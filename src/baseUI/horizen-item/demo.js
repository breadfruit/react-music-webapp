
import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import Scroll from '../scroll/index'
import styled from 'styled-components'
import { List } from 'immutable'
function Horizen (props) {
    const Category = useRef();
    const {list, oldVal, title} = props;
    const { handleClick } = props;

    useEffect(() => {
        let categoryDOM = Category.current;
        let tagElems = categoryDOM.querySeletorAll('span');
        let totalWidth = 0;
        Array.from(tagElems).forEach(el=> {
            //offsetWidth返回一个元素的布局宽度。
            totalWidth += el.offsetWidth;
        });
        categoryDOM.style.width = `${totalWidth}px`
    }, [])

    return (
        <Scroll direction={"horizental"}>
            <div>
                <List>
                    <span>{title}</span>
                    {
                        list.map((item) => {
                            <ListItem
                            key={item.key}
                            className={`${item.selected ? 'selected': ''}`}
                            onClick={() => handleClick(item.key)}
                            >{item.name}
                            </ListItem>
                        })
                    }
                </List>
            </div>
        </Scroll>
    )
}

const List = styled.div `
    display: flex;
    align-items: center;
    height: 30px;
    overflow: hidden;
    >span:first-of-type{
        display: block;
        flex: 0 0 block;
        padding: 5px 0;
        margin-right: 5px;
        color: grey;
        font-size: ${style['theme-size-m']};
        vertical-align: middle
    }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected{
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`


Horizen.defaultProps = {
    list: [],
    title: '',
    oldVal: '',
    handleClick: null
}

Horizen.prototype = {
    list: PropTypes.array,
    title: PropTypes.string,
    oldVal: PropTypes.string,
    handleClick: PropTypes.func
}