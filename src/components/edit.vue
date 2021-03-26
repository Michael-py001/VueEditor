/**
 * Copyright © 2021 Michael. All rights reserved.
 * 
 * @author: Michael
 * @date: 2021-02-26 
 */
<template>
  <div class="edit">
    <header class="edit-options">
      <div class="title">VueEitor</div>
      <button @click="$emit('run')">运行</button>
      <button @click="claerCode">清空</button>
    </header>
    <main class="edit-box">
      <!-- v-model就是value属性和input事件的语法糖，这里拆开使用 ;input事件传递给父组件-->
      <textarea
        :value="code"
        @input="handleInput"
        class="topnav_box"
      ></textarea>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: `<template>
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
<\/script>
<style scoped>
/* 在这输入CSS样式 */
.test {
  width: 100px;
  height: 100px;
  font-size: 24px;
  background-color: yellowgreen;
}
button {
  background-color: tomato;
  color: white;
}
</style>`,
    };
  },
  components: {},
  mounted() {
    setTimeout(() => {
      this.$emit("input", this.code);
    }, 500);
  },
  methods: {
    handleInput(e) {
      this.code = e.target.value;
      this.$emit("input", this.code);
    },
    claerCode() {
      console.log("清空");
      const comfir = window.confirm(
        "您确定要清空输入框吗？一旦清空将无法恢复！"
      );
      if (comfir) {
        this.code = " ";
        this.$emit("clear", this.code);
      } else {
        return;
      }
    },
  },
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

.edit {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  //   width: 100%;
  //   height: 100%;
  //   background-color: cadetblue;
  .edit-options {
    box-sizing: border-box;
    // background-color: chocolate;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #666;
    padding: 5px;
    background: #282c34;
    color: coral;
    .title {
      font-weight: 600;
      line-height: 30px;
    }
    button {
      text-align: center;
      line-height: 30px;
      width: 80px;
      height: 100%;
      border-radius: 10px;
      border: none;
      background-color: coral;
      color: white;
      font-size: 20px;
      outline: none;
      -moz-user-select: none;
      -webkit-user-select: none;
    }
    button:active {
      background-color: rgb(233, 80, 24);
    }
  }
  .edit-box {
    border-right: 1px solid #666;
    width: 100%;
    height: 100%;
    // background-color: chartreuse;
    box-sizing: border-box;
    textarea {
      background: #282c34;
      color: #bbc3d1;
      resize: none;
      box-sizing: border-box;
      width: 100%;
      min-height: 620px;
      border: none;
      outline: none;
      font-size: 20px;
      word-break: keep-all;
    }
    .topnav_box::-webkit-scrollbar    //滚动条整体部分
    {
      width: 5px;
      height: 10px;
      background-color: #b5b1b1;
    }
    .topnav_box::-webkit-scrollbar-track       //scroll轨道背景
    {
      -webkit-box-shadow: inset 0 0 6px rgba(32, 16, 53, 0.664);
      box-shadow: inset 0 0 6px rgba(32, 16, 53, 0.664);
      border-radius: 10px;
      background-color: #21242b;
    }

    .topnav_box::-webkit-scrollbar-thumb   //滚动条中能上下移动的小块
    {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(12, 147, 226, 0.596);
      box-shadow: inset 0 0 6px rgba(12, 147, 226, 0.596);
      background-color: #b5b1b1a6;
    }
  }
}
</style>