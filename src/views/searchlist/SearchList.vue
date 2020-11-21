<template>
  <div id="search-list">
    <search-nav-bar @reShowUsers="reShowUsers"/>
    <div class="title">用户</div>
    <scroll class="content">
      <user-list :allUsers="allUsers_1" class="search-users"
                  ref="userList"/>
    </scroll>
   
  </div>
</template>

<script>
  import SearchNavBar from "./childComps/SearchNavBar"
  import UserList from "./childComps/UserList"
  import Scroll from "components/common/scroll/Scroll"

  import { getAllUsers, getCurrentUser } from "network/userlist"
  import { getPrivateDialogue } from 'network/getPrivateDialogue'

  import { labelMyself } from "common/utils"
 
  export default {
    name:"SearchList",
    data() {
      return {
        allUsers_1:[],
        allUsers_2:[],
        myFriends:[]
      }
    },
    mixins:[labelMyself],
    components:{
      SearchNavBar,
      UserList,
      Scroll
    },
    methods:{
      async getUsers (uid) {
        const allUsers = await getAllUsers(uid),
              myself = await getCurrentUser(uid),
              myFriends = await getPrivateDialogue(myself.data[0])
        this.allUsers_2 = this.allUsers_1 = allUsers.data
        this.myFriends = myFriends.data.reduce((pre,curr) => [...pre,curr.friend],[])
        this.showMyFriends(this.allUsers_1,this.myFriends)
      },
      showMyFriends (allUsers,myFriends) {
        const userList = this.$refs.userList
        myFriends.forEach(item1 => {
          const index = allUsers.findIndex(item2 => item2._id === item1._id)
          if(index !== -1) {
            setTimeout(() => {
              userList.$refs.friend[index].hidden = true
              userList.$refs.message[index].hidden = false
            }, 0);
          }
        })
      },
      reShowUsers(inputValue) {
        let reg = new RegExp(inputValue)
        let temp = this.allUsers_2.filter(item => reg.test(item.username))
        this.allUsers_1 = temp
        this.showMyFriends(this.allUsers_1,this.myFriends)
      }
    },
    mounted () { 
      this.getUsers(this.$route.query.uid)
    },
  }
</script>

<style scoped>
  .test {
    color:blue
  }
  #search-list {
    height: 100vh;
    overflow: hidden;
  }
  .search-users {
    margin-top: 14px;
  }
  .content {
    height: calc(100% - 71px); 
    overflow: hidden;
  }
  .title {
    font-size: 24px;
    font-weight:bold;
    opacity: .8;
    margin: 24px 14px 10px;
  }
</style>