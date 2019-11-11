<template>
  <div class="share-footer">
    <div class="icon"></div>
    <div class="des">
      <div class="title">{{title}}</div>
      <div class="info">{{des}}</div>
    </div>
    <div class="download">立即下载</div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: ["title", "des"],
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
</style>
