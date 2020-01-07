<template>
  <div class="countentWorpLog">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        日志查询
        <el-form :model="form"  ref="form" label-width="100px" class="demo-ruleForm">
          <div class="dataTime">
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="请选择开始日期"
              format="yyyy-MM-dd hh:mm"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change = "startflow">
            </el-date-picker>
            <el-date-picker
              v-model="value2"
              type="datetime"
              placeholder="请选择结束日期"
              format="yyyy-MM-dd hh:mm"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change = "endflow">
            </el-date-picker>
          </div>
          <el-form-item label="项目名称" prop="pName">
              <el-select v-model="form.pName" placeholder="全部" @change="change">
                  <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
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
          prop="id"
          label="用户 ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="用户角色">
        </el-table-column>
        <el-table-column
          prop="pro_name"
          label="所属项目">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="操作时间">
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作记录">
        </el-table-column>
      </el-table>
      <div class="block">
        <p class="demonstration">每页 10 条 记录 当前 <span class="pageDq">{{currentPage}}</span> 页 共 <span class="pageZ">{{gong}}</span> 页</p>
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
// import $ from 'jquery'
// import Qs from 'qs'
export default {
  data () {
    return {
      currentPage:1,
      pageSize:10,
      total:1,
      gong:0,
      value1:'',
      value2:'',
      tableData: [],
      form:{pName:''},
      items:[],
      items2:[],
      name:'',
      st:'',
      et:'',
    }
  },
  created:function(){

  },
  mounted: function () {
    this.project();
  },
    methods:{
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.getData(this.currentPage,this.pageSize,this.form.pName);
      },
      async project () {
        //项目名称下拉框
        const res2 = await this.$http.get(`/data/project/all`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        const data2 = res2.data
        this.items = data2.data;
        var selectMsg = data2.data;
        this.form.pName = selectMsg[0].name;
        this.getData(this.currentPage,this.pageSize,this.form.pName);
      },
      // 数据渲染列表
      async getData (currentPage,pageSize,pName,st,et) {
        const res = await this.$http.get(`/data/log/create`,{params: {pName: pName,st:st,et:et,nowpage:currentPage,pagesize:pageSize}}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        const data = res.data
        // console.log(data.data.rows);
        if (data.status === '200') {
          this.total = data.data.total
          var g = data.data.total;
          if (g <= 10) {
            this.gong = 1;
          } else {
            var gs = Math.round(g / 10);
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
      change:function(val){
        let obj = {};
        obj = this.items.find((item)=>{
            return item.id === val;
        });
        // console.log(obj.name);
        this.getData(this.currentPage,this.pageSize,obj.name);
      },
      startflow (val) {
        this.st = val;
        if (this.et != '') {
          this.getData(this.currentPage,this.pageSize,this.form.pName,this.st,this.et);
        }
      },
      endflow (val) {
        this.et = val
        if (this.st != '') {
          this.getData(this.currentPage,this.pageSize,this.form.pName,this.st,this.et);
        }
      }
    }
}
</script>
<style scoped>
  .countentWorpLog .divActive{
    float: left;
  }
  .tableTitle{
    color: #333333;
    font-size: 16px;
    border-bottom: 0.018519rem dashed #dde3ff;
    margin: 22px 20px 0 19px;
    padding-bottom: 21px;
  }
  .countentWorpLog .divActiveRight{
    width: 100%;
    float: right;
    /* height: 419px; */
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
  }
  .countentWorpLog .divActiveRight .shujuLog{
    font-size: 16px;
    color: #333333;
    margin-bottom: 21px;
  }
  .countentWorpLog .divActiveRight .shujuLog .el-form{
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
  .dataTime{
    float: left;
  }
</style>
