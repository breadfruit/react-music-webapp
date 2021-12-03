import React, {useRef, useState, useEffect, useMemo} from 'react';
import styled from'styled-components';
import style from '../../assets/global-style';
import {SearchBoxWrapper} from './style'
import { debounce } from '../../api/utils';
const SearchBox = (props) => {
    const queryRef = useRef();
    const [query, setQuery] = useState('');
    
    const {
        newQuery ,
        handleQuery
    } = props


    const displayStyle = query ? {display: 'block'}: {display: 'none'};
    const handleChange = () => {

    }

    const clearQuery = () => {

    }

    //处理业务的开始
    //input出现光标
    useEffect(() => {
        queryRef.current.focus()
    })

    //缓存
    let handleQueryDebounce = useMemo (() => {
        return debounce (handleQuery, 500);
      }, [handleQuery]);



     
    useEffect (() => {
        // 注意防抖
        handleQueryDebounce (query);
    }, [query]); 

    return (
        <SearchBoxWrapper>
            <i className="iconfont icon-back" onClick={() => props.back ()}>&#xe655;</i>
            <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange}/>
            <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>&#xe600;</i>
        </SearchBoxWrapper>
    )
}