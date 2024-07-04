<template>
  <div class="tags">
    <el-tag
      :key="tag.name"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const route = useRoute();
const tags = store.state.tableList;
// 改变标签
const changeMenu = (item) => {
  router.push({ name: item.name });
};
// 关闭标签
const handleClose = (tag, index) => {
  let length = tags.length - 1;
  // 处理vuex中的tableList
  store.commit("closeTab", tag);
  // 判断
  if (tag.name !== route.name) return;
  if (index === length) {
    router.push({
      name: tags[index - 1].name,
    });
  } else {
    router.push({
      name: tags[index].name,
    });
  }
};
</script>

<style lang="less" scoped>
.tags {
  padding: 20px;
  width: 100%;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>