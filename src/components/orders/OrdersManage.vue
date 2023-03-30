<template>
  <div>
    <div style="margin-bottom: 5px">
      <el-input v-model="carsnumber" placeholder="请输入车牌号" suffix-icon="el-icon-search" style="width: 200px"
                @keyup.enter.native="loadPost"></el-input>
      <el-select v-model="spot" placeholder="请选择停车场" style="margin-left: 5px;">
        <el-option
            v-for="item in spotData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="carstype" placeholder="请选择类型" style="margin-left: 5px;">
        <el-option
            v-for="item in carstypeData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 5px" @click="loadPost">查询</el-button>
      <el-button type="success" @click="resetParam">重置</el-button>
    </div>
    <el-table :data="tableData"
              :header-cell-style="{background:'#f2f5fc',color:'#555'}"
              border
    >
      <el-table-column prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="carsnumber" label="车牌号" width="180">
      </el-table-column>
      <el-table-column prop="spotname" label="停车场名称" width="180" >
      </el-table-column>
      <el-table-column prop="carstypename" label="类型" width="180" >
      </el-table-column>
      <el-table-column prop="username" label="停车用户" width="180">
      </el-table-column>
      <el-table-column prop="adminname" label="工作人员" width="180">
      </el-table-column>
      <el-table-column prop="money" label="付款金额" width="180">
      </el-table-column>
      <el-table-column prop="paytype" label="支付类型" width="180">
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180" >
      </el-table-column>

    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: "OrdersManage",
  data() {
    return {
      carstypeData:[],
      spotData:[],
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      carsnumber: '',
      spot: '',
      carstype: '',
      centerDialogVisible: false,
      form: {
        id: '',
        name: '',
        spot: '',
        carstype: '',
        carsnumber: '',
        remark: ''
      }
    }
  },
  methods: {
    formatSpot(row) {
      let temp = this.spotData.find(item => {
        return item.id == row.spot
      })
      return temp && temp.name
    },
    formatCarstype(row) {
      let temp = this.carstypeData.find(item => {
        return item.id == row.carstype
      })
      return temp && temp.name
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum = 1
      this.pageSize = val
      this.loadPost()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val
      this.loadPost()
    },
    resetParam() {
      this.carsnumber = '',
          this.spot = '',
          this.carstype = ''
    },
    loadPost() {
      this.$axios.post(this.$httpUrl + '/orders/listPage', {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        param: {
          carsnumber: this.carsnumber,
          spot: this.spot + '',
          carstype: this.carstype + ''
        }
      }).then(res => res.data).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.tableData = res.data
          this.total = res.total
        } else {
          alert('获取数据失败')
        }

      })
    },
    loadSpot(){
      this.$axios.get(this.$httpUrl+'/spot/list').then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.spotData=res.data
        }else{
          alert('获取数据失败')
        }

      })
    },
    loadCarstype(){
      this.$axios.get(this.$httpUrl+'/type/list').then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.carstypeData=res.data
        }else{
          alert('获取数据失败')
        }

      })
    }
  },
    beforeMount() {
      this.loadCarstype();
      this.loadSpot();
      this.loadPost();
    }
  }

</script>

<style scoped>

</style>