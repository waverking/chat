<template>
  <div>
    <request-nav-bar/>
    <request-box :myRequests='myRequests'/>
  </div>
</template>

<script>
  import RequestNavBar from './childComps/RequestNavBar'
  import RequestBox from './childComps/RequestBox'
  import getRequest from "network/getRequest"
  import { getAllRequestUsers } from 'network/handleRequest'
  import { labelMyself } from "common/utils"

  export default {
    name:'handleRequest',
    data () {
      return {
        myRequests:[]
      }
    },
    components:{
      RequestNavBar,
      RequestBox
    },
    mixins:[labelMyself],
    created () {  
      getRequest(this.$route.query.uid).then(res1 => { 
        getAllRequestUsers(res1.data[0].sendUIDS).then(res2 => {
          this.myRequests = res2.data
        })
      })
    }
  }
</script>

<style>

</style>