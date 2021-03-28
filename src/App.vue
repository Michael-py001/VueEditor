/**
 * Copyright © 2021 Michael. All rights reserved.
 * 
 * @author: Michael
 * @date: 2021-02-26 
 */
<template>
  <div id="app">
    <!-- <Edit
      @input="handleEditInput"
      @run="handleRun"
      @clear="clearShowCode"
      class="edit"
    ></Edit>
    <Show :codeText="editCode" ref="show" class="show">{{ editCode }}</Show> -->
    <code-mirror
      @input="handleEditInput"
      @run="handleRun"
      @clear="clearShowCode"
      :style="`width:${editWidth}`"
      class="codeMirror"
      ref="edit"
    ></code-mirror>
    <Show
      @back="back"
      :codeText="editCode"
      ref="show"
      class="show"
      :style="`width:${showWidth}`"
      @changeWidth="handleChangeWidth"
      :isMobile="isMobile"
    ></Show>
  </div>
</template>

<script>
import Edit from "@/components/edit.vue";
import Show from "@/components/show.vue";
import CodeMirror from "@/components/codeMirror.vue";
export default {
  data() {
    return {
      editCode: "",
      showWidth: "50%",
      editWidth: "50%",
      isMobile: false,
    };
  },
  mounted() {
    let width = document.documentElement.getBoundingClientRect().width;
    console.log("width:", width);
    if (width < 768) {
      // this.showWidth = "0%";
      this.$refs.show.$el.style.display = "none";
      console.log(this.$refs.show);
      this.editWidth = "100%";
      this.isMobile = true;
    }
    console.log(this.shouWidth);
  },
  components: {
    Edit,
    Show,
    CodeMirror,
  },

  methods: {
    // 返回编辑
    back() {
      console.log("back");
      this.showWidth = "0%";
      this.$refs.show.$el.style.display = "none";
      this.editWidth = "100%";
    },
    // 改变宽度
    handleChangeWidth(v1, v2) {
      console.log(v1, v2);
      // this.$refs.show.webkitCancelFullScreen();
      // this.$refs.show.webkitRequestFullScreen();
      this.editWidth = v1;
      this.showWidth = v2;
    },
    // 子组件传过来的value
    handleEditInput(value) {
      this.editCode = value;
    },
    handleRun() {
      // 方法一：通过$childern选中子组件，然后让子组件上的方法执行
      // console.log(this.$children);
      // if (this.editCode) {
      //   this.$children[1].renderCode();
      // }
      // return;

      // 方法二：通过$refs 让子组件上的方法执行
      // this.$refs["show"].renderCode();
      this.$refs.show.renderCode();
      if (this.isMobile) {
        this.$refs.show.$el.style.display = "block";
        // this.$refs.edit.$el.style.display = "none";
        console.log(this.$refs.show);
        this.showWidth = "100%";
        this.editWidth = "0%";
      }
    },
    clearShowCode(code) {
      console.log("clear");
      console.log(code);
      this.editCode = code;
      // this.$nextTick(() => {
      //   this.$children[1].clearCode();
      // });
    },
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}

html {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  // background: red;
  // font-size: 10px;
}

.el-popper .el-scrollbar {
  background-color: #282c34;
  .el-select-dropdown__wrap .el-select-dropdown__list {
    .selected {
      color: rgb(197, 192, 197);
    }
    .el-select-dropdown__item {
      color: rgb(182, 178, 178);
    }
    .el-select-dropdown__item.hover {
      background-color: #393e49;
      color: rgb(248, 242, 248);
    }
    .el-select-dropdown__item:hover {
      color: white;
      background-color: #1c1e24d2;
    }
  }
}
#app {
  display: flex;
  .codeMirror {
    transition: 0.3s width ease;
  }
  .show {
    transition: 0.3s width ease;
  }
}
@media screen and (max-width: 768px) {
  #app {
    .codeMirror {
      transition: 0.3s width ease;
      width: 100%;
    }
    .show {
      transition: 0.3s width ease;
      widows: 50%;
    }
  }
}
</style>