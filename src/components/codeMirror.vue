<template>
  <div class="edit">
    <!-- <textarea ref="textarea"></textarea> -->
    <!-- <el-select class="code-mode-select" v-model="mode" @change="changeMode">
      <el-option
        v-for="mode in modes"
        :key="mode.value"
        :label="mode.label"
        :value="mode.value"
      >
      </el-option>
    </el-select> -->
    <header class="edit-options">
      <div class="title">VueEditor</div>
      <button @click="$emit('run')">运行</button>
      <button @click="clearCode">清空</button>
    </header>
    <div class="edit-blur"></div>
    <main class="edit-box">
      <!-- v-model就是value属性和input事件的语法糖，这里拆开使用 ;input事件传递给父组件-->
      <textarea
        :value="code"
        @input="handleInput"
        class="topnav_box"
        ref="textarea"
      ></textarea>
      <el-select
        class="code-mode-select"
        size="mini"
        v-model="mode"
        @change="changeMode"
      >
        <el-option
          v-for="mode in modes"
          :key="mode.value"
          :label="mode.label"
          :value="mode.value"
        >
        </el-option>
      </el-select>
    </main>
  </div>
</template>

<script type="text/ecmascript-6">
// // 引入全局实例
// import _CodeMirror from "codemirror";

// 引入局部组件
import _CodeMirror from "codemirror/lib/codemirror";
import emmet from "@emmetio/codemirror-plugin";
// 核心样式
import "codemirror/lib/codemirror.css";
// 引入主题后还需要在 options 中指定主题才会生效
import "codemirror/theme/seti.css";

// 需要引入具体的语法高亮库才会有对应的语法高亮效果
// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/r/r.js";
import "codemirror/mode/shell/shell.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/swift/swift.js";
import "codemirror/mode/vue/vue.js";

import "codemirror/addon/hint/show-hint.css";

