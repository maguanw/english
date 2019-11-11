<template>
  <div class="share">
    <div class="share-title">{{title}}</div>
    <div class="share-img">
      <img class="background-img" :src="imgUrl" />
    </div>
    <div class="share-radio">
      <!-- <audio :src="audioUrl" controls="controls"></audio> -->
      <audio-ui :url="audioUrl"></audio-ui>
    </div>
    <div class="share-footer">
      <div class="icon"></div>
      <div class="des">
        <div class="title">芒果英语</div>
        <div class="info">下载更多歌曲</div>
      </div>
      <div class="download">立即下载</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AudioUi from './audio-ui.vue'

export default {
  name: "Share",
  components:{
    AudioUi
  },
  data() {
    return {
      data: "",
      imgUrl: "",
      audioUrl: "",
      title:""
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
      let api = `/app/course/song/getSongInfo?songNumber=516730276585983&albumNumber=491293741045759`;
      axios
        .get(api, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          if (res.status === 200) {
            const data = res.data;
            this.imgUrl = data.data.backImgUrl;
            this.audioUrl = data.data.playUrl;
            this.title = data.data.title;
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.share {
  text-align: center;
  color: #666;
  .share-title {
    font-size: 19pt;
    margin-bottom: 22pt;
  }
  .share-img {
    display: inline-block;
    width: 250pt;
    height: 250pt;
    border-radius: 50%;
    background-color: #f2f2f2;
    .background-img {
      height: 230pt;
      width: 230pt;
      border-radius: 50%;
      margin-top: 10pt;
    }
  }
  .share-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 48pt;
    background-color: #f1f1f1;
    padding: 0 22px;
    text-align: left;

    .icon {
      height: 32pt;
      width: 32pt;
      border-radius: 3px;
      margin-top: 8px;
      display: inline-block;
      background-color: #fff;
      margin-right: 22px;
    }

    .des {
      display: inline-block;
      color: #333;
      vertical-align: super;
      .title {
        font-size: 11pt;
      }
      .info {
        font-size: 9pt;
      }
    }

    .download {
      background-color: #ffc300;
      color: #fff;
      border-radius: 12pt;
      height: 24pt;
      width: 68pt;
      float: right;
      line-height: 24pt;
      text-align: center;
      margin-top: 11pt;
      font-size: 10pt;
      cursor: pointer;
    }
  }
}
</style>
