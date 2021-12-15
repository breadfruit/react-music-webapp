import axios from 'axios';
import { axiosInstance } from "./config";
const CancelToken = axios.CancelToken 
const source = CancelToken.source()

//获取轮播图
export const getBannerRequest = () => {
  return axiosInstance.get ('/getDigitalAlbumLists');
}


// export const  getBannerRequest = () => {
//   return axiosInstance.get('/banner', {
//     cancelToken: source.token
//   }).catch(function(thrown) {
//       if(axios.isCancel(thrown)) {
//           console.log('Request canceled', thrown.message)
//       } else {
//           // handle error
//       }
//   })
// }


//获取推荐歌单
export const getRecommendListRequest = () => {
  return axiosInstance.get ('/getRecommend');
}

//实现取消发送
// export const getRecommendListRequest = () => {
//     return axiosInstance.get('/personalized', {
//       cancelToken: source.token
//     }).catch(function(thrown) {
//         if(axios.isCancel(thrown)) {
//             console.log('Request canceled', thrown.message)
//         } else {
//             // handle error
//         }
//     })
// }

// source.cancel('取消上次请求')
//获取热门歌手
//可选参数 : limit: 取出数量 , 默认为 50
//offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 
export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}
//歌手分类列表
//localhost:4000/artist/list?type=1&area=7&initial=b
//type 取值: -1:全部 1:男歌手 2:女歌手 3:乐队
//area 取值: -1:全部 7华语 96欧美 8:日本 0:其他
//initial取值: 名字首字母
//limit   默认30
//offset : 偏移数量 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 
export const getSingerListRequest= (area, initial, offset) => {
  return axiosInstance.get(`/artist/list?area=${area.toLowerCase()}&initial=${initial}&offset=${offset}`);
}
//获取排行榜
export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};


//获取歌单详情
// 必选参数 : id : 歌单 id
//可选参数 : s : 歌单最近的 s 个收藏者,默认为8
export const getAlbumDetailRequest = id => {
  return axiosInstance.get(`/getSongListDetail?disstid=${id}`);
};

//获取单个歌曲播放链接
export const getOneMusicPlayerRequest = () => {
  //例子getMusicPlay/songmid=0025NhlN2yWrP4

  return axiosInstance.get(`/getMusicPlay/songmid=`)
}
//获取多个歌曲播放链接
export const getMoreMusicPlayerRequest = (songlist) => {
    //现将数组转为字符串然后在利用，尽心分割
} 


//获取歌手详情
export const getSingerInfoRequest = id => {
  return axiosInstance.get(`/artists?id=${id}`);
};

//顶部的高度
export const HEADER_HEIGHT = 45;

//播放器开发



//获取歌曲歌词
export const getLyricRequest = id => {
  return axiosInstance.get (`/lyric?id=${id}`);
};


export const getSongDetailRequest = id => {
    return axiosInstance.get(`/song/detail?ids=${id}`);
};


export const getHotKeyWordsRequest = () => {
    return axiosInstance.get(`/search/hot`)
}


export const getSuggestListRequest  = (query) => {
    return axiosInstance.get(`/search/suggest?keywords = ${query}`)
}

export const getResultSongsListRequest = (query) => {
    return axiosInstance.get(`/search?keywords=${query}`)
}
//手机号码登录
export const getLoginByPhoneRequest = (query) => {
  return axiosInstance.post(`/login/cellphone`)
}
//邮箱密码登录
export const getLoginByEmailRequest = (query) => {
  return axiosInstance.post()
}

//二维码扫码登录
export const getLoginByQRRequest = () => {

}

//注册
export const getResigterRequest = () => {

}