require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/css-hint");
require("codemirror/addon/hint/html-hint");
// require("codemirror/addon/hint/javascript-hint");
// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror;
emmet(CodeMirror);
export default {
  name: "in-coder",
  props: {
    // 外部传入的内容，用于实现双向绑定
    value: String,
    // 外部传入的语法类型
    language: {
      type: String,
      default: null,
    },
  },
  componnent: {},
  data() {
    return {
      // 内部真实的内容
      code: `<template>
  <!-- 在这输入template模板 -->
  <div id="test">
    <div class="bad">{{msg}}
       <button @click="fn">{{clickText}}</button>
    </div>
  </div>
</template>

<script>
// 在这输入JS代码
export default {
  data() {
    return {
      msg:"运行成功啦!",
      clickText:"Click"
    };
  },
  methods: {
    fn() {
      alert("OK");
    },
  },
};
<\/script>

// 支持Sass&Scss&Stylus
<style lang='stylus'>
.bad
  color:yellowgreen
  font-size: 54px
  button
    background-color: tomato
    font-size: 34px
    color: white
</style>`,
      // 默认的语法类型，用于elementui上的select默认显示
      mode: "Vue",
      // 编辑器实例
      coder: null,
      // 默认配置
      options: {
        // codemirror config
        flattenSpans: false, // 默认情况下，CodeMirror会将使用相同class的两个span合并成一个。通过设置此项为false禁用此功能
        tabSize: 2, // tab缩进空格数
        mode: "text/x-vue", // codeMirror默认语言
        // 主题，对应主题库 JS 需要提前引入
        theme: "seti", // 主题
        smartIndent: true, // 是否智能缩进
        lineNumbers: true, // 显示行号
        matchBrackets: true, // 匹配符号
        lineWiseCopyCut: true, // 如果在复制或剪切时没有选择文本，那么就会自动操作光标所在的整行
        indentWithTabs: true, // 在缩进时，是否需要把 n*tab宽度个空格替换成n个tab字符
        electricChars: true, // 在输入可能改变当前的缩进时，是否重新缩进
        indentUnit: 2, // 缩进单位，默认2
        autoCloseTags: true, // 自动关闭标签
        autoCloseBrackets: true, // 自动输入括弧
        foldGutter: true, // 允许在行号位置折叠
        cursorHeight: 1, // 光标高度
        // keyMap: "sublime", // 快捷键集合
        extraKeys: {
          "Ctrl-Alt": "autocomplete",
          Tab: "emmetExpandAbbreviation",
          Esc: "emmetResetAbbreviation",
          Enter: "emmetInsertLineBreak",
        }, //智能提示
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 用来添加额外的gutter
        styleActiveLine: true, // 激活当前行样式
      },
      // 支持切换的语法高亮类型，对应 JS 已经提前引入
      // 使用的是 MIME-TYPE ，不过作为前缀的 text/ 在后面指定时写死了
      modes: [
        {
          value: "css",
          label: "CSS",
        },
        {
          value: "javascript",
          label: "Javascript",
        },
        {
          value: "html",
          label: "XML/HTML",
        },
        {
          value: "x-java",
          label: "Java",
        },
        {
          value: "x-objectivec",
          label: "Objective-C",
        },
        {
          value: "x-python",
          label: "Python",
        },
        {
          value: "x-rsrc",
          label: "R",
        },
        {
          value: "x-sh",
          label: "Shell",
        },
        {
          value: "x-sql",
          label: "SQL",
        },
        {
          value: "x-swift",
          label: "Swift",
        },
        {
          value: "x-vue",
          label: "Vue",
        },
        {
          value: "markdown",
          label: "Markdown",
        },
      ],
    };
  },
  mounted() {
    // 初始化
    this._initialize();
    // 通知更新子组件2
    setTimeout(() => {
      this.$emit("input", this.code);
    }, 500);
  },
  methods: {
    handleInput(e) {
      this.code = e.target.value;
      this.$emit("input", this.code);
    },
    clearCode() {
      console.log(this.code);
      const comfir = window.confirm(
        "您确定要清空输入框吗？一旦清空将无法恢复！"
      );
      if (comfir) {
        this.code = "";
        console.log("清空:", this.code);
        this.coder.setValue(this.value || this.code);
        this.$emit("clear", this.code);
      } else {
        return;
      }
    },
    // 初始化
    _initialize() {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.coder = CodeMirror.fromTextArea(this.$refs.textarea, this.options);
      // 编辑器赋值
      this.coder.setValue(this.value || this.code);
      // Register extension on CodeMirror object

      // 支持双向绑定
      this.coder.on("change", (coder) => {
        this.code = coder.getValue();

        if (this.$emit) {
          this.$emit("input", this.code);
        }
      });
      // 自动代码提示
      // this.coder.on("cursorActivity", function (coder) {
      //   coder.showHint();
      // });
      // console.log(this.language);
      // 尝试从父容器获取语法类型
      // if (this.language) {
      //   // 获取具体的语法类型对象
      //   let modeObj = this._getLanguage(this.language);

      //   // 判断父容器传入的语法是否被支持
      //   if (modeObj) {
      //     this.mode = modeObj.label;
      //   }
      // }
      // },
      // 获取当前语法类型
      // _getLanguage(language) {
      //   // 在支持的语法类型列表中寻找传入的语法类型
      //   return this.modes.find((mode) => {
      //     // 所有的值都忽略大小写，方便比较
      //     let currentLanguage = language.toLowerCase();
      //     let currentLabel = mode.label.toLowerCase();
      //     let currentValue = mode.value.toLowerCase();

      //     // 由于真实值可能不规范，例如 java 的真实值是 x-java ，所以讲 value 和 label 同时和传入语法进行比较
      //     return (
      //       currentLabel === currentLanguage || currentValue === currentLanguage
      //     );
      //   });
    },
    // 更改模式
    changeMode(val) {
      console.log(val);
      // 修改编辑器的语法配置
      this.coder.setOption("mode", `text/${val}`);
      // console.log(this._getLanguage(val));
      // 获取修改后的语法
      // let label = this._getLanguage(val).label.toLowerCase();

      // 允许父容器通过以下函数监听当前的语法值
      // this.$emit("language-change", label);
    },
  },
};
</script>

