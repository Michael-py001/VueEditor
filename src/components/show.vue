/**
 * Copyright © 2021 Michael. All rights reserved.
 * 
 * @author: Michael
 * @date: 2021-02-26 
 */
<template>
  <div class="show" ref="show1">
    <div class="head">
      <button @click="claerCodeBox" class="claerShow">清空结果</button>
      <button @click="back" class="claerShow" v-if="isMobile">返回</button>
      <template v-else>
        <button
          @click="changeWidth"
          class="claerShow"
          v-if="isFull"
          ref="full1"
        >
          退出全屏
        </button>
        <button @click="changeWidth" class="claerShow" v-else ref="full2">
          全屏显示
        </button>
      </template>
    </div>
    <div class="edit-blur"></div>

    <div class="result" ref="showBox">
      <div ref="showBox2" v-if="isShow" class="isShow">
        <iframe
          src=""
          frameborder="0"
          ref="iframeBox"
          class="iframeBox"
        ></iframe>
      </div>
      <!-- <pre v-highlightjs="codeText" class="preCode showAnimate" ref="preCode">
          <code class="html codeArea  topnav_box" spellcheck="false" ></code>
        </pre> -->
      <!-- <div ref="codeBox">{{ codeText }}</div> -->
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
// import sass from "../../public/static/sass";
// 样式文件
import("highlight.js/styles/atom-one-dark.css");
import { compileCSS } from "../utils/compiler";
export default {
  data() {
    return {
      code: '<div class="edit-blur"></div>',
      isShow: true,
      lang: "",
      isFull: false,
    };
  },
  props: {
    //   codeText是父组件上给子组件设置的动态属性名称
    // <Show :codeText="editCode" ref="show"></Show>
    codeText: {
      type: String,
      default: "",
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    myCode: function () {
      return this.codeText;
    },
  },
  // 自定义插件
  directives: {
    // 自定义指令 v-highlight
    highlightjs: {
      // 英文博客的内容：https://www.metachris.com/2017/02/vuejs-syntax-highlighting-with-highlightjs/
      // 只调用一次，指令第一次绑定到元素时调用
      bind: function (el, binding) {
        // on first bind, highlight all targets
        let targets = el.querySelectorAll("code");
        targets.forEach((target) => {
          console.log(target);
          // if a value is directly assigned to the directive, use this
          // instead of the element content.
          if (typeof binding.value === "string") {
            //改成 typeof binding.value === "string"
            target.textContent = binding.value;
          }
          hljs.highlightBlock(target);
        });
      },
      // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
      componentUpdated: function (el, binding) {
        // console.log(binding);
        // after an update, re-fill the content and then highlight
        let targets = el.querySelectorAll("code");
        targets.forEach((target) => {
          // console.log(target);
          if (typeof binding.value === "string") {
            // console.log(Boolean(binding.value));
            // if (binding.value) {//因为Boolean("空字符串")的结果的false，所以会导致下面的if在删除到最后一个字符时，结果不成立，内容不会更新，所以要改成if (typeof binding.value === "string")
            target.textContent = binding.value;
          }
          hljs.highlightBlock(target);
        });
      },

      // vue-hightlight插件的源码：https://github.com/metachris/vue-highlightjs/blob/master/index.js
      // deep: true,
      // bind: function bind(el, binding) {
      //   // on first bind, highlight all targets
      //   var targets = el.querySelectorAll("code");
      //   var target;
      //   var i;

      //   for (i = 0; i < targets.length; i += 1) {
      //     target = targets[i];
      //     console.log(target);

      //     if (typeof binding.value === "string") {
      //       // if a value is directly assigned to the directive, use this
      //       // instead of the element content.
      //       target.textContent = binding.value;
      //     }

      //     hljs.highlightBlock(target);
      //   }
      // },
      // componentUpdated: function componentUpdated(el, binding) {
      //   // after an update, re-fill the content and then highlight
      //   var targets = el.querySelectorAll("code");
      //   var target;
      //   var i;

      //   for (i = 0; i < targets.length; i += 1) {
      //     target = targets[i];
      //     console.log(target);
      //     if (typeof binding.value === "string") {
      //       target.textContent = binding.value;
      //     }
      //     hljs.highlightBlock(target);
      //   }
      // },
      // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
      // componentUpdated: function (el) {
      //   let blocks = el.querySelectorAll("pre code");
      //   for (let i = 0; i < blocks.length; i++) {
      //     hljs.highlightBlock(blocks[i]);
      //   }
      // },
    },
  },
  components: {},

  methods: {
    // 返回编辑
    back() {
      this.$emit("back");
    },
    // 全屏开关
    changeWidth(e) {
      console.log(e);
      let de = document.documentElement;
      if (this.isFull) {
        this.$emit("changeWidth", "50%", "50%");
        // de.webkitCancelFullScreen();
        // console.log(this.$refs.show);
        this.isFull = false;
        if (document.exitFullscreen) {
          //退出全屏  需要document来执行，不能是Element标签
          document.exitFullscreen();
          console.log(1);
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
          console.log(2);
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
          console.log(3);
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
          console.log(4);
        }
        return;
      } else {
        this.$emit("changeWidth", "0%", "100%");
        var el = document.documentElement; //全屏显示 需要指定任意一个Element标签，这里的document.documentElement 表示整个文档流全屏，当然也可以指定一个div全屏
        var rfs =
          el.requestFullScreen ||
          el.webkitRequestFullScreen ||
          el.mozRequestFullScreen ||
          el.msRequestFullscreen;
        if (typeof rfs != "undefined" && rfs) {
          rfs.call(el);
        }

        this.isFull = true;
        return;
      }
    },
    //   拿到template,script,style标签里的内容
    getSource(type) {
      const reg = new RegExp(`<${type}[^>]*>((.|\\n)*)</${type}>`);
      let code = this.codeText;
      let matches = code.match(reg);
      // console.log(matches);
      if (matches) {
        let firstMatchCode = matches[0];
        //   let tag = matches[0], //第一个索引是捕获到的字符串
        //     tagIndex = matches.index; //match捕获到的是一个对象，获取对象中的index，匹配字符首次出现的索引值
        //   // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
        //   let finalCode = code.slice(
        //     // tagIndex(首次出现的索引) + tag的字符串长度
        //     tagIndex + tag.length,
        //     code.lastIndexOf(`</${type}>`)
        //   );

        //提取出js代码中的export default里面的部分
        if (type === "script") {
          // 当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）普通简写：var re = /\w+/;则不用
          //   let scriptReg = new RegExp(`export default\\s*{`); //与下面等价
          let scriptReg = /export default\s*{((.|\n)*)};?/; // \s* 代表匹配空白字符0或多个
          let scriptCode = firstMatchCode.match(scriptReg);
          let matchCode = scriptCode[1];
          // console.log(matchCode);
          //   把里面的代码拼接成一个对象形式，加return是为了添加到Function里运行
          return `return {${matchCode}}`;
        } else if (type === "template") {
          // 提取tamplate里面的内容，为了解决报错：不能使用<template>作为根标签
          return matches[1];
        } else if (type === "style") {
          return matches[1];
        }
        // console.log(firstMatchCode);
        return firstMatchCode;
      }
      return "";
    },
    async renderCode() {
      console.log("渲染");
      console.log("contentWindow", this.$refs.iframeBox.contentWindow);
      console.log(
        "contentDocument",
        this.$refs.iframeBox.contentWindow.document.body
      );
      this.$refs.iframeBox.contentWindow.document.body.innerHTML = null;
      console.log("instance", this.$refs.iframeBox.contentWindow.instance);
      //   获取组件的template标签
      const template = this.getSource("template");
      const script = this.getSource("script");
      const style = this.getSource("style");
      let html_js;
      let cssStyle;
      let component = {}; //模拟一个组件的大对象，最终这个对象里会像是输出组件里的内容
      if (script) {
        //   把代码放入Function里运行，得到一个个对象
        component = new Function(script)();
        // console.log(this);
      }
      if (template) {
        component.template = template;
        // 需要把template挂载到DOM上，通过$mount方法手动挂载
        // 使用vm.$mount 首先需要获取到实例vm
        // main.js中render: h => h(App) 中的App只是一个对象，需要new Vue()，才能产生一个实例
        // 使用基础 Vue 构造器，创建一个“子类”：Vue.extend(component)构造一个vue的子类（继承于Vue），new Vue.extend(component)创建一个子类的实例
        //this.$option._base可以获取到Vue这个类
        console.log(this.$options);
        let myVueComponent = new (this.$options._base.extend(component))(); //创建子类的实例，后面需要包起来成为一个整体，不然会直接new this
        // vm.$mount()返回值：vm - 实例自身，所以可以继续链式调用其他实例方法
        console.log("myVueComponent:", myVueComponent);
        console.log(myVueComponent.$mount()); //
        console.log(myVueComponent.$mount().$el);
        html_js = myVueComponent.$mount().$el;
        console.log("html_js:", html_js);
        //myVueComponent.$mount()不加参数：挂载到内存中，加了就挂载到对应的标签中

        // myVueComponent.$mount().$el 把挂载的结果挂载到$el上，$el就是nodeElement对象标签
        // 需要配置vue.config.js 设置CLI的runtimeCompiler: true，允许运行时编译

        this.isShow = true;
      }
      if (style) {
        let langReg = new RegExp(
          `<style lang=["|'](\\w*)["|']>(.|\\n)*</style>`
        );
        // let newStyle = style;
        // let newStyle = style.replace(/[\r\n]/g, "");
        let newStyle = style.replace(/[\r]/g, "");
        let code = this.codeText;
        let lang = code.match(langReg)[1] || "";
        console.log("lang:", lang);
        // console.log("langRegx:", code.match(langReg));
        let cssStr;
        if (
          lang === "Sass" ||
          lang === "sass" ||
          lang === "Scss" ||
          lang === "scss"
        ) {
          cssStr = await compileCSS(newStyle, "Scss").then((res) => res);
        } else if (lang === "Less" || lang === "less") {
          cssStr = await compileCSS(newStyle, "Less").then((res) => res);
        } else if (lang === "stylus" || lang === "Stylus") {
          cssStr = await compileCSS(newStyle, "stylus").then((res) => res);
        }

        console.log("cssStr:", cssStr);

        let element = document.createElement("style");
        element.type = "text/css";
        element.innerText = cssStr;
        cssStyle = element;
      }
      console.log("cssStyle", cssStyle);
      this.$refs.iframeBox.contentWindow.document.body.appendChild(cssStyle);
      this.$refs.iframeBox.contentWindow.document.body.appendChild(html_js);
      // console.log("cssStyle:", cssStyle);
    },
    claerCodeBox() {
      // this.isShow = false;
      this.$refs.iframeBox.contentWindow.document.body.innerHTML = "";
    },
    changeSection() {},
  },
};
</script>
<style lang="less" scoped>
.showAnimate {
  // transition: all 0.8s;
  animation: showCodeAnimate 1.3s;
}
@keyframes showCodeAnimate {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.show {
  width: 50%;
  display: flex;
  flex-flow: column;
  .head {
    box-sizing: border-box;
    width: 100%;
    height: 6%;
    min-height: 34px;
    padding: 5px;
    // border-bottom: 1px solid #666;
    font-weight: 600;
    // line-height: 30px;
    // background: #282c34;
    z-index: 99;
    color: #d5deee;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: rgba(31, 33, 46, 0.993);
    backdrop-filter: saturate(180%) blur(10px);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.8);
    position: relative;

    button {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 28px;
      width: 80px;
      height: 28px;
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
    position: absolute;
    width: 100%;
    max-height: 50px;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -999;
    // -webkit-filter: blur(20px);
    // filter: blur(20px);
    background: rgba(51, 56, 78, 0.993);
  }

  .result {
    width: 100%;
    height: 94%;
    border: none;
    outline: none;
    font-size: 20px;
    word-break: break-all;
    position: relative;
    z-index: 0;
    .isShow {
      position: absolute;
      z-index: 99;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      font-size: 20px;
      word-break: break-all;
      position: relative;
      background-color: #282c34;
      .iframeBox {
        width: 100%;
        height: 100%;
      }
    }
    .preCode {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
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
      .codeArea {
        position: absolute;
        top: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        white-space: pre-wrap; //重点，white-space用来控制换行，pre-wrap：空白字符不会被合并和忽略
        word-break: keep-all; //保持单词不被断开换行，break-all就会强制换行
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .show {
    .head {
      button {
        // width: 30px;
        font-size: 16px;
        // padding: 0 2px;
        // background-color: cadetblue;
      }
    }
  }
}
</style>