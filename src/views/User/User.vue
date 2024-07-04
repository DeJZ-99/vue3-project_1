<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+ 新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSerch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" style="width: 100%" height="580px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      size="small"
      background
      layout="prev, pager, next"
      :total="config.total"
      @current-change="changePage"
      class="pager mt-4"
    />
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="name"
            :rules="[
              {
                required: true,
                message: '姓名是必填项',
              },
            ]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="年龄"
            prop="age"
            :rules="[
              {
                required: true,
                message: '年龄是必填项',
              },
              {
                type: 'number',
                message: '年龄必须是数字',
              },
            ]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="性别"
            prop="sex"
            style="width: 86%"
            :rules="[
              {
                required: true,
                message: '性别是必选项',
              },
            ]"
          >
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="出生日期"
            prop="birth"
            :rules="[
              {
                required: true,
                message: '出生日期是必选项',
              },
            ]"
          >
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              aria-label="出生日期"
              placeholder="请输入"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
          :rules="[
            {
              required: true,
              message: '地址是必填项',
            },
          ]"
          style="width: 100%"
        >
          <el-input
            v-model="formUser.addr"
            placeholder="请输入地址"
            style="width: 100%"
          />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: center">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { getCurrentInstance, onMounted, ref, reactive } from "vue";

const { proxy } = getCurrentInstance();
// 控制模态框的隐藏显示
const dialogVisible = ref(false);
// 区分编辑和新增功能的变量 默认是新增 add
const action = ref("add");
// 存放表格数据
const list = ref([]);
// 表头数据
const tableLabel = reactive([
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "age",
    label: "年龄",
  },
  {
    prop: "sexLabel",
    label: "性别",
  },
  {
    prop: "birth",
    label: "出生日期",
    width: 200,
  },
  {
    prop: "addr",
    label: "地址",
    width: 320,
  },
]);
// 配置表格页码
const config = reactive({
  total: 0,
  page: 1,
  name: "",
});
// 表格搜索关键字存放
const formInline = reactive({
  keyword: "",
});
// 添加用户的from数据
const formUser = reactive({
  name: "", // 添加用户的姓名
  age: "",
  sex: "",
  birth: "",
  addr: "",
});
/**
 * 格式化时间
 * @param Time 需要格式化的时间
 */
const timeFormat = (Time) => {
  var time = new Date(Time);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  function add(m) {
    return m < 10 ? "0" + m : m;
  }
  return year + "-" + add(month) + "-" + add(date);
};
// 表数据
const getUserData = async (config) => {
  let res = await proxy.$api.getUserData(config);
  config.total = res.count;
  list.value = res.list.map((item) => {
    item.sexLabel = item.sex === 0 ? "女" : "男";
    return item;
  });
};
// 页码数据
const changePage = (page) => {
  config.page = page;
  getUserData(config);
};
// 表单数据
const handleSerch = () => {
  config.name = formInline.keyword;
  getUserData(config);
};
// 关闭页面
const handleClose = (done) => {
  ElMessageBox.confirm("确定关闭吗?")
    .then(() => {
      proxy.$refs.userForm.resetFields();
      done();
    })
    .catch(() => {
      // catch error
    });
};
// 取消键
const handleCancel = () => {
  dialogVisible.value = false;
  proxy.$refs.userForm.resetFields();
};
// 确定键
const onSubmit = () => {
  // 表单校验
  proxy.$refs.userForm.validate(async (valid) => {
    if (valid) {
      if (action.value == "add") {
        // 日期格式处理 新增用户接口
        formUser.birth = timeFormat(formUser.birth);
        let res = await proxy.$api.addUser(formUser);
        if (res) {
          dialogVisible.value = false;
          proxy.$refs.userForm.resetFields();
          getUserData(config);
        }
      } else {
        // 编辑用户接口 性别处理
        formUser.sex == "男" ? (formUser.sex = 1) : (formUser.sex = 0);
        let res = await proxy.$api.editUser(formUser);
        if (res) {
          dialogVisible.value = false;
          proxy.$refs.userForm.resetFields();
          getUserData(config);
        }
      }
    } else {
      ElMessage({
        showClose: true,
        message: "请输入正确的内容",
        type: "error",
      });
    }
  });
};
// 编辑用户
const handleEdit = (row) => {
  action.value = "edit";
  dialogVisible.value = true;
  // 性别处理
  row.sex == 1 ? (row.sex = "男") : (row.sex = "女");
  // 浅拷贝
  proxy.$nextTick(() => {
    Object.assign(formUser, row);
  });
};
// 新增用户
const handleAdd = () => {
  action.value = "add";
  dialogVisible.value = true;
};
// 删除用户
const handleDelete = (row) => {
  ElMessageBox.confirm("你确定删除吗?")
    .then(async () => {
      await proxy.$api.deleteUser({
        id: row.id,
      });
      ElMessage({
        showClose: true,
        message: "删除成功",
        type: "success",
      });
      getUserData(config);
    })
    .catch(() => {
      // catch error
    });
};

onMounted(() => {
  getUserData(config);
  dialogVisible.value = true;
});
</script>

<style lang="less" scoped>
.table {
  position: relative;
  height: 600px;
  .pager {
    position: absolute;
    right: 0;
    bottom: -15px;
  }
}
.user-header {
  display: flex;
  justify-content: space-between;
}
</style>