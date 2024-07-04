<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/user.jpg" alt="" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2024-6-30</span></p>
          <p>上次登录地点：<span>四川</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            class="icons"
            :is="item.icon"
            :style="{ background: item.color }"
          ></component>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图 -->
      <el-card style="height: 280px">
        <div ref="echart" style="height: 280px"></div>
      </el-card>
      <!-- 柱形图，饼状图 -->
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="userechart" style="height: 240px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="videoechart" style="height: 240px"></div
        ></el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, reactive } from "vue";
import * as echarts from "echarts";

let tableData = ref([]);
let countData = ref([]);

const { proxy } = getCurrentInstance();
// 主页表格头部数据
const tableLabel = {
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总共购买",
};
// 获取表格数据
const getTableList = async () => {
  // 使用axios二次封装api
  let res = await proxy.$api.getTableData();
  tableData.value = res.tableData;
};
// 获取标签数据
const getCountData = async () => {
  let res = await proxy.$api.getCountData();
  countData.value = res;
};
// 折线图配置和柱形图配置
const xOptions = reactive({
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  grid: {
    left: "20%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});
// 饼状图配置
const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
});
// 存放统计图数据
const orderData = reactive({
  xData: [],
  series: [],
});
const userData = reactive({
  xData: [],
  series: [],
});
const videoData = reactive({
  series: [],
});
// 渲染统计图
const getEchartsData = async () => {
  let res = await proxy.$api.getEchartsData();
  let orderRes = res.orderData;
  let userRes = res.userData;
  let videoRes = res.videoData;
  orderData.xData = orderRes.date;
  const keyArray = Object.keys(orderRes.data[0]);
  const series = [];
  keyArray.forEach((key) => {
    series.push({
      name: key,
      data: orderRes.data.map((item) => item[key]),
      type: "line",
    });
  });
  // 折线图数据处理
  orderData.series = series;
  xOptions.xAxis.data = orderData.xData;
  xOptions.series = orderData.series;
  // 折线图渲染
  let hEcharts = echarts.init(proxy.$refs["echart"]);
  hEcharts.setOption(xOptions);
  // 柱状图渲染
  userData.xData = userRes.map((item) => item.date);
  userData.series = [
    {
      name: "新增用户",
      data: userRes.map((item) => item.new),
      type: "bar",
    },
    {
      name: "活跃用户",
      data: userRes.map((item) => item.active),
      type: "bar",
    },
  ];
  xOptions.xAxis.data = userData.xData;
  xOptions.series = userData.series;
  let uEcharts = echarts.init(proxy.$refs["userechart"]);
  uEcharts.setOption(xOptions);
  // 饼状图渲染
  videoData.series = [
    {
      data: videoRes,
      type: "pie",
    },
  ];
  pieOptions.series = videoData.series;
  let vEcharts = echarts.init(proxy.$refs["videoechart"]);
  vEcharts.setOption(pieOptions);
};

onMounted(() => {
  getTableList();
  getCountData();
  getEchartsData();
});
</script>

<style lang="less" scoped>
.home {
  margin-top: -20px;
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
    }
  }
}
</style>