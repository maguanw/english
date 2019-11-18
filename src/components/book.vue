<template>
  <div class="book">
    <div class="book-title">
      <div class="book-title-icon"></div>
      <span class="book-title-name">Dromamo 在芒果少儿英语</span>
    </div>
    <div class="book-des">
      <span>今天第</span>
      <i class="day-number">1</i>
      <span>天，完成了第</span>
      <i class="day-number">1</i>
      <span>个作品</span>
    </div>
    <div class="book-body" @click="goReading">
      <img class="player-icon" width="40px" src="../assets/start.png" />
    </div>
    <div class="book-tips">点击收听Dromamo小朋友的精彩作</div>
    <app-footer :title="'芒果少儿英语'" :des="'下载查看更多绘本'"></app-footer>
  </div>
</template>

<script>
import http from "@/utils/http.js";
import AudioUi from "./audio-ui.vue";
import AppFooter from "./common/footer.vue";

export default {
  name: "Share",
  components: {
    AudioUi,
    AppFooter
  },
  data() {
    return {
      data: "",
      imgUrl: "",
      audioUrl: "",
      title: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getInfo();
    },
    getInfo() {
      let api = `/app/course/book/share`;
      let params = {
        number: "541486963491839"
      };
      http.get(api, params).then(res => {
        if (res.code === 0) {
          const data = res.data;
          this.imgUrl = data.backImgUrl;
          this.audioUrl = data.playUrl;
          this.title = data.title;
        }
      });
    },
    goReading() {
      this.$router.push({ name: "Reading" });
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
    height: 180pt;
    background-color: #e5e5e5;
    display: inline-block;
    border-radius: 5px;
    .player-icon {
      cursor: pointer;
      margin-top: -20px;
      padding-top: 50%;
    }
  }
  .book-tips {
    color: #666;
    margin-top: 24px;
    font-size: 12pt;
  }
}
</style>
