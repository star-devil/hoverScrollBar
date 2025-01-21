<!--
 * @Author: wangqiaoling
 * @LastEditors: wangqiaoling
 * @Description: 
-->
# HoverScrollbar

## description

重置谷歌浏览器滚动条样式，鼠标移入时才显示滚动条。滚动条颜色可自定义。

## demo

![鼠标悬浮出现滚动条](https://github.com/star-devil/hoverScrollBar/blob/main/src/20250121111739.gif?raw=true)

## Links

[👉 npm包：![npm version](https://img.shields.io/npm/v/hover-scrollbar.svg)](https://www.npmjs.com/package/hover-scrollbar)

[✌️ 下载量：![npm downloads](https://img.shields.io/npm/dm/hover-scrollbar.svg)](https://www.npmjs.com/package/hover-scrollbar)

[👉 hoverScrollBar：github项目地址](https://github.com/star-devil/hoverScrollBar.git)

## Installation

- npm/yarn/pnpm安装

```shell
npm install --save hover-scrollbar
yarn add hover-scrollbar
pnpm add hover-scrollbar
```

## Use

- 引用插件

```js
  import createHoverScrollbar from  "hover-scrollbar";
```

- 全局使用

```ts
 // 以 vue 举例：在main.ts中导入
  import createHoverScrollbar from 'hover-scrollbar';
  createHoverScrollbar({
    global: true,
    style: {
      thumbBgColor: 'colorstring'
      thumbHoverBgColor: 'colorstring'
    }
  });
```

**注意：** 如果`global: true`则表示页面全部的滚动条都会被重置样式，且有溢出的地方都会**一直显示滚动条**，**没有**悬浮到dom上才会出现滚动条的效果

- 局部使用

```vue
  // 在需要设置滚动条的组件内导入，还是以 vue 为例
  <template>
    <div class="content">
      content
      <div class="inner-wrap">textInner</div>
      text
    </div>
  </template>

  <script lang="ts" setup>
    import createHoverScrollbar from 'hover-scrollbar';
    import { nextTick, onUnmounted, ref } from 'vue';

    const scroll = ref();
    nextTick(() => {
      scroll.value = createHoverScrollbar({
        selector: '.content', // 需要滚动条的 dom节点选择器，类选择器名称最好不好重复！
        style: {
          thumbHoverBgColor: 'red' // 颜色有默认值，请看下面 options说明
        }
      });
    });

    onUnmounted(() => {
      scroll.value.destroy(); // 销毁
    });
  </script>
```

**注意：**

  1. 不传`global`或者`global: false`时必须要传入节点选择器：`selector`，表示仅在这个节点下滚动条才会被重置样式。

  2. 且默认不显示滚动条，只有悬浮到这个节点上才会出现。

  3. 为了显示滚动条时，不挤压内部内部元素导致布局变形，为选中节点默认添加了左右`padding`各`10px`。如果原节点就有`padding`值可能会造成样式冲突，这个会在后续版本中想办法解决。

## Options

| 属性名 | 类型 | 说明 | 必传 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| global | boolean | 是否全局修改样式 | 否 | false |
| selector | string | 节点选择器 | 否 | global和selector二选一必传 |
| style | {thumbBgColor?: string;thumbHoverBgColor?: string;} | 滚动条颜色和滚动条悬浮颜色 | 否 | thumbBgColor: darkgray；thumbHoverBgColor: 'rgb(128 128 128)' |

## Methods

| 方法名 | 类型 | 说明 |
| ------ | ------ | ------ |
| destroy | function | 销毁重置样式 |
