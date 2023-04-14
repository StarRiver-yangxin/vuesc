<template>
  <div class="dashboard-container">
    <el-card>
      <el-button icon="el-icon-plus" type="primary" @click="display = true">添加角色</el-button>
      <el-table border style="margin-top: 13px" :data="tableData">
        <el-table-column width="50px" type="expand">
          <template>
            <div class="expanded-cell">
              <div class="v-top">
                <el-tag
                  v-for="tag in tags"
                  :key="tag.name"
                  class="mx-1"
                  closable
                  :type="tag.type"
                >
                  {{ tag.name }}
                </el-tag>
              </div>
              <div class="v-bouttom" />
            </div>
          </template>
        </el-table-column>
        <el-table-column width="50px" label="#" prop="id" />
        <el-table-column label="角色名称" prop="roleName" />
        <el-table-column label="角色描述" prop="roleDesc" />
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button style="margin-right: 10px;" type="text" @click="showPop(row)">编辑</el-button>
            <el-button type="text" @click="deleteData(row)">删除</el-button>
            <el-button type="text">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加和修改 -->
    <el-dialog :title="formInput.id ? '修改角色' : '新增角色'" :visible="display" width="40%" :before-close="closePop">
      <el-form ref="formRef" :model="formInput" label-position="right" :rules="formCheck" label-width="100px" style="width: 85%">
        <el-form-item label="角色名称" prop="roleName" disabled>
          <el-input v-model="formInput.roleName" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="formInput.roleDesc" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <!-- 确定 -> 关闭弹窗 -->
      <template slot="footer">
        <el-button @click="closePop">取消</el-button>
        <el-button type="primary" @click="submitData">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      formInput: {},
      // 校验
      formCheck: {
        roleName: { required: true, message: '请输入角色名称' },
        roleDesc: { required: true, message: '请输入角色描述' }
      },
      display: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await this.$http.get('roles')
      this.tableData = data
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
      this.$refs.formRef.resetFields()
    },
    // 添加
    async submitData() {
      try {
        await this.$refs.formRef.validate()
        if (this.formInput.id) {
          // 修改
          await this.$http.put('/roles', this.formInput)
          this.$message.success('修改成功')
        } else {
          // 新增
          await this.$http.post('/roles', this.formInput)
          this.$message.success('新增成功')
        }

        this.closePop()
        this.getData()
      } catch (error) {
        console.log('验证失败')
      }
    },
    // 删除
    async deleteData(row) {
      await this.$http.delete(`/roles/${row.id}`)
      this.$message.success('删除成功')
      this.getData()
    }
  }
}
</script>

  <style scoped>
   .expanded-cell{
   width: 1066px;
   height: 282px;
   /* background-color: red; */
  }
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
  </style>
