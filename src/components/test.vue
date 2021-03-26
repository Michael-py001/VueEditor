/**
 * Copyright © 2021 Michael. All rights reserved.
 * 
 * @author: Michael
 * @date: 2021-02-26 
 */
<template>
  <!-- 在这输入template模板 -->
  <div class="test">
    666
    <button @click="fn">按钮</button>
  </div>
</template>

<script>
// 在这输入JS代码
export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    fn() {
      alert("OK");
    },
  },
};
</script>
<style scoped>
/* 在这输入CSS样式 */
.test {
  width: 100px;
  height: 100px;
  font-size: 24px;
  background-color: yellowgreen;
  color: white;
}
button {
  background-color: tomato;
  color: white;
}
</style>