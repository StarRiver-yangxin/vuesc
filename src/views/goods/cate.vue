<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div class="action-view mb20">
        <div>分类管理</div>
        <el-button type="primary" icon="el-icon-plus">添加分类</el-button>
      </div>
      <div class="table-view mb20">
        <el-table :data="tableData" border>
          <el-table-column label="#" width="30" />
          <el-table-column width="20px" type="expand">
            <template>
              <div class="expanded-cell">
                <div class="v-top" />
                <div class="v-bouttom" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="分类名称" prop="cat_name" />
          <el-table-column label="是否有效" prop="cat_deleted" />
          <el-table-column label="排序" prop="cat_level">
            <template slot-scope="{ row }">
              <el-tag v-if="row.cat_level === 0">一级</el-tag>
              <el-tag v-if="row.cat_level === 1" type="success">二级</el-tag>
              <el-tag v-if="row.cat_level === 2" type="warning">三级</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
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
        pagesize: 10,
        // 总条数
        total: 0,
        cat_level: 1
      },
      value1: true,
      // 表单数据【新增】
      formInput: {}
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    async getTableData() {
      const { page } = this.pagable
      const { data } = await this.$http.get('/categories', { params: { total: 1, pagenum: page, pagesize: 10 }})
      console.log(data)
      const res = data.result
      this.tableData = res
      this.pagable.total = data.total
      // console.log(res)
    },
    pageChange(page) {
      this.pagable.page = page
      // console.log(page)
      this.getTableData()
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
.expanded-cell{
  width: 1066px;
  height: 282px;
  /* background-color: red; */
  .v-top {
    width: 975px;
    height: 188px;
    border-top: 1px solid #eee;
    /* background-color: aqua; */
  }
  .v-bouttom {
    width: 975px;
    height: 93px;
    border-bottom: 1px solid #eee;
  }
}

</style>
