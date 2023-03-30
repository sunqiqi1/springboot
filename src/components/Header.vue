<template>
  <div style="display: flex;line-height: 60px;">
    <div style="margin-top: 8px;cursor: pointer;">
      <i :class="icon" style="font-size: 20px;" @click="collapse"></i>
    </div>
    <div style="flex:1;text-align: center;font-size: 28px">
      <span>欢迎来到停车管理系统</span>
    </div>
    <el-dropdown>
      <span>{{user.name}}</span> <i class="el-icon-setting" style="margin-left: 10px;"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      user: JSON.parse(sessionStorage.getItem('CurUser'))
    }
  },
  props:{
    icon:String
  },
  methods:{
    toUser(){
      console.log('to_user')
      this.$router.push("/Home")
    },
    logout(){
      console.log('logout')
      this.$confirm("您确定要退出登录吗？","提示",{
        confirmButtonText: '确定',
        type: 'warning',
        center:true,
      })
          .then(()=>{
        //确认操作
        this.$message({
          type:'success',
          message:'退出登录成功'
        })
            this.$router.push("/")
            //清空当前登录信息
            sessionStorage.clear()
      })
          .catch(()=> {
                //取消操作
                this.$message({
                  type: 'info',
                  message: '已取消退出登录操作'
                })
          })
    },
    collapse(){
      this.$emit('doCollapse')
    }
  },
  created(){
    this.$router.push("/Home")
  }
}
</script>

<style scoped>

</style>