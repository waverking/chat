<template>
  <div ref="wrapper">
    <div ref="chat">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Bscroll from "better-scroll"
  export default {
    name:"Scroll",
    data() {
      return {
        scroll:null
      }
    },
    mounted() {
      this.scroll = new Bscroll(this.$refs.wrapper,{
        probeType:3,
        click:true,
        pullUpLoad:true
      })
      this.scroll.on('scroll',position => {
        this.$emit('recordPositon',position)
      })
    },
    methods:{
      scrollTo (y) {
        this.scroll && this.scroll.scrollTo(0,y,100)
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
 
