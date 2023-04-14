<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div class="action-view mb20">
        <!-- <div></div> -->
        <!-- <el-button type="primary" icon="el-icon-plus">搜索</el-button> -->
        <el-input v-model="input" width="20%" placeholder="请输入内容" clearable />
      </div>
      <div class="table-view mb20">
        <el-table :data="tableData" border>
          <el-table-column label="#" width="50" type="index" />
          <el-table-column label="订单编号" prop="order_number" />
          <el-table-column label="订单价格" prop="order_id" />
          <el-table-column label="是否付款" prop="pay_status" />
          <el-table-column label="是否发货" prop="is_send" />
          <el-table-column label="下单时间" prop="create_time" />
          <el-table-column label="操作" width="200">
            <template slot-scope="{ row }">
              <el-button type="text">修改地址</el-button>
              <el-button type="text" @click="showPop(row)">查看物流</el-button>
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
    <el-dialog :title="'物流进度'" :visible="display" width="55%" :before-close="closePop">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
// import { Search } from '@element-plus/icons-vue'
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
        total: 0
      },
      activities: [
        {
          content: '[长沙市]您的快件代签收（浅水湾三期22万佳），如有疑问请电联快递员【王兴强，电话：15573545236】。疫情期间顺丰每日对网点消毒、快递员每日测温、配戴口罩，感谢您使用顺丰，期待再次为您服务。（主单总件数：1件）',
          timestamp: '2021-09-12 11:08:47'
        },
        {
          content: '[长沙市]快件交给王兴强,正在派送途中（联系电话：15573545236,顺丰已开启“安全呼叫”保护您的电话隐私,请放心接听！）（主单总件数：1件）',
          timestamp: '2021-09-12 09:53:03'
        },
        {
          content: '快件到达 【长沙市岳麓区卓越浅水湾速运营业点】',
          timestamp: '2021-09-12 01:41:36'
        },
        {
          content: '[长沙市]快件已发车',
          timestamp: '2021-09-11 23:53:24'
        },
        {
          content: '快件在【长沙干杉中转场】完成分拣,准备发往 【长沙市岳麓区卓越浅水湾速运营业点】',
          timestamp: '2021-09-11 20:39:21'
        },
        {
          content: '[长沙市]快件到达 【长沙干杉中转场】',
          timestamp: '2021-09-11 18:02:18'
        },
        {
          content: '[东莞市]快件已发车',
          timestamp: '2021-09-11 02:38:44'
        },
        {
          content: '[东莞市]快件在【华南陆运枢纽（东莞）】完成分拣,准备发往 【长沙干杉中转场】',
          timestamp: '2021-09-10 12:23:14'
        },
        {
          content: '[东莞市]快件到达 【华南陆运枢纽（东莞）】',
          timestamp: '2021-09-10 12:20:28'
        },
        {
          content: '[东莞市]快件已发车',
          timestamp: '2021-09-10 00:06:02'
        },
        {
          content: '[东莞市]快件在【东莞洪梅振华路营业点】完成分拣,准备发往 【华南陆运枢纽（东莞）】',
          timestamp: '2021-09-09 23:47:31'
        },
        {
          content: '[东莞市]顺丰速运 已收取快件',
          timestamp: '2021-09-09 23:47:21'
        }
      ],
      display: false,
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
      const { data } = await this.$http.get('/orders', { params: { total: 1, pagenum: page, pagesize: 10 }})
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
    },
    ui() {
      this.display = true
    },
    // 显示
    showPop(row) {
      this.display = true
      this.formInput = { ...row }
    },
    // 隐藏
    closePop() {
      this.display = false
      this.formInput = {}
    },
    // 添加
    async submitData() {
      await this.$refs.formRef.validate()
      // 新增
      await this.$http.post('/users', this.formInput)
      this.$message.success('新增成功')
      this.closePop()
      this.getData()
    },
    // 修改
    async submitData2() {
      await this.$refs.formRef.validate()
      const { id, email, mobile } = this.formInput
      await this.$http.put(`users/${id}`, { email, mobile })
      this.closePop()
      this.getData()
      this.$message.success('修改成功')
    },
    // 删除
    async deleteData(row) {
      await this.$http.delete(`/users/${row.id}`)
      this.$message.success('删除成功')
      this.getData()
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
