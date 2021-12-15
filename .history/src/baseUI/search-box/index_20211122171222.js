import React, {useRef, useState, useEffect, useMemo} from 'react';
import styled from'styled-components';
import style from '../../assets/global-style';
import {SearchBoxWrapper, displayStyle} from './style'

const SearchBox = (props) => {
    const queryRef = useRef();
    

    const handleChange = () => {

    }

    const clearQuery = () => {

    }
    return (
        <SearchBoxWrapper>
            <i className="iconfont icon-back" onClick={() => props.back ()}>&#xe655;</i>
            <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange}/>
            <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>&#xe600;</i>
        </SearchBoxWrapper>
    )
}