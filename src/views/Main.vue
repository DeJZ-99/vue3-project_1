<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside></common-aside>
      <el-container class="r-container">
        <common-header></common-header>
        <common-tab></common-tab>
        <el-main class="right-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script>
import { defineComponent } from "vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
import CommonTab from "../components/CommonTab.vue";

export default defineComponent({
  components: {
    CommonHeader,
    CommonAside,
    CommonTab,
  },
});
</script>

<style lang="less" scoped>
.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
  height: 100%;
}
.common-layout {
  .lay-container {
    flex-wrap: nowrap;
    .right-main {
      height: 100%;
      padding-top: 20px;
      margin-top: -20px;
      overflow: hidden;
    }
  }
  height: 100%;
  // &表示父元素(.common-layout)
  & > .el-container {
    height: 100%;
    & > .el-aside {
      height: 100%;
      // background-color: #777;
      background-color: #545c64;
    }
  }
}
</style>
