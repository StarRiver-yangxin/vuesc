<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div class="action-view mb20">
        <div>商品列表</div>
        <el-input
          v-model="input2"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
        />
        <el-button type="primary">添加</el-button>
      </div>
      <div class="table-view mb20">
        <el-table :data="tableData" border>
          <el-table-column label="#" width="30" />
          <el-table-column label="商品名称" prop="goods_name" />
          <el-table-column label="商品价格" prop="goods_price" />
          <el-table-column label="商品重量" prop="goods_weight" />
          <el-table-column label="创建时间" prop="add_time" />
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
      input2: '',
      pagable: {
        // page: 1,
        // total: 0
        // 页码
        page: 1,
        // 每页条数
        pagesize: 10,
        // 总条数
        total: 0
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
      const { data } = await this.$http.get('/goods', { params: { total: 1, pagenum: page, pagesize: 10 }})
      console.log(data)
      const res = data.goods
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

</style>
