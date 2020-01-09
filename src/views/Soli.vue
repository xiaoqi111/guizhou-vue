<template>
  <div class="countentWorpSol">
    <div class="">
      <el-form :model="formtop"  ref="form" label-width="10%" class="demo-ruleForm formTop">
        <el-form-item prop="nodeId">
            <el-select v-model="form.nodeId" @change="change1">
                <el-option v-for="item2 in items2" :key="item2.id" :label="item2.name" :value="item2.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="nameId">
            <el-select v-model="form.nameId" @change="change">
                <el-option v-for="item in items" :key="item.id" :label="item.id" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="divSoliWrap">
      <div class="divActive divSoli divSolifelx">
        <p class="soliSelect">
          <!-- <el-form :model="formSoli"  ref="formSoli" label-width="110px" class="demo-ruleForm">
            <el-form-item label="请选择传感设备" prop="device">
                <el-select v-model="formSoli.device" @change="change2">
                  <el-option v-for="itemNode in nodes" :key="itemNode.id" :label="itemNode.id" :value="itemNode.id"></el-option>
                </el-select>
            </el-form-item>
          </el-form> -->
        </p>
        <div class="soliStatus">
          <img src="../assets/icon/status.png" alt="">
          <p class="sbStatus">设备状态</p>
          <p class="working">{{working == 1 ?'未连接':'已连接'}}</p>
        </div>
      </div>
      <div class="divActive divSoli solit">
        <p class="soliSelect soliwd">
          土壤温度
        </p>
        <div class="soliStatus">
          <div class="wdBox">
            <img :src="wdf20" alt="">
          </div>
          <p class="working">{{solit}}℃</p>
        </div>
      </div>
      <div class="divActive divSoli divSoliright solit">
        <p class="soliSelect soliwd">
          土壤含水率
        </p>
        <div class="soliStatus soliWorking">
          <!-- <img src="../assets/icon/status.png" alt=""> -->
          <div id="pie" class="pie"></div>
          <p class="working">{{soliw}}%</p>
        </div>
      </div>
    </div>
    <div class="divActive divSoliproperty">
      <div v-for="(secondeItem,index) in seconde" class="propertyList" @mouseover="enter(index)" @mouseout="out(index)">
        <p class="propertyActive" :class="isActive == index ?'active':''"></p>
        <p class="propertyName" :class="classActive == index ?'classactive':''">
          {{secondeItem.attachments.current}}&nbsp;{{secondeItem.unit}}
        </p>
        <p class="propertyValue">
          <img :src="getImgUrl(secondeItem.url)" alt="">
          {{secondeItem.name}}
        </p>
      </div>
    </div>
    <div class="divActive divActiveRight">
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="图表" name="first">
          <div id="main"></div>
        </el-tab-pane>
        <el-tab-pane label="表格" name="second">
          <el-table :data="tableData3" style="width: 100%">
            <el-table-column
              v-for="(col,index) in cols"
              :prop="col.prop" :label="col.label" :key="col.index">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="shujuLog divshjuju">
        <span class="shujuHeader">数据展示</span>
        <el-form :model="form"  ref="form" label-width="10%" class="demo-ruleForm">
          <!-- <el-form-item prop="nodeId">
              <el-select v-model="form.nodeId" @change="change1">
                  <el-option v-for="item2 in items2" :key="item2.id" :label="item2.name" :value="item2.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="nameId">
              <el-select v-model="form.nameId" @change="change">
                  <el-option v-for="item in items" :key="item.id" :label="item.id" :value="item.id"></el-option>
              </el-select>
          </el-form-item> -->
          <el-form-item prop="gatewayId">
              <el-select v-model="form.gatewayId" @change="change3">
                  <el-option v-for="item3 in items3" :key="item3.key" :label="item3.name" :value="item3.key"></el-option>
              </el-select>
          </el-form-item>
          <div class="block">
            <el-date-picker
              v-model="dateVals"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions2"
              @change = "startflow">
            </el-date-picker>
          </div>
          <div class="derive" @click="excelTable">
            导出
          </div>
          <!-- <div class="inquire">
            查询
          </div> -->
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Qs from 'qs'

