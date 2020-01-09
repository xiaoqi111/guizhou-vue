<template>
  <div class="countentWorpUse">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        用户管理
        <el-form :model="form"  ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="nameId">
            <el-input placeholder="请输入用户名" v-model="form.nameId">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-show="falg" @click="dialogVisible = true">添加用户</el-button>
            <el-dialog
              title="添加用户"
              :visible.sync="dialogVisible"
              width="30%">
              <el-form :model="jSform" ref="form" label-width="100px" class="jSform demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="jSform.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="jSform.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="角色ID" prop="roleid">
                  <el-select v-model="jSform.roleid" placeholder="请选择角色ID">
                      <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="equipmentAdd">添 加</el-button>
              </span>
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="100">
          <template slot-scope="scope">
            {{ scope.$index + (currentPage - 1) * pageSize + 1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="pName"
          label="归属项目">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色">
        </el-table-column>
        <el-table-column
          prop="state"
          label="用户状态"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column >
      </el-table>
      <div class="block">
        <p class="demonstration">每页 5 条 记录 当前 <span class="pageDq">{{currentPage}}</span> 页 共 <span class="pageZ">{{gong}}</span> 页</p>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Qs from 'qs'
export default {
  data () {
    return {
      currentPage:1,
      tableData: [],
      total:1,
      pageSize:5,
      Id:'',
      pId:'',
      id:'',
      gong:0,
      name:'',
      typea:'soil',
      form:{typeId:'',nameId:''},
      jSform:{username:'',password:'',roleid:''},
      items:[],
      items2:[],
      dialogVisible: false,
      falg:true,
      access:''
    }
  },
  mounted () {
    this.user();
    this.getData(this.currentPage,this.pageSize,this.name);
  },
  created: function () {
    if (localStorage.access == 2) {
      this.falg = false;
    }
  },
  methods:{
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.getData(this.currentPage,this.pageSize,this.name);
    },
    // 获取添加用户角色ID列表
    async user () {
      const res2 = await this.$http.get(`/user/role`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data2 = res2.data
      this.items = data2.data;
    },
    formatter(row, column) {
      if (row.state == "ONLINE") {
        return "在线"
      } else if (row.state == "OFFLINE") {
        return "离线"
      }
    },
    // 数据渲染列表
    async getData (currentPage,pageSize,name) {
      const res = await this.$http.get(`/user`,{params: {name:name,nowpage: currentPage,pagesize:pageSize}}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      if (data.status === '200') {
        this.total = data.data.total
        var g = data.data.total;
        if (g <= 5) {
          this.gong = 1;
        } else {
          var gs = Math.round(g / 5);
          this.gong =  gs;
        }
        this.tableData = data.data.rows;
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    // 增加项目
    async onSubmit () {

    },
    // 用户名搜索
    search:function () {
      this.name = this.form.nameId;
      this.getData(this.currentPage,this.pageSize,this.name);
    },
    // 添加用户
    async equipmentAdd(){
      if (this.jSform.username == '') {
        this.$message({
          message: '请输入用户名',
          type: 'error'
        })
      } else if (this.jSform.password == '') {
        this.$message({
          message: '请输入密码',
          type: 'error'
        })
      } else if (this.jSform.roleid == '') {
        this.$message({
          message: '请选择角色ID',
          type: 'error'
        })
      } else {
        // 将对象序列化成URL的形式，以&进行拼接
        const jSform = Qs.stringify(this.jSform)
        const res = await this.$http.post(`/user`,jSform,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        const data = res.data
        // console.log(res)
        if (data.status == "200") {
          this.$message({
            type: 'success',
            message: '用户添加成功!'
          });
          this.dialogVisible = false;
          this.getData(this.currentPage,this.pageSize,this.name);
        } else if (data.status == "003001") {
          this.$message({
            type: 'error',
            message: data.msg
          });
        }
      }
    },
    // 删除用户操作
    async handleDelete (scope) {
      this.id = scope.id
      if (localStorage.access == 2) {
        this.$alert('您没有权限执行该操作', '提示', {
          confirmButtonText: '确定',
        });
      } else {
        this.$confirm('确定删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          var json = Qs.stringify({
            _method: 'delete'
          })
          const res = await this.$http.post(`/user/${this.id}`, json, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          // console.log(res)
          if (res.status == "200") {
            this.$message({
              type: 'success',
              message: '用户删除成功!'
            });
            this.getData(this.currentPage,this.pageSize,this.name);
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
  }
}
</script>
<style scoped>
  .countentWorpUse .divActiveRight{
    width: 100%;
    float: right;
    height: 419px;
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
  }
  .countentWorpUse .divActiveRight .shujuLog{
    font-size: 16px;
    color: #333333;
    margin-bottom: 21px;
  }
  .countentWorpUse>.divActiveRight>.shujuLog>.el-form{
    float: right;
    height: 50px;
  }
  .el-form-item{
    float: left;
  }
  .el-input__inner{
    height: 31px!important;
    line-height: 31px!important;
  }
  .el-table thead{
    background: #F5F6FA;
  }
  .el-pagination{
    float: right;
    margin: 24px -10px 0 0;
  }
  .demonstration{
    float: left;
    margin-top: 32px;
  }
  .el-form-item__content{
    margin-left: 10px
  }
  /* .jSform{
    float: none;
    height: 100px;
  } */
</style>
