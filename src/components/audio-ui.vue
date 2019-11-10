<template>
  <div class="di main-wrap" v-loading="audio.waiting">
    <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
    <audio
      ref="audio"
      class="dn"
      :src="url"
      :preload="audio.preload"
      @play="onPlay"
      @error="onError"
      @waiting="onWaiting"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    ></audio>
    <div>
      <div class="palyor" @click="startPlayOrPause">
          <img v-if="!audio.playing" width="30px" src="../assets/start.png">
          <img v-if="audio.playing" width="30px" src="../assets/pause.png">
      </div>
      <span class="time-text">{{ audio.currentTime | formatSecond}}</span>
      <el-slider
        v-show="!controlList.noProcess"
        v-model="sliderTime"
        :format-tooltip="formatProcessToolTip"
        @change="changeCurrentTime"
        class="slider"
      ></el-slider>
      <span class="time-text">{{ audio.maxTime | formatSecond }}</span>
    </div>
  </div>
</template>

<script>
function realFormatSecond(second) {
  var secondType = typeof second;

  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;

    return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
  } else {
    return "00:00";
  }
}

export default {
  props: {
    theSpeeds: {
      type: Array,
      default() {
        return [1, 1.5, 2];
      }
    },
    theControlList: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    }
  },
  name: "VueAudio",
  //   computed: {
  //     aUrl: () => {
  //       return this.url;
  //     }
  //   },
  data() {
    return {
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false,
        muted: false,
        speed: 1,
        waiting: true,
        preload: "auto"
      },

      sliderTime: 0,
      volume: 100,
      speeds: this.theSpeeds,

      controlList: {
        // 不显示下载
        noDownload: false,
        // 不显示静音
        noMuted: true,
        // 不显示音量条
        noVolume: false,
        // 不显示进度条
        noProcess: false,
        // 只能播放一个
        onlyOnePlaying: false,
        // 不要快进按钮
        noSpeed: true
      }
    };
  },
  methods: {
    setControlList() {
      let controlList = this.theControlList.split(" ");
      controlList.forEach(item => {
        if (this.controlList[item] !== undefined) {
          this.controlList[item] = true;
        }
      });
    },
    // 音量条toolTip
    formatVolumeToolTip(index) {
      return "音量条: " + index;
    },
    // 进度条toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt((this.audio.maxTime / 100) * index);
      return "进度条: " + realFormatSecond(index);
    },
    // 音量改变
    changeVolume(index = 0) {
      this.$refs.audio.volume = index / 100;
      this.volume = index;
    },
    // 播放跳转
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    },
    startPlayOrPause() {
      return this.audio.playing ? this.pausePlay() : this.startPlay();
    },
    // 开始播放
    startPlay() {
      this.$refs.audio.play();
    },
    // 暂停
    pausePlay() {
      this.$refs.audio.pause();
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
    },
    // 当发生错误, 就出现loading状态
    onError() {
      this.audio.waiting = true;
    },
    // 当音频开始等待
    onWaiting(res) {
      console.log(res);
    },
    // 当音频开始播放
    onPlay(res) {
      this.audio.playing = true;
      this.audio.loading = false;

      if (!this.controlList.onlyOnePlaying) {
        return;
      }

      let target = res.target;

      let audios = document.getElementsByTagName("audio");

      [...audios].forEach(item => {
        if (item !== target) {
          item.pause();
        }
      });
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      this.audio.waiting = false;
      this.audio.maxTime = parseInt(res.target.duration);
    }
  },
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second);
    }
  },
  created() {
    this.setControlList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.time-text {
  color: #999;
  font-size: 9pt;
  margin: 0 8pt;
}
.main-wrap {
  padding: 10px 15px;
  .palyor {
    width: 30px;
    height: 30px;
    float: left;
    margin-top: 13px;
    cursor: pointer;
  }
}
.slider {
  display: inline-block;
  width: 130pt;
  position: relative;
  top: 14px;
  margin-left: 15px;
}

.di {
  display: inline-block;
}

.download {
  color: #409eff;
  margin-left: 15px;
}

.dn {
  display: none;
}
</style>

<style lang="scss">
.main-wrap {
  .el-slider__button-wrapper {
    border-radius: 50%;
    border: 1px solid rgb(241, 241, 241);
    background-color: rgb(255, 255, 255);
    height: 12pt;
    width: 12pt;
    line-height: 10pt;
    margin-top: 5pt;
    .el-tooltip {
      height: 1px;
      width: 1px;
      border-radius: 50%;
      border-color: #ffc300;
      background-color: #ffc300;
    }
  }
  .el-slider__runway {
    height: 2px;
  }
  .el-slider__bar {
    height: 2px;
    background-color: #ffc300;
  }
  .el-button--text {
    color: #ffc300 !important;
  }
}
</style>
