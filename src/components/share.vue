<template>
  <div class="share">
    <div class="share-title">{{title}}</div>
    <div class="share-img">
      <img :src="imgUrl" class="background-img" />
    </div>
    <div class="share-radio">
      <!-- <audio :src="audioUrl" controls="controls"></audio> -->
      <audio-ui :url="audioUrl"></audio-ui>
    </div>
    <app-footer :des="'下载更多歌曲'" :title="'芒果英语'"></app-footer>
  </div>
</template>

<script>
import AudioUi from './audio-ui.vue'
import AppFooter from './common/footer.vue'
import http from '@/utils/http.js'

export default {
  name: "Share",
  components: {
    AudioUi,
    AppFooter
  },
  data () {
    return {
      data: "",
      imgUrl: "",
      audioUrl: "",
      title: ""
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.getData();
    },
    getData () {
      let api = `/app/course/song/getSongInfo`;
      let params = {
        songNumber: '516730276585983',
        albumNumber: '491293741045759',
      };
      http.get(api, params)
        .then((res) => {
          if (res.code === 0) {
            const data = res.data;
            this.imgUrl = data.backImgUrl;
            this.audioUrl = data.playUrl;
            this.title = data.title;
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
