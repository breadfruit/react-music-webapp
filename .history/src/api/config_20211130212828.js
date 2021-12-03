import axios from "axios";

export const baseUrl = "http://localhost:3200";

// axios的实例及拦截器配置
const axiosInstance = axios.create({
  baseURL: baseUrl
});

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, "网络错误");
  }
);

export { axiosInstance };

//歌手种类
export const categoryTypes = [
  {
    name: '全部',
    key: {
      area: -100,
      sex: -100
    }
  },
  {
    name: "华语男",
    key: {
      area: 200,
      sex: 0
    }
  },
  {
    name: "华语女",
    key: {
      area: 200,
      sex: 1
    }
  },
  {
    name: "华语组合",
    key: {
      area: 200,
      sex: 2
    }
  },
  {
    name: "欧美男",
    key: {
      area: 5,
      sex: 0
    }
  },
  {
    name: "欧美女",
    key: {
      area: 5,
      sex: 1
    }
  },
  {
    name: "欧美组合",
    key: {
      area: 5,
      sex: 2
    }
  },
  {
    name: "日本男",
    key: {
      area: 5,
      sex: 0
    }
  },
  {
    name: "日本女",
    key: {
      area: 5,
      sex: 1
    }
  },
  {
    name: "日本组合",
    key: {
      area: 5,
      sex: 2
    }
  },
  {
    name: "韩国男",
    key: {
      area: 3,
      sex: 0
    }
  },
  {
    name: "韩国女",
    key: "7002"
  },
  {
    name: "韩国组合",
    key: "7003"
  },
  {
    name: "其他男歌手",
    key: "4001"
  },
  {
    name: "其他女歌手",
    key: "4002"
  },
  {
    name: "其他组合",
    key: "4003"
  }
];


export const sexTypes = [
  {
    name: '全部',
    key: -100
  },
  {
    name: '男',
    key: 0
  },
  {
    name: '女',
    key: 1
  },
  {
    name: '组合',
    key: 2
  }
]
//歌手首字母
export const alphaTypes = [
  {
    key: "A",
    name: 1
  },
  {
    key: "B",
    name: 2
  },
  {
    key: "C",
    name: 3
  },
  {
    key: "D",
    name: 4
  },
  {
    key: "E",
    name: 5
  },
  {
    key: "F",
    name: 6
  },
  {
    key: "G",
    name: 7
  },
  {
    key: "H",
    name: 8
  },
  {
    key: "I",
    name: 9
  },
  {
    key: "J",
    name: 10
  },
  {
    key: "K",
    name: 11
  },
  {
    key: "L",
    name: 12
  },
  {
    key: "M",
    name: 13
  },
  {
    key: "N",
    name: 14
  },
  {
    key: "O",
    name: 15
  },
  {
    key: "P",
    name: 16
  },
  {
    key: "Q",
    name: 17
  },
  {
    key: "R",
    name: 18
  },
  {
    key: "S",
    name: 19
  },
  {
    key: "T",
    name: 20
  },
  {
    key: "U",
    name: 21
  },
  {
    key: "V",
    name: 22
  },
  {
    key: "W",
    name: 23
  },
  {
    key: "X",
    name: 24
  },
  {
    key: "Y",
    name: 25
  },
  {
    key: "Z",
    name: 26
  }
];

//排行榜编号
export const RankTypes = {
  "0": "云音乐新歌榜",
  "1": "云音乐热歌榜",
  "2": "网易原创歌曲榜",
  "3": "云音乐飙升榜",
  "4": "云音乐国电榜",
  "5": "UK排行榜周榜",
  "6": "美国Billboard周榜",
  "7": "KTV唛榜",
  "8": "iTunes榜",
  "9": "Hit FM Top榜",
  "10": "日本Oricon周榜",
  "11": "韩国Melon排行榜周榜",
  "12": "韩国Mnet排行榜周榜",
  "13": "韩国Melon原声周榜",
  "14": "中国TOP排行榜（港台榜）",
  "15": "中国TOP排行榜（内地榜）",
  "16": "香港电台中文歌曲龙虎榜",
  "17": "华语金曲榜",
  "18": "中国嘻哈榜",
  "19": "法国 NRJ Vos Hits 周榜",
  "20": "台湾Hito排行榜",
  "21": "Beatport全球电子舞曲榜",
  "22": "云音乐ACG音乐榜",
  "23": "江小白YOLO云音乐说唱榜"
};

//歌单一页限定歌曲数量
export const ONE_PAGE_COUNT = 50;

//顶部的高度
export const HEADER_HEIGHT = 45;

//播放模式
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
};

// 倍速播放配置
export const list = [
  {
    key: 0.75,
    name: "x0.75"
  },
  {
    key: 1,
    name:"x1"
  }, 
  {
    key: 1.25,
    name:"x1.25"
  }, 
  {
    key: 1.5,
    name:"x1.5"
  }, 
  {
    key: 2,
    name:"x2"
  }
]