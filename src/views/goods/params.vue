<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div class="table-view mb20">
        <div>参数管理</div></div>
      <el-table :data="tableData" border>
        <el-table-column label="#" width="30" />
        <el-table-column label="权限" prop="authName" />
        <el-table-column label="路径" prop="path" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
// import Axios from 'axios'
export default {
  data() {
    return {
      tableData: [],
      value1: true,
      // 表单数据【新增】
      formInput: {},
      level: 1
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    async getTableData() {
      // const { page } = this.pagable
      const { id, sel } = this.formInput
      const { data } = await this.$http.get(`/categories/attributes/${id}`, { sel })
      console.log(data)
      this.tableData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.mb20{
  div{
    margin-bottom: 15px;
  }
}

</style>
