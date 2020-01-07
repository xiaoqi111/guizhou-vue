<template>
  <div class="countentWorpPm">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        项目列表
        <el-form :model="form"  ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item label="项目管理" prop="nameId">
              <el-select v-model="form.nameId" @change="change">
                  <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item class="buttomCount">
            <el-button type="primary" v-show="falg" @click="dialogVisible = true">增加项目</el-button>
            <el-dialog
              title="增加项目"
              :visible.sync="dialogVisible"
              width="30%">
              <el-form :model="jSform" ref="form" label-width="100px" class="jSform demo-ruleForm">
                <el-form-item label="项目名称" prop="username">
                  <el-input v-model="jSform.username" placeholder="请输入项目名称"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="equipmentAdd">增 加</el-button>
              </span>
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="tableData"
        class="tableData"
        style="width: 100%"
        :span-method="arraySpanMethod">
        <el-table-column
          type="index"
          label="序号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="项目名称">
        </el-table-column>
        <el-table-column
          label="项目类别">
          <template slot-scope="scope">
  　　　　　　<el-button type="text" @click="checkDetail(scope.row.type)">{{scope.row.sysName}}</el-button>
             <!-- <el-button type="text" @click="checkDetail(scope.row.type)" v-else-if="scope.row.type == '2'">土壤监测系统</el-button>
             <el-button type="text" @click="checkDetail(scope.row.type)" v-else>水阀监测系统</el-button> -->
　　　　  </template>
        </el-table-column>
        <el-table-column
          prop="gNum"
          label="设备数量">
        </el-table-column>
        <!-- <el-table-column
          prop="conductivity"
          label="备注">
        </el-table-column> -->
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
      gong:0,
      typea:'soil',
      form:{typeId:'',nameId:''},
      jSform:{username:''},
      items:[],
      items2:[],
      dialogVisible: false,
      provinceArr: [], //序号要合并数组 [2,0,1,3,0,0] 代表第一二行合并,第三行不变,第四五六行合并,0代表原本的那一行被合并,因此这个列被消除
      provincePos: 0, //序号要合并数组内容的序号
      cityArr: [], //同上 项目名称
      cityPos: [],
      falg:true,
      access:''
    }
  },
  mounted () {
    this.project();
  },
  created: function () {
    if (localStorage.access == 2) {
      this.falg = false;
    }
  },
  methods:{
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.getData(this.currentPage,this.pageSize,this.pId);
    },
    // 所属项目下拉框列表
    async project () {
      const res2 = await this.$http.get(`/data/project`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data2 = res2.data
      this.items = data2.data;
      var selectMsg = data2.data;
      this.pId = selectMsg[0].id;
      this.getData(this.currentPage,this.pageSize,this.pId);
    },
    // 数据渲染列表
    async getData (currentPage,pageSize,pId) {
      const res = await this.$http.get(`/data/count`,{params: {pId: pId,nowpage: currentPage,pagesize:pageSize}}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data);
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
        this.merage() //合并的方法
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    arraySpanMethod({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        //第一列的合并方法,省
        const _row_1 = this.provinceArr[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        }
      } else if (columnIndex === 1) {
        //第二列的合并方法,市
        const _row_2 = this.cityArr[rowIndex];
        const _col_2 = _row_2 > 0 ? 1 : 0;
        return {
          rowspan: _row_2,
          colspan: _col_2
        }
      }
    },
    merage() {
      //要合并的数组的方法
      this.merageInit();
      for (var i = 0; i < this.tableData.length; i++) {
        if (i === 0) {
          //第一行必须存在
          this.provinceArr.push(1);
          this.provincePos = 0;
          this.cityArr.push(1);
          this.cityPos = 0;
        }
        else {
          // 判断当前元素与上一个元素是否相同 this.provincePos是provinceArr内容的序号
          //序号
          if (this.tableData[i].index === this.tableData[i - 1].index) {
            this.provinceArr[this.provincePos] += 1;
            this.provinceArr.push(0);
          } else {
            this.provinceArr.push(1);
            this.provincePos = i;
          }
          //项目名称
          if (this.tableData[i].name === this.tableData[i - 1].name) {
            this.cityArr[this.cityPos] += 1;
            this.cityArr.push(0);
          } else {
            this.cityArr.push(1);
            this.cityPos = i;
          }
        }
      }
    },
    merageInit() {
      //初始化省的合并行的数组
      this.provinceArr = [];
      this.provincePos = 0;
    },
    stateFormat(row, column) {
      // console.log(row.type)
      if (row.type === "1") {
        return '气象监测系统'
      } else if (row.type === "2") {
        return '土壤监测系统'
      } else if (row.type === "3") {
        return '水阀监测系统'
      }
    },
    checkDetail(type){
      // console.log(type);
      if (localStorage.access == 0) {
        if (type == "1") {
          this.$router.push({ path:'/Weather'})
        } else if (type == "2") {
          this.$router.push({ path:'/Soli'})
        } else {
          this.$router.push({ path:'/Water'})
        }
      }
    },
    // 增加项目
    async equipmentAdd(){

      if (this.jSform.username == '') {
        this.$message({
          message: '请输入项目名称',
          type: 'error'
        })
      } else {
        const res = await this.$http.post(`/project/${this.jSform.username}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        const data = res.data
        if (data.status == "200") {
          this.$message({
            type: 'success',
            message: '设备添加成功!'
          });
          this.dialogVisible = false;
          this.getData(this.currentPage,this.pageSize,this.pId);
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      }
    },
    change:function(){
      this.pId = this.form.nameId
      this.getData(this.currentPage,this.pageSize,this.pId);
    },
  }
}
</script>
<style>
  .countentWorpPm .divActiveRight{
    width: 100%;
    float: right;
    height: 419px;
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
  }
  .countentWorpPm .divActiveRight .shujuLog{
    font-size: 16px;
    color: #333333;
    margin-bottom: 21px;
  }
  .countentWorpPm>.divActiveRight>.shujuLog>.el-form{
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
  .tableData td{
    border-bottom: 0;
  }
  .tableData div .el-table__body tbody tr:hover>td{
    background: transparent;
  }
  /* .jSform{
    float: none;
    height: 100px;
  } */
</style>
