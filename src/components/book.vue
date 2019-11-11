<template>
  <div class="share">
    <!-- <div class="share-title">{{title}}</div> -->
    <div class="share-img">
      <img class="background-img" :src="imgUrl" />
    </div>
    <div class="share-radio">
      <!-- <audio :src="audioUrl" controls="controls"></audio> -->
      <audio-ui :url="audioUrl"></audio-ui>
    </div>
    <app-footer :title="'芒果少儿英语'" :des="'下载查看更多绘本'"></app-footer>
  </div>
</template>

<script>
import axios from "axios";
import AudioUi from './audio-ui.vue'
import AppFooter from './common/footer.vue'

export default {
  name: "Share",
  components:{
    AudioUi,
    AppFooter
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
}
</style>
