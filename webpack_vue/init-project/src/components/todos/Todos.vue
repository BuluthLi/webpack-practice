<template>
  <div class="todos">
    <span>this is todos</span>
    <router-link :to="{path:'/',query:{id:555}}">go to home</router-link>
    <router-link :to="{path:'/todos',query:{id:666}}">go to todos</router-link>
    <div class="box">
      <input type="text" v-model="newTodo.text" @keydown.13="createTodo" />
      <ul>
        <li v-for="(item,index) in hai" :key="index">
          {{item.text}}
          <span @click="del(item)">删除</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      newTodo: {
        text: ""
      }
    };
  },
  computed: {
    ...mapGetters("add", {
      hai: "value"
    })
  },
  methods: {
    ...mapActions("add", {
      add: "acAddTodo",
      del: "acDelTodo"
    }),
    createTodo() {
      // 划重点
      // 这里使用扩展运算符，是防止this.newTodo.text = "";将数据置空，因为this.newTodo是对象引用类型（技巧）
      this.add({
        ...this.newTodo
      });
      this.newTodo.text = "";
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
</style>