<style lang="less" scope>
* {
  margin: 0;
  padding: 0;
}
.emmet-abbreviation-preview {
  background-color: aquamarine;
  color: red;
  border: 1px solid rgb(129, 126, 126);
  opacity: 0.9;
  z-index: 99;
  .CodeMirror-lines {
    background-color: rgba(35, 38, 53, 0.575);

    .CodeMirror-code {
      .cm-tag {
        color: rgb(202, 199, 199);
      }
    }
  }
}
.edit {
  position: relative;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  //   width: 100%;
  height: 100vh;
  //   background-color: cadetblue;

  .edit-options {
    z-index: 99;
    box-sizing: border-box;
    // background-color: chocolate;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 6%;
    // border-bottom: 1px solid #666;
    padding: 5px;
    background: rgba(31, 33, 46, 0.993);
    backdrop-filter: saturate(180%) blur(10px);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.8);
    color: rgba(170, 170, 177, 0.993);

    // filter: blur(2px);
    // filter: blur(1px);
    // position: relative;
    .title {
      text-shadow: 4px 4px 3px rgb(0, 0, 0, 99%);
      font-weight: 600;
      font-size: 23px;
      line-height: 30px;
      user-select: none;
    }

    button {
      min-width: 56px;
      padding: 10px;
      text-align: center;
      line-height: 10px;
      height: 100%;
      border-radius: 10px;
      border: none;
      background-color: #393e49;
      // box-shadow: inset 0 0 3px rgba(63, 7, 136, 0.911);
      box-shadow: 2px 2px 5px rgba(17, 17, 17, 0.911);
      color: #d5deee;
      font-size: 18px;
      outline: none;
      -moz-user-select: none;
      -webkit-user-select: none;
    }
    button:active {
      background-color: rgba(29, 30, 43, 0.993);
    }
    button:hover {
      background-color: #262a31;
      box-shadow: 0 0 6px rgba(239, 241, 239, 0.911);
    }
  }
  .edit-blur {
    content: "";
    position: absolute;
    width: 100%;
    max-height: 50px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -999;
    // -webkit-filter: blur(20px);
    // filter: blur(20px);
    background: rgba(51, 56, 78, 0.993);
  }
  .edit-box {
    border-right: 1px solid #666;
    width: 100%;
    height: 94%;
    // background-color: chartreuse;
    box-sizing: border-box;
    position: relative;
    .code-mode-select {
      position: absolute;
      z-index: 2;
      right: 10px;
      top: 10px;
      max-width: 110px;
      .el-input {
        .el-input__inner {
          background: #23262c;
          color: rgb(182, 178, 178);
        }
      }
    }
    // 更改主题背景颜色
    .cm-s-seti.CodeMirror {
      background: #282c34 !important;
    }
    .cm-s-seti .CodeMirror-linenumber {
      background-color: #21242b;
    }
    .cm-s-seti .CodeMirror-gutters {
      background-color: #21242b;
    }
    .CodeMirror {
      background: #282c34;
      color: #bbc3d1;
      resize: none;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      font-size: 20px;
      white-space: pre-wrap;
      word-break: keep-all;

      // 侧边滚轮
      .CodeMirror-vscrollbar::-webkit-scrollbar    //滚动条整体部分
      {
        width: 5px;
        height: 10px;
        background-color: #b5b1b1;
      }
      .CodeMirror-vscrollbar::-webkit-scrollbar-track       //scroll轨道背景
      {
        -webkit-box-shadow: inset 0 0 6px rgba(32, 16, 53, 0.664);
        box-shadow: inset 0 0 6px rgba(32, 16, 53, 0.664);
        border-radius: 10px;
        background-color: #21242b;
      }

      .CodeMirror-vscrollbar::-webkit-scrollbar-thumb   //滚动条中能上下移动的小块
      {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(12, 147, 226, 0.596);
        box-shadow: inset 0 0 6px rgba(12, 147, 226, 0.596);
        background-color: #b5b1b1a6;
      }
      // 底部滚轮
      .CodeMirror-hscrollbar::-webkit-scrollbar    //滚动条整体部分
      {
        height: 8px;
        background-color: #b5b1b1;
      }
      .CodeMirror-hscrollbar::-webkit-scrollbar-track       //scroll轨道背景
      {
        -webkit-box-shadow: inset 0 0 6px rgba(32, 16, 53, 0.664);
        box-shadow: inset 0 0 6px rgba(32, 16, 53, 0.664);
        border-radius: 10px;
        background-color: #21242b;
      }

      .CodeMirror-hscrollbar::-webkit-scrollbar-thumb   //滚动条中能上下移动的小块
      {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(12, 147, 226, 0.596);
        box-shadow: inset 0 0 6px rgba(12, 147, 226, 0.596);
        background-color: #b5b1b1a6;
      }
      .CodeMirror-scrollbar-filler {
        visibility: hidden;
      }
    }
  }
}
</style>