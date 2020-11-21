<template>
  <avator class="register-avator">
    <avator-item v-for="(item,index) in avators" :key="index" :avatorItem="item"
                 @click.native="chooseAvator(index)"
                 :class="{activated:currentIndex === index}"
                 ref="avatorItem"/> 
  </avator>
</template>

<script>
  import Avator from "components/common/avator/Avator"
  import AvatorItem from "components/common/avator/AvatorItem"
  export default {
    name:"RegisterAvator",
    data() {
      return {
        currentIndex:-1,
      }
    },
    props:{
      avators:{
        type:Array,
        default() {
          return []
        }
      }
    },
    components:{
      Avator,
      AvatorItem
    },
    methods:{
      chooseAvator(index) {
        this.currentIndex = index
        this.$emit("chooseAvator",this.$refs.avatorItem[index].$el.childNodes[0].currentSrc)
      }
    }
  }
</script>

<style scoped>
  .register-avator {
     margin: 30px auto 0;
  }
  .activated {
    box-shadow: 0 0 6px 6px #FFE431;
  }
</style>