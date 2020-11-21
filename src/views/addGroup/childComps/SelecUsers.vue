<template>
  <div class="capacity">
    <div class="title">用戶</div>
    <nav-bar v-for="(item,index) in myFriends" :key="index" class="content"
            @click.native="chooseUser(index)">
      <div slot="left" class="left">
        <div class="status" ref="status"></div>
        <div class="image"><img :src="item.avator" alt=""></div>
      </div>
      <div slot="center" class="center"> {{item.username}}</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name:'SelectUsers',
    data () {
      return {
        users:[]
      }
    },
    props:{
      myFriends: {
        type:Array,
        default () {
          return []
        }
      }
    },
    components: {
      NavBar
    },
    methods:{
      chooseUser (index) {
        if(this.$refs.status[index].className === 'status') {
          this.$refs.status[index].className = 'activated'
          this.users.push(this.myFriends[index])
        }else {
          this.$refs.status[index].className = 'status'
          this.users.splice(index,1)
        }
        this.$bus.$emit('selectUsers',this.users)
      }
    }
  }
</script>

<style scoped>
.capacity {
  padding: 16px;
  margin-top: 14px;
}
.content {
  margin: 14px 0;
}
.title {
  font-size: 22px;
  font-weight: bold;
  color: #272832;
}
.left {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.status {
  width: 20px;
  height: 20px;
  background-color: #FFE431;
  border-radius: 50%;
  opacity: .6;
}
.center {
  margin-left: 18px;
  text-align: left;
  font-size: 17px;
  color: #272832 ;
}
.image {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden
}
.image img {
  width: 100%;
  height: 100%;
}
.activated {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #FFE431
              url(~assets/img/common/confirm.svg)
              no-repeat
              center/14px 14px;
}
</style>