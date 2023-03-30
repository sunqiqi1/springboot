<template>
  <div>
    <div style="margin-bottom: 5px">
      <el-input v-model="name" placeholder="请输入车主名字" suffix-icon="el-icon-search" style="width: 200px"
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
      <el-button type="primary" style="margin-left: 5px" @click="add">新增</el-button>
    </div>
    <el-table :data="tableData"
              :header-cell-style="{background:'#f2f5fc',color:'#555'}"
              border
    >
      <el-table-column prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="name" label="车主姓名" width="180">
      </el-table-column>
      <el-table-column prop="spot" label="停车场名称" width="180" formatter="formatSpot">
      </el-table-column>
      <el-table-column prop="carstype" label="类型" width="180" formatter="formatCarstype">
      </el-table-column>
      <el-table-column prop="number" label="车牌号" width="180">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180" >
      </el-table-column>
      <el-table-column prop="operate" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="mod(scope.row)">编辑</el-button>
          <el-popconfirm
              title="这是一段内容确定删除吗？"
              @confirm="del(scope.row.id)"
              style="margin-left: 5px;"
          >
            <el-button slot="reference" size="small" type="danger" >删除</el-button>
          </el-popconfirm>
        </template>
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

    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>

      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="车主姓名" prop="name">
          <el-col :span="15">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="停车场名称" prop="spot">
          <el-col :span="15">
            <el-select v-model="form.spot" placeholder="请选择停车场" style="margin-left: 5px;">
              <el-option
                  v-for="item in spotData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="类型" prop="carstype">
          <el-col :span="15">
            <el-select v-model="form.carstype" placeholder="请选择类型" style="margin-left: 5px;">
              <el-option
                  v-for="item in carstypeData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="车牌号" prop="number">
          <el-col :span="15">
            <el-input v-model="form.number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-col :span="15">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CarsManage",
  data() {
    return {
      spotData: [],
      carstypeData: [],
      tableData: [],
      pageSize:10,
      pageNum:1,
      total:0,
      name:'',
      spot:'',
      carstype: '',
      centerDialogVisible:false,
      form:{
        id:'',
        name:'',
        spot:'',
        carstype:'',
        number:'',
        remark:''
      },
      rules: {
        name: [
          {required: true, message: '请输入车主姓名', trigger: 'blur'},
        ],
        spot:[
          {required: true, message: '请选择停车场', trigger: 'blur'},
        ],
        carstype:[
          {required: true, message: '请选择类型', trigger: 'blur'},
        ]
      }
    }
  },
  methods:{
    formatSpot(row){
      let temp = this.spotData.find(item=>{
        return item.id==row.spot
      })
      return item && temp.name
    },
    formatCarstype(row){
      let temp = this.carstypeData.find(item=>{
        return item.id==row.carstype
      })
      return item && temp.name
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    add(){
      this.centerDialogVisible=true
      this.$nextTick(()=>{
        this.resetForm();
        this.form.id=''
      })
    },
    mod(row){
      this.centerDialogVisible=true
      this.$nextTick(()=>{
        //赋值到表单
        this.form.id=row.id
        this.form.name=row.name
        this.form.spot=row.spot
        this.form.carstype=row.carstype
        this.form.number=row.number
        this.form.remark=row.remark
      })
    },
    del(id){
      console.log(id)
      this.$axios.get(this.$httpUrl+'/cars/del?id='+id).then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.centerDialogVisible=false
          this.loadPost()
        }else{
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }

      })
    },
    doSave(){
      this.$axios.post(this.$httpUrl+'/cars/save',this.form).then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.centerDialogVisible=false
          this.loadPost()
          this.resetForm()
        }else{
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }

      })
    },
    doMod(){
      this.$axios.post(this.$httpUrl+'/cars/update',this.form).then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.centerDialogVisible=false
          this.loadPost()
          this.resetForm()
        }else{
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }

      })
    },
    save(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.form.id){
            this.doMod();
          }else {
            this.doSave();
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum=1
      this.pageSize=val
      this.loadPost()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum=val
      this.loadPost()
    },
    resetParam(){
      this.name='',
          this.spot='',
          this.carstype=''
    },
    loadPost(){
      this.$axios.post(this.$httpUrl+'/cars/listPage',{
        pageSize:this.pageSize,
        pageNum:this.pageNum,
        param:{
          name:this.name,
          spot:this.spot+'',
          carstype:this.carstype+''
        }
      }).then(res=>res.data).then(res=>{
        console.log(res)
        if(res.code==200){
          this.tableData=res.data
          this.total=res.total
        }else{
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
    this.loadSpot();
    this.loadCarstype();
    this.loadPost();
  }
}
</script>

<style scoped>

</style>