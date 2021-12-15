const timeExp = /\[(\d{2,}):(\d{2})(?:[\.\:](\d{2,3}))?]/g

const STATE_PAUSE = 0
const STATE_PLAYING = 1


export default class  Lyric {
    constructor(lrc, hanlder = noop, speed = 1) {
        this.lrc = lrc;
        this.lines = [];
        this.hanlder = hanlder;
        this.state = STATE_PAUSE;
        this.curLineIndex = 0;// 当前播放歌词所在的行数
        this.startStamp = 0;

    }   
    _initLines () {
        const lines =this.lrc.split('\n');
        for(let i = 0; i < lines.length; i++) {
            const line = this.lines[i];
            //获得对应时间戳的文本
            let result = timeExp.exec(line);
            if(!result) continue;
            const txt = line.replace(timeExp, '').trim();
            if (txt) {
                if (result[3].length === 3) {
                  result[3] = result[3]/10;//[00:01.997] 中匹配到的 997 就会被切成 99
                }
                this.lines.push ({
                  time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,// 转化具体到毫秒的时间，result [3] * 10 可理解为 (result / 100) * 1000
                  txt
                });
            }
        }
    }
    this.lines.sort ((a, b) => {
        return a.time - b.time;
      });// 根据时间排序
}