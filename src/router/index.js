import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import index from '../components/index.vue'
import UserManage from "@/components/user/UserManage.vue";
import Home from "@/components/Home.vue";
import AdminManage from "@/components/admin/AdminManage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    children:[
      {
        path: '/Home',
        name: 'home',
        meta:{
          title:'首页'
        },
        component: Home
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})
export function resetRouter() {
  router.matcher = new VueRouter({
    mode:'history',
    routes: []
  }).matcher
}
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default router
