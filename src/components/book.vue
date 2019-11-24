<template>
  <div>
    <div class="book" v-if="!stratReading">
      <div class="book-title">
        <div class="book-title-icon"></div>
        <span class="book-title-name">{{name}} 在芒果少儿英语</span>
      </div>
      <div class="book-des">
        <span>今天第</span>
        <i class="day-number">{{day}}</i>
        <span>天，完成了第</span>
        <i class="day-number">{{count}}</i>
        <span>个作品</span>
      </div>
      <div @click="goReading" class="book-body">
        <img class="play-img" :src="playImg" />
        <img class="player-icon" src="@/assets/start_reading.png" width="40px" />
      </div>
      <div class="book-tips">点击收听{{name}}小朋友的精彩作</div>
      <app-footer :des="'下载查看更多绘本'" :title="'芒果少儿英语'"></app-footer>
    </div>
    <div class="reading" v-if="stratReading">
      <div class="reading-back">
        <img @click="goBack" src="@/assets/back.png" width="20px" />
      </div>
      <div class="reading-step">{{readingIndex}} / {{data.length}}</div>
      <div class="reading-swipe">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide :key="index" v-for="(item,index) in data">
            <div class="breading-img">
              <img :src="item.backImg" class="background-img" />
            </div>
            <div class="reading-name">{{item.value}}</div>
          </swiper-slide>
          <audio :src="currentAudio" autoplay id="audio" @ended="audioEnd"></audio>
        </swiper>
      </div>
      <div class="reading-downlaod" v-if="readingIndex !== data.length">立即下载</div>
      <div class="reading-downlaod" v-if="readingIndex === data.length">快来和我一起读绘本吧</div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http.js";
import AudioUi from "./audio-ui.vue";
import AppFooter from "./common/footer.vue";
import Swiper from "swiper";

export default {
  name: "Share",
  components: {
    AudioUi,
    AppFooter
  },
  data() {
    return {
      name: "",
      day: "",
      count: "",
      data: [],
      back: "<",
      playImg: "",
      readingIndex: 0,
      autoTime: 6000,
      currentAudio: "",
      stratReading: false,
      swiperOption: {
        on: {
          slideChange: this.handleChange
        }
      },
      swipeInterval: null
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getInfo();
    },
    getInfo() {
      let api = `/course/service/book/share`;
      let params = {
        number: "541486963491839"
      };
      http.get(api, params).then(res => {
        if (res.code === 0) {
          const data = res.data;
          this.name = data.nickName;
          this.day = data.registerDays;
          this.count = data.studyCount;
          this.playImg = data.thumbUrl;

          data.pages.forEach(value => {
            const item = {
              backImg: value.imgUrl,
              value: value.content,
              audioUrl: value.audioUrl,
              userAudioUrl: value.userAudioUrl
            };
            this.data.push(item);
          });
          this.readingIndex = 1;
          this.currentAudio = this.data[0].audioUrl;
        }
      });
    },
    goReading() {
      this.stratReading = true;
      this.readingIndex = 1;
      this.currentAudio = this.data[0].audioUrl;
    },
    handleChange() {
      const index = this.swiper.activeIndex;
      this.readingIndex = index + 1;
      this.currentAudio = this.data[index].audioUrl;
      if (this.swipeInterval) {
        clearInterval(this.swipeInterval);
      }
    },
    goBack() {
      this.stratReading = false;
    },
    audioEnd() {
      this.swiper.slideNext();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.book {
  .book-title {
    padding: 0 10%;
    .book-title-icon {
      border-radius: 50%;
      height: 48px;
      width: 48px;
      background-color: #e5e5e5;
      vertical-align: middle;
      display: inline-block;
      margin-right: 16px;
    }
    .book-title-name {
      display: inline-block;
      vertical-align: middle;
      color: #333;
    }
  }
  .book-des {
    font-size: 14pt;
    margin: 20pt 0;
    .day-number {
      font-size: 18pt;
      font-style: normal;
      color: #ffc300;
    }
  }
  .book-body {
    width: 180pt;
    display: inline-block;
    border-radius: 5px;
    position: relative;
    .play-img {
      width: 180pt;
    }
    .player-icon {
      position: absolute;
      cursor: pointer;
      top: 50%;
      left: 50%;
      margin: -20px 0 0 -20px;
    }
  }
  .book-tips {
    color: #666;
    margin-top: 24px;
    font-size: 12pt;
  }
}
.reading {
  .reading-back {
    text-align: left;
    padding-left: 20pt;
    img {
      cursor: pointer;
    }
  }
  .reading-step {
    font-size: 16pt;
  }
  .reading-swipe {
    height: 320pt;
  }
  .breading-img {
    width: 200pt;
    height: 250pt;
    display: inline-block;
    background-color: #e5e5e5;
    border-radius: 5px;
    .background-img {
      width: 200pt;
      height: 250pt;
    }
  }
  .reading-name {
    margin: 20pt 0;
  }
  .reading-downlaod {
    display: inline-block;
    background-color: #ffc300;
    color: #fff;
    border-radius: 16pt;
    height: 32pt;
    width: 150pt;
    line-height: 32pt;
    text-align: center;
    font-size: 13pt;
    cursor: pointer;
  }
}
</style>
