<template>
  <div class="dashboard-container">
    <el-card>
      <!-- 卡片内容 -->
      <!-- <el-row :gutter="20">
        <el-col :span="8">
          <el-card header="今日订单数">22</el-card>
        </el-col>
        <el-col :span="8">
          <el-card header="今日日活">666</el-card>
        </el-col>
        <el-col :span="8">
          <el-card header="今日转化率">100%</el-card>
        </el-col>
      </el-row> -->
      <div ref="demo" class="demo" />
    </el-card>
  </div>
</template>

<script>
// 导入echarts包
import * as echarts from 'echarts'

export default {
  name: 'Dashboard',
  mounted() {
    const charts = echarts.init(this.$refs.demo)
    charts.setOption({
      legend: {},
      title: { text: '用户来源' },
      xAxis: { type: 'category', boundaryGap: false, data: ['2017-12-27', '2017-12-28', '2017-12-29', '2017-12-30', '2017-12-31'] },
      yAxis: { type: 'value' },
      series: [
        { name: '华东', type: 'line', data: [2999, 3111, 4100, 3565, 3528, 6000], label: { show: true },
          markPoint: {
            // data: [
            //   { name: '最高分', type: 'max' }
            // ]
          },
          // 平滑曲线
          // smooth: true,
          stack: 'a',
          areaStyle: {}},
        { name: '华南', type: 'line', data: [5090, 2500, 3400, 6000, 6400, 7800], label: { show: true },
          markPoint: {
            // data: [
            //   { name: '最小分', type: 'min' }
            // ]
          },
          // smooth: true,
          stack: 'a',
          areaStyle: {}
        },
        { name: '华北', type: 'line', data: [6888, 4000, 8010, 12321, 13928, 12984], label: { show: true },
          markPoint: {
            // data: [
            //   { name: '最小分', type: 'min' }
            // ]
          },
          // smooth: true,
          stack: 'a',
          areaStyle: {}},
        { name: '西部', type: 'line', data: [9991, 4130, 7777, 12930, 13098, 14028], label: { show: true },
          markPoint: {
            // data: [
            //   { name: '最小分', type: 'min' }
            // ]
          },
          // smooth: true,
          stack: 'a',
          areaStyle: {}
        },
        { name: '其他', type: 'line', data: [15212, 5800, 10241, 14821, 15982, 14091], label: { show: true },
          markPoint: {
            // data: [
            //   { name: '最小分', type: 'min' }
            // ]
          },
          // smooth: true,
          stack: 'a',
          areaStyle: {}
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      // 工具栏
      toolbox: {
        feature: {
          dataZoom: {}, // 数据缩放
          magicType: { // 将图表在不同类型之间切换,图表的转换需要数据的支持
            type: ['bar', 'line']
          },
          saveAsImage: {} // 将图表保存为图片
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  .demo {
    // margin-top: 40px;
    width: 100%;
    height: 600px;
  }
}
</style>
