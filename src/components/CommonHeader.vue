<template>
  <el-header>
    <div class="l-content">
      <!-- 头部图标 -->
      <el-button size="small" @click="handleCollapse()">
        <el-icon :size="20"><Menu /></el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <!-- 首页一定存在，直接写死 -->
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <!-- <img class="user" :src="getImgSrc()" alt="" /> -->

          <!-- ES6写法 -->
          <img class="user" :src="getImgSrc('user')" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="hamdleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
// 调用vuex中的mutations方法
const handleCollapse = () => {
  store.commit("updateIsCollapse");
};
// ES6写法动态获取图片
const getImgSrc = (user) => {
  return new URL(`../assets/images/${user}.jpg`, import.meta.url).href;
  // return new URL("../assets/images/user.jpg", import.meta.url).href;
};

const current = computed(() => {
  return store.state.currentMenu;
});
// 退出登录
const hamdleLoginOut = () => {
  store.commit("cleanMenu");
  router.push({
    name: "login",
  });
};
</script>

<style lang='less' scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
}
:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>