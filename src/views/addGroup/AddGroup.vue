<template>
  <div class="container">
    <add-nav-bar/>
    <add-logo/>
    <group-name/>
    <scroll class="scroll">
      <select-users :myFriends='myFriends'/>
    </scroll>
    <confirm/>
  </div>
</template>

<script>
  import AddNavBar from './childComps/AddNavBar'
  import AddLogo from './childComps/AddLogo'
  import GroupName from './childComps/GroupName'
  import SelectUsers from './childComps/SelecUsers'
  import Confirm from './childComps/Confirm'
  import Scroll from 'components/common/scroll/Scroll'
  import {getCurrentUser}from 'network/userlist'
  import {getPrivateDialogue} from 'network/getPrivateDialogue'
  export default {
    name:"AddGroup",
    data () {
      return {
        myFriends:[],
        count:0
      }
    },
    components: {
      AddNavBar,
      AddLogo,
      GroupName,
      SelectUsers,
      Confirm,
      Scroll
    },
    methods:{
      async init () {
        const myself = await getCurrentUser(this.$route.query.uid),
              target = await getPrivateDialogue(myself.data[0])
        this.myFriends = target.data.reduce((pre,curr) => [...pre,curr.friend],[])
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped>
  .container {
    height: 100vh;
    overflow: hidden;
  }
  .scroll {
    height: calc(100% - 316px);
  }
</style>