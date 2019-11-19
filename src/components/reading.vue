<template>
  <div class="reading">
    <div class="reading-back">
      <img @click="goBack" width="20px" src="@/assets/back.png" />
    </div>
    <div class="reading-step">{{readingIndex}} / {{testData.length}}</div>
    <div class="reading-swipe">
      <mt-swipe
        :auto="autoTime"
        @change="handleChange"
        :show-indicators="false"
        :continuous="false"
      >
        <mt-swipe-item v-for="(item,index) in testData" :key="index">
          <div class="breading-img">{{item.key}}</div>
          <div class="reading-name">{{item.value}}</div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div v-if="readingIndex !== testData.length" class="reading-downlaod">立即下载</div>
    <div v-if="readingIndex === testData.length" class="reading-downlaod">快来和我一起读绘本吧</div>
  </div>
</template>

<script>
import http from "@/utils/http.js";
import { Swipe, SwipeItem } from "mint-ui";

export default {
  name: "Share",
  components: {
    Swipe,
    SwipeItem
  },
  data() {
    return {
      data: "",
      imgUrl: "",
      audioUrl: "",
      title: "",
      back: "<",
      testData: [],
      readingIndex: 0,
      autoTime: 5000
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getInfo();
      this.initTest();
    },
    getInfo() {
      let api = `/course/service/book/share`;
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
    goBack() {
      this.$router.push({ name: "Book" });
    },
    initTest() {
      this.testData = [
        { key: "a", value: "My Sweeter A" },
        { key: "b", value: "My Sweeter B" },
        { key: "c", value: "My Sweeter C" },
        { key: "d", value: "My Sweeter D" },
        { key: "end", value: "-The End-" }
      ];
      this.readingIndex = 1;
    },
    handleChange(index) {
      this.readingIndex = index + 1;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