import wdf20 from '@/assets/icon/-20.png'
import wdf18 from '@/assets/icon/-18.png'
import wdf16 from '@/assets/icon/-16.png'
import wdf14 from '@/assets/icon/-14.png'
import wdf12 from '@/assets/icon/-12.png'
import wdf10 from '@/assets/icon/-10.png'
import wdf8 from '@/assets/icon/-8.png'
import wdf6 from '@/assets/icon/-6.png'
import wdf4 from '@/assets/icon/-4.png'
import wdf2 from '@/assets/icon/-2.png'

import wd0 from '@/assets/icon/0.png'
import wd2 from '@/assets/icon/2.png'
import wd4 from '@/assets/icon/4.png'
import wd6 from '@/assets/icon/6.png'
import wd8 from '@/assets/icon/8.png'
import wd10 from '@/assets/icon/10.png'
import wd12 from '@/assets/icon/12.png'
import wd14 from '@/assets/icon/14.png'
import wd16 from '@/assets/icon/16.png'
import wd18 from '@/assets/icon/18.png'
import wd20 from '@/assets/icon/20.png'
import wd22 from '@/assets/icon/22.png'
import wd24 from '@/assets/icon/24.png'
import wd26 from '@/assets/icon/26.png'
import wd28 from '@/assets/icon/28.png'
import wd30 from '@/assets/icon/30.png'
import wd32 from '@/assets/icon/32.png'
import wd34 from '@/assets/icon/34.png'
import wd36 from '@/assets/icon/36.png'
import wd38 from '@/assets/icon/38.png'
import wd40 from '@/assets/icon/40.png'
import wd42 from '@/assets/icon/42.png'
import wd44 from '@/assets/icon/44.png'
import wd46 from '@/assets/icon/46.png'

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
      typea:'',
      form:{nodeId:'',gatewayId:'',nameId:''},
      // formSoli:{device:''},
      items:[],
      nodes:[],
      items2:[],
      items3:[
        {name : "土壤温度" , key : "temperature"},
        {name : "土壤湿度" , key : "humidity"},
        {name : "土壤电导率" , key : "Conductivity"},
        {name : "土壤盐度" , key : "salinity"},
        {name : "总溶解固体" , key : "tds"},
        {name : "介电常数" , key : "epsilon"},
      ],
      seconde:[],
      isActive:-1,
      classActive:-1,
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      projectId:2,
      sysType:2,
      nodeType:2,
      // gatewayId:'ed7b9030-dca9-45b1-b6dd-39c86f2da897',
      solit:'',
      soliw:'',
      st:'',
      et:'',
      timeAge:[],
      dataAge:[],
      columnNameIndex:'土壤温度',
      wdf20:wd0,
      startLength:'',
      tableData3:[],
      activeName2: 'first',
      dateVals:'',
      columName:[],
      columa:[],
      bodyData:[],
      cols:[],
      formtop:{nodeId:'',nameId:''},
      working:'',
    }
  },
  created: function () {
    this.credNode();
    // this.defaultDate();
  },
  mounted: function () {
    // this.soilTemperature();
  },
  methods:{
    // defaultDate(){
    //     //获取新的时间(2019.4.12）
    //     let date = new Date()
    //     //获取当前时间的年份转为字符串
    //     let year = date.getFullYear().toString()   //'2019'
    //     //获取月份，由于月份从0开始，此处要加1，判断是否小于10，如果是在字符串前面拼接'0'
    //     let month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1).toString():(date.getMonth()+1).toString()  //'04'
    //     //获取天，判断是否小于10，如果是在字符串前面拼接'0'
    //     let da = date.getDate() < 10 ? '0'+date.getDate().toString():date.getDate().toString()  //'12'
    //     //字符串拼接，开始时间，结束时间
    //     let end = year + '-' + month + '-' + da  //当天'2019-04-12'
    //     // let beg = year + '-' + month + '-01'    //当月第一天'2019-04-01'
    //     this.dateVals = [end,end] //将值设置给插件绑定的数据
    //     // console.log(end);
    //     // console.log(beg);
    // },
    enter: function(index){
      this.isActive = index
      this.classActive = index;
    },
    out: function (index) {
      this.isActive = -1;
      this.classActive = -1;
    },
    async credNode () {
      const res = await this.$http.get(`/data/gateway/${this.projectId}/${this.nodeType}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      this.items2 = data.data;
      this.form.nodeId = this.items2[0].id;
      this.node(this.form.nodeId)
    },
    async node (nodeId,nameId) {
      const res = await this.$http.get(`/data/node/${nodeId}/${this.nodeType}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data.data);
      this.nodes = data.data;
      this.items = data.data;
      // this.formSoli.device = data.data[0].id;
      this.form.nameId = data.data[0].id;
      this.form.gatewayId = this.items3[0].key;
      this.homePage(this.form.nameId,nodeId);
      this.sysTypeAge(nodeId,this.form.nameId,this.items3[0].key,this.columnNameIndex);
      this.weatherTable(nodeId,this.form.nameId);
    },
    async weatherTable (nodeId,gatewayId) {
      var json = Qs.stringify({
        st: this.st,
        et: this.et
      })
      const res = await this.$http.post(`/excel/soil/${nodeId}/${gatewayId}`, json ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      console.log(data.data.body);
      this.columName = data.data.name;
      this.columa = data.data.column;
      this.tableData3 = data.data.body;
      this.bodyData = data.data.body;
      this.cols = data.data.cols;
    },
    // 导出表格
    async excelTable () {
      //excel数据导出
      require.ensure([], () => {
          const {
              export_json_to_excel
          } = require('../../excel/Export2Excel');
          const tHeader = this.columName;
          const filterVal = this.columa;
          const list = this.bodyData;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, "土壤数据");
      })
    },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    },
    async homePage (nodeId,id) {
      const res = await this.$http.post(`/data/sysType/${this.sysType}/${id}/${nodeId}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      this.seconde = data.data.seconde;
      this.solit = data.data.first.temperature;
      this.working = data.data.first.isDamage;

      // console.log(data.data.first.temperature);
      if (this.solit > 44 && this.solit < 46) {
        this.wdf20 = wd46;
      } else if (this.solit > 42 && this.solit < 44) {
        this.wdf20 = wd44;
      } else if (this.solit > 40 && this.solit < 42) {
        this.wdf20 = wd42;
      } else if (this.solit > 38 && this.solit < 40) {
        this.wdf20 = wd40;
      } else if (this.solit > 36 && this.solit < 38) {
        this.wdf20 = wd38;
      } else if (this.solit > 34 && this.solit < 36) {
        this.wdf20 = wd36;
      } else if (this.solit > 32 && this.solit < 34) {
        this.wdf20 = wd34;
      } else if (this.solit > 30 && this.solit < 32) {
        this.wdf20 = wd32;
      } else if (this.solit > 28 && this.solit < 30) {
        this.wdf20 = wd30;
      } else if (this.solit > 26 && this.solit < 28) {
        this.wdf20 = wd28;
      } else if (this.solit > 24 && this.solit < 26) {
        this.wdf20 = wd26;
      } else if (this.solit > 22 && this.solit < 24) {
        this.wdf20 = wd24;
      } else if (this.solit > 20 && this.solit < 22) {
        this.wdf20 = wd22;
      } else if (this.solit > 18 && this.solit < 20) {
        this.wdf20 = wd20;
      } else if (this.solit > 16 && this.solit < 18) {
        this.wdf20 = wd18;
      } else if (this.solit > 14 && this.solit < 16) {
        this.wdf20 = wd16;
      } else if (this.solit > 12 && this.solit < 14) {
        this.wdf20 = wd14;
      } else if (this.solit > 10 && this.solit < 12) {
        this.wdf20 = wd12;
      } else if (this.solit > 8 && this.solit < 10) {
        this.wdf20 = wd10;
      } else if (this.solit > 6 && this.solit < 8) {
        this.wdf20 = wd8;
      } else if (this.solit > 4 && this.solit < 6) {
        this.wdf20 = wd6;
      } else if (this.solit > 2 && this.solit < 4) {
        this.wdf20 = wd4;
      } else if (this.solit > 0 && this.solit < 2) {
        this.wdf20 = wd2;
      } else if (this.solit > -2 && this.solit < 0) {
        this.wdf20 = wd0;
      } else if (this.solit > -4 && this.solit < -2) {
        this.wdf20 = wdf2;
      } else if (this.solit > -6 && this.solit < -4) {
        this.wdf20 = wdf4;
      } else if (this.solit > -8 && this.solit < -6) {
        this.wdf20 = wdf6;
      } else if (this.solit > -10 && this.solit < -8) {
        this.wdf20 = wdf8;
      } else if (this.solit > -12 && this.solit < -10) {
        this.wdf20 = wdf10;
      } else if (this.solit > -14 && this.solit < -12) {
        this.wdf20 = wdf12;
      } else if (this.solit > -16 && this.solit < -14) {
        this.wdf20 = wdf14;
      } else if (this.solit > -18 && this.solit < -16) {
        this.wdf20 = wdf16;
      } else if (this.solit > -20 && this.solit < -18) {
        this.wdf20 = wdf18;
      } else if (this.solit > -22 && this.solit < -20) {
        this.wdf20 = wdf20;
      }

      this.soliw = data.data.first.humidity;

      var dom = document.getElementById('pie');
      var myChart = this.echarts.init(dom)
              var option = {
                  grid: {
                      top: 5,
                      bottom: 5,
                  },
                  color: ['#4394FD', 'rgba(128, 128, 128, 0.1)'],
                  series: [{
                      name: 'valueOfMarket',
                      type: 'pie',
                      center: ['50%', '50%'], // 饼图的圆心坐标
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      hoverAnimation: true,
                      label: { //  饼图图形上的文本标签
                          normal: { // normal 是图形在默认状态下的样式
                              show: false,
                              textStyle: {
                                  color: '#fff'  // 改变标示文字的颜色
                              }
                          },
                      },
                      itemStyle:{
                              show:false,
                              borderWidth:1,
                          },
                      data: [
                          {
                              value: this.soliw,
                              name: '%',
                              label: {
                                  normal: {
                                      show: true
                                  }
                              }
                          },
                          {
                              value: 100 - this.soliw,
                              name: '',
                              label: {
                                  normal: {
                                  show: false
                                  }
                              }
                          }
                      ]
                  }]
                }
              myChart.setOption(option);

      // if (data.status === '200') {
      //   this.items = data.data.weather;
      //   this.items2 = data.data.soil;
      // } else if (data.status === '500') {
      //   // 如果登录出现500的错误，弹出弹窗提示错误信息
      //   this.$message({
      //     message: data.msg,
      //     type: 'error'
      //   })
      // }
    },
    async sysTypeAge (pId,nodeId,column,columnName) {
      var json = Qs.stringify({
        st: this.st,
        et: this.et
      })
      const res = await this.$http.post(`/data/sysType/${this.sysType}/${pId}/${nodeId}/${column}`, json ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      this.timeAge = [];
      this.dataAge = [];
      for (var i = 0; i < data.data.length; i++) {
        this.timeAge.push(data.data[i].gatherTime);
        this.dataAge.push(data.data[i].field);
      }
      this.soilTemperature(this.timeAge,this.dataAge,columnName);
    },
    startflow (val) {
      this.st = val[0];
      this.et = val[1];
      this.sysTypeAge(this.form.nodeId,this.form.nameId,this.form.gatewayId,this.columnNameIndex);
      this.weatherTable(this.form.nodeId,this.form.nameId);
    },
    getImgUrl(icon){
       return "https://krjrobot.cn/krjrobot/img/syspage/"+icon
    },
    async soilTemperature (timeAge,dataAge,columnName) {
      if (dataAge.length > 40) {
        this.startLength = 100 - (4000/dataAge.length)
      } else {
        this.startLength = 0;
      }
        var dom = document.getElementById('main')
        var myChart = this.echarts.init(dom)
        var colors = ['#4299FE'];
        var option = {
            title: {
                text: columnName
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[columnName]
            },
            dataZoom : [
              {
                   type: 'slider',//图表下方的伸缩条
                   show : true,  //是否显示
                   realtime : true,  //
                   start : this.startLength,  //伸缩条开始位置（1-100），可以随时更改
                   end : 100,  //伸缩条结束位置（1-100），可以随时更改
              },
           ],
            grid: {
                left: '4%',
                right: '4%',
                bottom: '13%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                axisLabel:{
                  interval:0,
                  rotate:38,
                  margin: 20,
                  textStyle: {
                     color: '#444444'
                 },
                },
                axisLine: {  //设置x轴坐标线的样式
                    lineStyle: {
                        color: '#D1D1D1',//x轴坐标线的颜色
                    }
                },
                boundaryGap: false,
                data: timeAge,
            },
            yAxis: {
                // 背景线
                splitLine:{
                  lineStyle:{
                    type:'dashed',
                    color:'#D1D1D1'
                  }
                },
                axisLabel:{
                  margin: 20,
                  textStyle: {
                     color: '#444444'
                 },
                },
                axisTick:{ //y轴刻度线
        		       show:false
                },
                axisLine:{ //y轴
            	    show:false
                },
            },
            series: [
                {
                    name:columnName,
                    type:'line',
                    stack: '总量',
                    smooth: true,
                    data:dataAge,
                    lineStyle:{
                     color:'#4299FE'
                    },
                    itemStyle : {
                              normal : {
                                color:'#4299FE'
                              }
                    }
                },
            ]
        }
        myChart.setOption(option);
        window.onresize = function(){
            myChart.resize();
        }
    },
    change:function(val){
      this.sysTypeAge(this.form.nodeId,this.form.nameId,this.form.gatewayId,this.columnNameIndex);
      this.weatherTable(this.form.nodeId,this.form.nameId)
      this.homePage(val,this.form.nodeId);
      console.log(val);
    },
    change1:function(){
      this.node(this.form.nodeId,)
    },
    change3:function(key){
      let obj = {};
      obj = this.items3.find((item)=>{
          return item.key === key;
      });
      this.columnNameIndex = obj.name;
      // console.log(obj.name);
      this.sysTypeAge(this.form.nodeId,this.form.nameId,this.form.gatewayId,this.columnNameIndex);
    },
    // change2:function(val){
    //   this.homePage(val,this.form.nodeId);
    // },
    // async derive () {
    //   var i = myChart.getDataURL({
    // 		type:'png',
    // 		backgroundColor:'white'
    // 		// 导出的图片分辨率比例，默认为 1。
    // 		//pixelRatio: number,
    // 	});
    // 	$(this).attr("href",i);
    // 	$(this).attr("download","test.png");
    // },
  }
}
</script>
<style scoped>
  .countentWorpSol .divActiveRight{
    width: 100%;
    float: right;
    height: 498px;
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
    margin-bottom: 75px;
    position: relative;
  }
  .divSoliWrap{
    margin-bottom: 30px;
    display:-webkit-flex;
    display:flex;
  }
  .divSoliproperty{
    height: 235px;
    padding: 30px 0 0 20px;
    margin-bottom: 30px;
    box-sizing: border-box;
    display:-webkit-flex;
    display:flex;
  }
  .divSoliWrap .divSoli{
    float: left;
    height: 239px;
    padding: 11px 20px 0 20px;
    text-align: center;
    flex-grow: 1;
    margin-right: 20px;
  }
  .divSoliWrap .divSolifelx{
    flex-grow: 1;
  }
  .divSoliWrap .divSoliright{
    margin-right: 0;
  }
  .soliStatus{
    width: 210px;
    margin: 0 auto;
  }
  .soliWorking{
    width: 250px;
  }
  .soliStatus img{
    margin: 50px 60px 0 0;
    float: left;
  }
  .soliStatus p{
    float: left;
  }
  .soliStatus .sbStatus{
    margin-top: 48px;
  }
  .soliStatus .working{
    margin-top: 22px;
    color: #333333;
    font-size: 24px;
  }
  .countentWorpSol .divActiveRight .shujuLog{
    font-size: 16px;
    color: #333333;
    margin-bottom: 21px;
    border-bottom: 1px solid #dde3ff;
    overflow: hidden;
  }
  .el-form{
    height: 50px;
    float: right;
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
  .soliSelect .el-form-item{
    /* border-bottom: 1px solid #dde3ff; */
  }
  .soliSelect .el-form{
    width: 100%;
  }
  .soliSelect .el-form-item{
    float: none;
  }
  .divSoli .soliwd{
    /* border-bottom: 0.018519rem solid #dde3ff; */
    padding-bottom: 16px;
    margin-top: 4px;
    color: #666666;
    font-size: 16px;
  }
  .propertyList{
    height: 175px;
    border:1px solid rgba(219,229,248,1);
    border-radius:3px 3px 3px 3px;
    flex-grow: 1;
    margin-right: 20px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .propertyList .propertyName{
    height: 78px;
    line-height: 78px;
    text-align: center;
    color: #333333;
    font-size: 28px;
    position: relative;
  }
  .propertyList .propertyValue{
    text-align: center;
    color: #666666;
    font-size: 14px;
    border-top: 1px dashed #dde3ff;
  }
  .propertyList .propertyValue img{
    display: block;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 12px;
  }
  .propertyActive{
    height: 78px;
    width: 100%;
    position: absolute;
    top: -74px;
    transition: 0.5s;
    background:linear-gradient(90deg,#4397fe,#5984fe);
    box-shadow:0px 0px 10px 0px rgba(64,100,253,0.5);
    border-radius:3px 3px 3px 3px;
  }
  .propertyList .active{
    top: 0;
    transition: 0.5s;
  }
  .propertyList .classactive{
    color: #fff;
    transition: 0.5s;
  }
  .shujuLog .shujuHeader{
    float: left;
    margin-top: 9px;
  }
  .divActiveRight .el-range-editor.el-input__inner{
    margin-top: 4px;
    padding-top: 0;
    padding-bottom: 0;
    margin-left: 6%;
  }
  .inquire{
    width:52px;
    height:31px;
    line-height: 31px;
    background:#daeaff;
    border-radius:3px 3px 3px 3px;
    float: right;
    color: #2182F2;
    text-align: center;
    font-size: 14px;
    margin-right: 9px;
  }
  .derive{
    width:52px;
    height:31px;
    line-height: 31px;
    background:#fff5d0;
    border-radius:3px 3px 3px 3px;
    float: right;
    color: #E8BC20;
    text-align: center;
    font-size: 14px;
    margin-top: 4px;
    margin-left: 50px;
    cursor: pointer;
  }
  .divActiveRight .block{
    float: left;
  }
  #main{
    width: 100%;
    height: 356px;
  }
  .solit .working{
    margin-top: 80px
  }
  .pie{
    width: 146px;
    height: 146px;
    margin: 0 auto;
    margin-top: 23px;
    float: left;
  }
  .soliStatus .wdBox img{
    position: absolute;
    bottom: 5px;
    left: 40px;
  }
  .soliStatus .wdBox{
    width: 105px;
    height: 170px;
    background-image: url("../assets/icon/℃11.png");
    float: left;
    margin-top: 2px;
    margin-right: 11px;
    position: relative;
    cursor: pointer;
  }
  .countentWorpSol .divActiveRight .divshjuju{
    position: absolute;
    top: 16px;
    width: 97.5%;
  }
  .countentWorpSol .el-table{
    overflow: auto;
    height: 356px;
  }
  .countentWorpSol .el-table::before{
    height: 0;
  }
  .formTop{
    float: none;
  }
  .formTop .el-form-item{
    margin-bottom: 0;
  }
  .el-date-editor--daterange.el-input__inner{
    width: 250px;
  }
</style>
