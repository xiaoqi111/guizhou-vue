<template>
  <div class="countentWorpWater">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        水质监测数据
        <el-form :model="form"  ref="form" label-width="100px" class="demo-ruleForm">
          <!-- <el-form-item label="所属项目" prop="nameId">
              <el-select v-model="form.nameId" @change="change">
                  <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item> -->
          <el-form-item label="所属网关" prop="gatewayId">
              <el-select v-model="form.gatewayId" @change="change3">
                  <el-option v-for="item3 in items3" :key="item3.id" :label="item3.name" :value="item3.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="按传感设备查看" prop="typeId">
              <el-select v-model="form.typeId" @change="change4">
                <el-option label="浊度" value="5"></el-option>
                <el-option label="PH" value="6"></el-option>
                <el-option label="氨氮" value="7"></el-option>
                <el-option label="化学需氧量" value="8"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="设备ID" prop="deviceId">
              <el-select v-model="form.deviceId" @change="change2">
                  <el-option v-for="item2 in items2" :key="item2.id" :label="item2.id" :value="item2.id"></el-option>
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
          label="设备ID">
        </el-table-column>
        <el-table-column
          prop="turbidity"
          label="浊度"
          v-if="waterflg == '5'">
        </el-table-column>
        <el-table-column
          prop="temperature"
          label="温度"
          v-if="waterflg == '5'">
        </el-table-column>
        <el-table-column
          prop="warning"
          label="警告"
          :formatter="formatter"
          v-if="waterflg == '5'">
        </el-table-column>
        <el-table-column
          prop="ph"
          label="PH"
          v-else-if="waterflg == '6'">
        </el-table-column>
        <el-table-column
          prop="ammoniaNitrogen"
          label="氨氮"
          v-if="waterflg == '7'">
        </el-table-column>
        <el-table-column
          prop="temperature"
          label="温度"
          v-if="waterflg == '7'">
        </el-table-column>
        <el-table-column
          prop="warning"
          label="警告"
          :formatter="formatter"
          v-if="waterflg == '7'">
        </el-table-column>
        <el-table-column
          prop="cod"
          label="COD"
          v-if="waterflg == '8'">
        </el-table-column>
        <el-table-column
          prop="temperature"
          label="温度"
          v-if="waterflg == '8'">
        </el-table-column>
        <el-table-column
          prop="gatherTime"
          label="采集时间"
          width="180">
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
import $ from 'jquery'
import Qs from 'qs'
export default {
  data () {
    return {
      currentPage:1,
      tableData: [],
      total:1,
      pageSize:10,
      Id:'',
      projectId:6,
      gatewayId:'',
      typeId:'5',
      gong:0,
      typea:5,
      form:{deviceId:'',gatewayId:'',nameId:'',typeId:''},
      items:[],
      items2:[],
      items3:[],
      waterflg:'5',
    }
  },
  created: function () {
    this.gateway();
  },
  methods:{
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.getData(this.currentPage,this.pageSize,this.pId,this.gatewayId,this.typeId,this.Id);
    },
    // 所属项目下拉框列表
    // async project () {
    //   // this.gateway(this.pId,this.typea);
    // },
    // 网关下拉框
    async gateway () {
      const res3 = await this.$http.get(`/data/gateway/${this.projectId}/${this.typea}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data3 = res3.data
      if (data3.data.length == 0) {
        this.form.gatewayId = "无数据"
        this.items3 = [];
        this.form.deviceId = "无数据"
        this.items2 = [];
      } else {
        this.items3 = data3.data;
        var selectMsg3 = data3.data;
        this.gatewayId = selectMsg3[0].id;
        this.form.gatewayId = selectMsg3[0].name;
        this.deviceId(this.gatewayId,this.typeId);
      }
    },
    // 设备ID列表
    async deviceId (gatewayId,quality) {
      const res = await this.$http.get(`/data/node/${gatewayId}/${quality}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      if (data.data.length == 0) {
        this.form.deviceId = "无数据"
        this.items2 = [];
      } else {
        this.items2 = data.data
        this.Id = data.data[0].id
        this.form.deviceId = data.data[0].id
        this.form.typeId = this.typeId
      }
      this.getData(this.currentPage,this.pageSize,this.projectId,this.gatewayId,this.typeId,this.Id);
    },
    // 数据渲染列表
    async getData (currentPage,pageSize,projectId,gatewayId,typea,Id) {
      var json = Qs.stringify({
        projectId: projectId,
        gatewayId:gatewayId,
        type:typea,
        nodeId:Id,
      })
      const res = await this.$http.post(`/data/deviceDatagrid`,json,{params: {nowpage: currentPage,pagesize:pageSize}}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
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
    formatter(row, column) {
      if (row.warning == "0") {
        return "正常"
      } else if (row.warning == "1") {
        return "测量超过上线"
      } else if (row.warning == "2") {
        return "测量超过下线"
      } else if (row.warning == "3") {
        return "温度超过上限"
      } else if (row.warning == "4") {
        return "温度超过下线"
      }
    },
    // change:function(){
    //   this.pId = this.form.nameId
    //   this.gateway(this.pId,this.typea);
    // },
    change3:function(){
      this.gatewayId = this.form.gatewayId
      this.currentPage = 1;
      this.deviceId(this.gatewayId,this.typea);
    },
    change4:function(){
      this.typeId = this.form.typeId
      if (this.typeId == 5) {
        this.waterflg = '5';
      } else if (this.typeId == 6) {
        this.waterflg = '6';
      } else if (this.typeId == 7) {
        this.waterflg = '7';
      } else if (this.typeId == 8) {
        this.waterflg = '8';
      }
      this.currentPage = 1;
      this.deviceId(this.gatewayId,this.typeId);
    },
    change2:function(){
      this.Id = this.form.deviceId
      this.currentPage = 1;
      this.getData(this.currentPage,this.pageSize,this.pId,this.gatewayId,this.typeId,this.Id);
    },
  }
}
</script>
<style scoped>
  .countentWorpWater .divActiveRight{
    width: 100%;
    float: right;
    /* height: 419px; */
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
  }
  .countentWorpWater .divActiveRight .shujuLog{
    font-size: 16px;
    color: #333333;
    margin-bottom: 21px;
  }
  .el-form{
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
</style>
