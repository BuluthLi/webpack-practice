<template>
  <div class="todos">
    <span>this is home</span>
    <router-link :to="{path:'/',query:{id:555}}">go to home</router-link>
    <router-link :to="{path:'/todos',query:{id:666}}">go to todos</router-link>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log("调试sourceMap");
  }
};
</script>
<style lang="less" scoped>
</style>

