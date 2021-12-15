
import { axiosOtherInstance, axiosInstance } from "./config";
// const CancelToken = axios.CancelToken 
// const source = CancelToken.source()

//获取轮播图
export const getBannerRequest = () => {
  return axiosOtherInstance.get("/banner");
};

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
  return axiosOtherInstance.get("/personalized");
};
// export const getRecommendListRequest = () => {
//   return  axiosInstance.get ('/getRecommend');
// }

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
// export const getHotSingerListRequest = (count) => {
//   return axiosInstance.get(`/top/artists?offset=${count}`);
// }
////获取热门歌手
export const getHotSingerListRequest = count => {
  return axiosOtherInstance.get(`/top/artists?offset=${count}`);
};
// export const getHotSingerListRequest = () => {
//   return axiosInstance.get('/getSingerList')
// }
//歌手分类列表
//localhost:4000/artist/list?type=1&area=7&initial=b
//type 取值: -1:全部 1:男歌手 2:女歌手 3:乐队
//area 取值: -1:全部 7华语 96欧美 8:日本 0:其他
//initial取值: 名字首字母
//limit   默认30
//offset : 偏移数量 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 
export const getSingerListRequest = (area, initial, offset) => {
  return axiosOtherInstance.get(`/artist/list?area=${area.toLowerCase()}&initial=${initial}&offset=${offset}`);
}

//area  地区
//genre 类型
//index 歌手首字母
//sex 歌手性别
// export const getSingerListRequest = (area =-100, genre=-100, index=-100, sex=-100) => {
//   return axiosOtherInstance.get(`/getSingerList?area=${area}&sex=${genre}&index=${index}&genre=${sex}`)
// }
//获取排行榜
export const getRankListRequest = () => {
  return axiosOtherInstance.get(`/toplist/detail`);
};


//获取歌单详情
// 必选参数 : id : 歌单 id
//可选参数 : s : 歌单最近的 s 个收藏者,默认为8
export const getAlbumDetailRequest = id => {
  return axiosOtherInstance.get(`/playlist/detail?id=${id}`);
};



//获取歌手详情
export const getSingerInfoRequest = id => {
  return axiosOtherInstance.get(`/artists?id=${id}`);
};

//顶部的高度
export const HEADER_HEIGHT = 45;


//获取歌曲歌词
export const getLyricRequest = id => {
  return axiosOtherInstance.get(`/lyric?id=${id}`);
};


export const getSongDetailRequest = id => {
  return axiosOtherInstance.get(`/song/detail?ids=${id}`);
};


export const getHotKeyWordsRequest = () => {
  return axiosOtherInstance.get(`/search/hot`)
}


export const getSuggestListRequest = (query) => {
  return axiosOtherInstance.get(`/search/suggest?keywords = ${query}`)
}

export const getResultSongsListRequest = (query) => {
  return axiosOtherInstance.get(`/search?keywords=${query}`)
}

//邮箱登录
export const getLoginByEmailRequest = async (email, password) => {
  const res = await axiosOtherInstance.post(`/login?email=${email}&password=${password}`);
  if(res.code === 200) {
    var uid = res.account.id;
    const res1 = await axiosInstance.get(`/api/user/getuserinfo/${uid}`);
    console.log('邮箱登录---',res1)
  }else {
    console.log('邮箱登录失败')
  }
}
//手机登录
export const getLoginByPhoneRequest = async (phone, password) => {

  var uid
  //离线搜索
  const res1 = await axiosInstance.get(`/api/user/getuserinfo/${uid}`);
  if(res1.code == 0) {
      
  }else {
    //本地找不到用户，先在线获取然后同步到数据库
    const res2 = await axiosOtherInstance.post(`/login/cellphone?phone=${phone}&password=${password}`);
    if(res2.loginType) {
        uid = res2.account.id;
        const res1 = await axiosInstance.get(`/api/user/getuserinfo/${uid}`);
    }
    
  }
}

//二维码扫码登录
export const getLoginByQRRequest = async () => {
  await getLoginStatusRequest()

  const res = await axiosOtherInstance.post(`/login/qr/key?timerstamp=${Date.now()}`);
  const key = res.data.unikey;
  const res2 = await axiosOtherInstance.post(`/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`)
  const qrimg = res2.data.qrimg;
  var timer;
  //浏览器进行长轮询服务器端是否登录
  timer = setInterval(async () => {
    const statusRes = await checkStatusRequest(key);

    if (statusRes !== undefined) {
      if (statusRes.code === 800) {
        // alert('二维码已过期,请重新获取')
        console.log('二维码已过期,请重新获取')
        clearInterval(timer)
      }
      if (statusRes.code === 803) {
        // 这一步会返回cookie
        clearInterval(timer)
        // alert('授权登录成功')
        console.log('授权登录成功');
        //将cookie存起来下次发送的时候进行携带
        console.log(statusRes)
        const { cookie } = statusRes;
        console.log('cookies----', cookie)


        await getLoginStatusRequest()
        // const userInfo = await getLoginStatusRequest().data.profile;
        // console.log(userInfo)
        // //进行用户资料数据库插入操作
        // const {nickname, userId, userName, gender, phone, password, avatarUrl, backgroundUrl, accountType,  birthday, signature} = userInfo;

        // if(checkHaveUser()){

        // }else {

        // }

      }
    }
  }, 3000)

  return qrimg
}
//检测登录状态
export const checkStatusRequest = async (key) => {
  const res = await axiosOtherInstance.post(`/login/qr/check?key=${key}&timerstamp=${Date.now()}`)
  return res.data
}
export const checkHaveUser = () => {

}

//获得登录状态
export const getLoginStatusRequest = async () => {
  const res = await axiosOtherInstance.post(`/login/status?timerstamp=${Date.now}`);
  return res.data
}

//注册
export const getResigterRequest = () => {

}


//获取