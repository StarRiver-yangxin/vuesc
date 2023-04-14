<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div class="action-view mb20">
        <div>用户列表</div>
        <el-button type="primary" icon="el-icon-plus" @click="xz">新增</el-button>
      </div>
      <div class="table-view mb20">
        <el-table :data="tableData" border>
          <el-table-column label="#" width="30" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="邮箱" prop="email" />
          <el-table-column label="电话" prop="mobile" />
          <el-table-column label="角色" prop="role_name" />
          <el-table-column label="状态" prop="mg_state">
            <template slot-scope="{ row }">
              <el-switch v-model="row.mg_state" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="{ row }">
              <el-button type="text" @click="open(row)">编辑</el-button>
              <el-button type="text" @click="deleteData(row)">删除</el-button>
              <el-button type="text">分配权限</el-button>
            </template>

          </el-table-column>
        </el-table>
      </div>
      <!-- 分页区域 默认分页10条一页-->
      <div class="page-view fc">
        <!-- 分页器 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pagable.total"
          :current-page="pagable.page"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <!-- 添加新增弹窗 -->
    <el-dialog title="新增用户" :visible="dialogVisible" width="40%" :before-close="cancelRights">
      <!-- 表单组件 -->
      <el-form ref="formRef" :model="formInput" :rules="formRules" label-position="right" label-width="100px">
        <!-- 表单项 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formInput.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formInput.password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formInput.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formInput.mobile" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="cancelRights">取消</el-button>
        <el-button type="primary" @click="saveRights">确定</el-button>
      </template>
    </el-dialog>
    <!-- 添加修改弹窗 -->
    <el-dialog title="修改用户" :visible="dialogVisible2" width="40%" :before-close="cancelRights">
      <!-- 表单组件 -->
      <el-form ref="formRef" :model="formInput" :rules="formRules" label-position="right" label-width="100px">
        <!-- 表单项 -->
        <el-form-item label="用户名" prop="username" disabled>
          <el-input v-model="formInput.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formInput.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formInput.mobile" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="cancelRights">取消</el-button>
        <el-button type="primary" @click="saveRights2">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// import Axios from 'axios'
export default {
  data() {
    return {
      tableData: [],
      pagable: {
        // page: 1,
        // total: 0
        // 页码
        page: 1,
        // 每页条数
        limit: 5,
        // 总条数
        total: 0
      },
      value1: true,
      dialogVisible: false,
      dialogVisible2: false,
      // 表单数据【新增】
      formInput: {},
      // 表单校验规则
      formRules: {
        username: { required: true, message: '用户名不能为空' },
        password: { required: true, message: '密码不能为空' },
        email: { required: true, message: '邮箱不能为空' },
        mobile: { required: true, message: '手机号不能为空' }

      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    async getTableData() {
      const { page } = this.pagable
      const { data } = await this.$http.get('/users', { params: { pagenum: page, pagesize: 10 }})
      console.log(data)
      const res = data.users
      this.tableData = res
      this.pagable.total = data.total
      // console.log(res)
    },
    pageChange(page) {
      this.pagable.page = page
      // console.log(page)
      this.getTableData()
    },
    xz() {
      this.dialogVisible = true
    },
    // 显示弹窗
    open(row) {
      this.dialogVisible2 = true
      this.formInput = { ...row }
    },
    // 关闭弹窗
    cancelRights() {
      this.dialogVisible2 = false
      this.dialogVisible = false
      this.formInput = {}
      this.$refs.formRef.resetFields()
    },
    // 添加
    async saveRights() {
      await this.$refs.formRef.validate()

      await this.$http.post('/users', this.formInput)
      this.$message.success('新增成功')
      this.cancelRights()
      this.getTableData()
    },
    // 修改
    async saveRights2() {
      await this.$refs.formRef.validate()
      const { id, email, mobile } = this.formInput
      await this.$http.put(`users/${id}`, { email, mobile })
      this.cancelRights()
      this.getTableData()
      this.$message.success('修改成功')
    },
    // 删除
    async deleteData(row) {
      await this.$http.delete(`/users/${row.id}`)
      this.$message.success('删除成功')
      this.getTableData()
    }
  }
}
// 提交数据
// async saveRights() {
//   try {
//     // 获取表单实例 调用验证方法
//     await this.$refs.formRef.validate()
//     // 验证成功 则发起请求新增轮播图
//     if (this.formInput.carouselId) {
//       // 修改
//       await this.$http.put('/users/:uId/state/:type', this.formInput)
//       this.$message.success('修改成功')
//     } else {
//       // 新增
//       await this.$http.post('/users/', this.formInput)
//       this.$message.success('新增成功')
//     }
//     this.cancelRights()
//     this.getTableData()
//   } catch (error) {
//     console.log('验证失败')
//   }
// }
</script>

<style lang="scss" scoped>
.mb20{
  div{
    margin-bottom: 15px;
  }
}

</style>
