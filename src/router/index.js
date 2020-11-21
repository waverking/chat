import Vue from 'vue'
import VueRouter from 'vue-router'

const MainPage = () => import('views/mainPage/MainPage'),
      Register = () => import("views/register/Register"),
      Login = () => import("views/login/Login"),
      UserList = () => import("views/userlist/UserList"),
      SearchList = () => import("views/searchlist/SearchList"),
      HandleRequest = () => import("views/handlerequest/handleRequest"),
      PrivateChat = () => import("views/privatechat/PrivateChat"),
      AddGroup = () => import('views/addGroup/AddGroup'),
      GroupChat = () => import('views/groupchat/GroupChat')

 

Vue.use(VueRouter)

  const routes = [
    {
      path:"",
      redirect:"/mainpage"
    },
    {
      path:'/mainpage',
      component: MainPage
    },
    {
      path:"/register",
      component:Register
    },
    {
      path:"/login",
      component:Login
    },
    {
      path:"/userlist",
      component:UserList
    },
    {
      path:"/searchlist",
      component: SearchList
    },
    {
      path:'/handlerequest',
      component:HandleRequest
    },
    {
      path:'/privatechat',
      component: PrivateChat
    },
    {
      path:'/addgroup',
      component:AddGroup
    },
    {
      path:'/groupchat',
      component: GroupChat
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
