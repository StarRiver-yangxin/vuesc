<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div class="table-view mb20">
        <el-table :data="tableData" border>
          <el-table-column label="#" width="30" />
          <el-table-column label="权限" prop="authName" />
          <el-table-column label="路径" prop="path" />
          <el-table-column label="权限等级" prop="level">
            <template slot-scope="{ row }">
              <el-tag v-if="row.level === '0'">一级</el-tag>
              <el-tag v-if="row.level === '1'" type="success">二级</el-tag>
              <el-tag v-if="row.level === '2'" type="warning">三级</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      const { data } = await this.$http.get(`/rights/list`)
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
