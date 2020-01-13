<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
}
ul,li,ol{
  list-style: none;
}
* {
  margin: 0;
  padding: 0;
}
.el-input__inner{
  height: 31px!important;
  line-height: 31px!important;
}
.el-table__header-wrapper th, .el-table__header-wrapper tr{
  background: #F5F6FA!important;
}
/* .el-table thead,.has-gutter>tr{
  background: #F5F6FA!important;
} */
.has-gutter tr th{
  text-align: center;
}
.el-table__body tr td{
  text-align: center;
}
.buttomCount>div{
  margin-left:10px;
}
.tableData td{
  border-bottom: 0;
}
.tableData .el-table__body tr:hover>td{
  background: transparent;
}
.el-switch__label--left{
  position: relative;
  left: 46px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right{
  position: relative;
  right: 46px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right.is-active{
  z-index: 1111;
  color: #fff !important;
}
.el-switch__label--left.is-active{
  z-index: 1111;
  color: #9c9c9c !important;
}
.el-button--text{
  padding: 0!important;
}
.el-table th>.cell{
  color: #333333;
}
.el-table .cell{
  color:#666666;
}
.el-submenu .el-menu-item{
  margin-left: 34px!important;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  padding: 0!important;
  border-left: 1px solid #3c8dbc;
  text-indent: 3px;
}
.el-menu-item-group__title{
  padding:0!important;
}
.leftList .fa{
  position: relative;
  left: -11px;
}
/* .el-menu-item.is-active{
  color: #fff!important;
} */
.router-link-active .is-active{
  color: #fff!important;
}
.xiugaiBox .el-dialog{
  overflow: hidden;
  width: 35%;
}
.xiugaiBox .el-dialog .el-form-item{
  float: none;
}
.el-tabs__item.is-active{
  color: #fff!important;
  background-color: #409EFF;
  border-color: #409EFF;
}
.tabsDiv .el-tabs--card>.el-tabs__header .el-tabs__nav{
  border: none;
}
.tabsDiv #tab-first{
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.tabsDiv #tab-second{
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.soliSelect .el-form-item__content{
  float: left;
  margin-left: 0!important;
}
.divActiveRight .leftmargin .el-form-item__label{
  text-align: left;
}
.divActive .el-tabs--card>.el-tabs__header{
  margin-left: 100px;
  border-bottom: none;
}
.el-tabs--card>.el-tabs__header .el-tabs__item{
  border-bottom: 1px solid #e4e7ed;
}
.jSform{
  overflow: hidden;
}
.countentWorpDev .divActiveActive .el-tabs--top .el-tabs__item.is-top:nth-child(2){
  padding-left: 0.37037rem;
}
.countentWorpDev .divActiveActive .el-tabs--top .el-tabs__item.is-top:last-child{
  padding-right: 0.37037rem;
}
.el-progress-bar__outer{
  background-color: transparent;
}
</style>
