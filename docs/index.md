# unocss基础学习

## 语义化css与原子化css比较

### 语义化css

* `语义化css：具有一个见名知义的类名，里面包含具体的css属性和值`
```css
.tooltip {
  position: absolute;
  z-index: 1030;
  display: block;
  font-size: 12px;
  line-height: 16px;
  opacity: 0;
  visibility: visible;
}
```
```html
<div class="tooltip"></div>
```
### 原子化css
* `原子化css：一个类名通常代表一个css属性和值，比如:`
  * `absolute类名代表{ position: absolute }`
  * `z-1030类名代表{ z-index: 1030 }`
  * `block类名代表{ display: block }`
  * `text-3类名代表{ font-size: 0.75rem }`
  * `lh-4类名代表{ line-height: 1rem }`
  * `op-0类名代表{ opacity: 0 }`
  * `visible类名代表{ visibility: visible }`
```html
<div class="absolute z-1030 block text-3 lh-4 op-0 visible"></div>
```
### demo案例
![](/demo.png)

`为了实现图中的效果，使用原子化css的template模板`
#### 原子化css实现
::: details 查看模板代码
```html
<div class="bg-white rd-4 px-24 py-32 font-PingFangMedium">
    <div class="text-20 font-700 text-#333 lh-22">标题</div>
    <div class="px-90 py-24">
      <div
        :class="['flex', index > 0 ? 'mt-24' : '']"
        v-for="(item, index) in list" :key="index"
        >
          <img src="./assets/portrait.png" class="w-78 h-104">
          <div class="ml-40 text-18">
            <div class="font-600 text-#303133 lh-25">
              {{ item.name }}
              <span class="ml-16 text-#176eec text-18 font-500 lh-25">
                <span
                  :class="tagIndex === 0 ? '' : 'ml-10'" 
                  v-for="(tag, tagIndex) in item.tags" 
                  :key="tagIndex"
                >#{{ tag }}</span>
              </span>
            </div>
            <div class="mt-8 font-400 text-#606266 lh-25">{{ item.date }}</div>
            <div class="mt-16 font-400 text-#a8abb2 lh-25">
              <span 
                :class="[index > 0 ? 'ml-24' : '']"
                v-for="(i, index) in item.data"
                :key="index"
              >{{i.label}} {{ i.value }}</span>
            </div>
          </div>
      </div>
    </div>
  </div>
```
:::
`为了实现图中的效果，使用语义化css的template模板`
#### 语义化css实现
::: details 查看模板代码
```html
<div class="wrap">
    <div class="header">标题</div>
    <div class="body">
      <div
        class="content"
        v-for="(item, index) in list" :key="index"
      >
        <img src="./assets/portrait.png" class="portrait">
        <div class="text-content">
          <div class="title">
            {{ item.name }}
            <span class="tag">
              <span
                v-for="(tag, tagIndex) in item.tags" 
                :key="tagIndex"
              >#{{ tag }}</span>
            </span>
          </div>
          <div class="date">{{ item.date }}</div>
          <div class="data">
            <span 
              v-for="(i, index) in item.data"
              :key="index"
            >{{i.label}} {{ i.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
```
:::
::: details 查看样式代码
```scss
.wrap {
  background-color: white;
  border-radius: 4px;
  padding: 32px 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  .header {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    line-height: 22px;
  }
  .body {
    padding: 24px 90px;
    .content {
      display: flex;
      .portrait {
        width: 78px;
        height: 104px;
      }
      .text-content {
        margin-left: 40px;
        font-size: 18px;
        .title {
          font-weight: 600;
          color: #303133;
          line-height: 25px;
          .tag {
            margin-left: 16px;
            color: #176eec;
            font-size: 18px;
            font-weight: 500;
            line-height: 25px;
            span + span {
              margin-left: 10px;
            }
          }
        }
        .date {
          margin-top: 8px;
          font-weight: 400;
          color: #606266;
          line-height: 25px;
        }
        .data {
          margin-top: 16px;
          font-weight: 400;
          color: #a8abb2;
          line-height: 25px;
          span + span {
            margin-left: 24px;
          }
        }
      }
    }
    .content + .content {
      margin-top: 24px;
    }
  }
}
```
:::
## unocss实现原子化css
### unocss用法

* 使用vite脚手架初始化项目
![](/init.png)

* 引入unocss
  * vite.config.ts
  ```typescript
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   import unocss from 'unocss/vite' // [!code ++]
   import { presetUno } from 'unocss' // [!code ++]

   // https://vitejs.dev/config/
   export default defineConfig({
     plugins: [vue()], // [!code --]
     plugins: [vue(), unocss({ // [!code ++]
       presets: [presetUno()] // [!code ++]
      })] // [!code ++]
     })
  ```
  * main.ts
  ```typescript
   import { createApp } from 'vue'
   import 'uno.css' // [!code ++]
   import './style.css'
   import App from './App.vue'

   createApp(App).mount('#app')
  ```
  * HelloWorld.vue
  ```html
    <h1>{{ msg }}</h1> // [!code --]
    <h1 class="text-#ddd">{{ msg }}</h1> // [!code ++]
  ```

### unocss介绍

UnoCSS 是一个引擎，而非一款框架，因为它并未提供核心工具类，所有功能可以通过预设和内联配置提供。

比如之所以m-1类名代表{ margin: 0.25rem }，那是因为有类似这样一条规则：
```javascript
rules: [
  ['m-1', { margin: '0.25rem' }]
]
```
预设里面包含了大量规则，许多基础规则不需要使用者自己手动配置

#### 常用规则介绍


##### width
w-10 ==> width: 2.5rem
> w-后面可以跟任何数字，1个单位代表0.25rem，10个单位代表2.5rem

##### height
h-10 ==> height: 2.5rem

##### margin

m-10 ==> margin: 2.5rem

mt-10 ==> margin-top: 2.5rem

mr-10 ==> margin-right: 2.5rem

mb-10 ==> margin-bottom: 2.5rem

ml-10 ==> margin-left: 2.5rem

my-10 ==> margin-top: 2.5rem margin-bottom: 2.5rem

mx-10 ==> margin-left: 2.5rem margin-right: 2.5rem

##### padding
和margin类似，只不过它是以p开头

##### border

border-solid ==> border-style: solid

border-#ddd ==> border-color: #ddd

border-6 ==> border-width: 6px border-style: solid

border-rd-4 ==> border-radius: 1rem

##### background

bg-#ddd ==> background-color: #ddd

bg-no-repeat ==> background-repeat: no-repeat;

bg-[url(http://i-1-peise.qqxzb-img.com/2020/7/14/8755acfc-ee52-4115-8276-331a507f5ceb.gif)] ==> background-image: url(http://i-1-peise.qqxzb-img.com/2020/7/14/8755acfc-ee52-4115-8276-331a507f5ceb.gif)

##### font-size
text-4 ==> font-size: 1rem

##### line-height
lh-4 ==> line-height: 1rem

##### color
text-#ddd ==> color: #ddd

其它类名请访问[unocss官网](https://uno.antfu.me/)查询

#### 其它预设介绍

##### presetAttributify
```html
<div class="border-solid border-#ddd border-4">123</div>
```

写了三次border，导致class很长，如果能写的简洁点就好了，presetAttributify就是为了解决这个问题的

```html
<div border="solid #ddd 4">123</div>
```
前缀变成了html的一个属性,这样就简洁许多

```typescript
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import unocss from 'unocss/vite'
  import { presetUno } from 'unocss' // [!code --]
  import { presetUno, presetAttributify } from 'unocss' // [!code ++]

  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [vue(), unocss({
      presets: [presetUno()] // [!code --]
      presets: [presetUno(), presetAttributify()] // [!code ++]
    })]
  })
```
```html
  <h1 class="text-ddd">{{ msg }}</h1>
  <div border="12 #ddd">123</div> // [!code ++]
```

##### 其它预设
* 请浏览[unocss github仓库](https://github.com/unocss/unocss#Presets)

### unocss与我们项目的结合
unocss里面的规则都是px转换成rem，但是我们的项目里面都是使用的px，然后再使用postcss-px-to-viewport-8-plugin插件转换为vw单位。
所以我们需要一个预设，能够把rem转为为px，而[@unocss/preset-rem-to-px](https://github.com/unocss/unocss/tree/main/packages/preset-rem-to-px)正好满足我们的需求
```bash
pnpm install @unocss/preset-rem-to-px -D
```
```typescript
  import presetRemToPx from '@unocss/preset-rem-to-px' // [!code ++]

  plugins: [vue(), unocss({
    presets: [presetUno(), presetAttributify()] // [!code --]
    presets: [presetUno(), presetAttributify(), presetRemToPx({ // [!code ++]
      baseFontSize: 4  // [!code ++]
    })] // [!code ++]
  })]
```
> 为什么需要把baseFontSize写为4？
>
> 那是因为浏览器默认1rem=16px, 以p-4举例，应该转换为padding: 1rem, 如果不传入baseFontSize： 4
>
> 那么转换结果就是p-4 ==> 16px。这样不利于记忆，如果p-4 ==> 4px就好了
>
> 假如1rem 等于 4px， 就能实现上面的目标，那如何实现呢？
>
>在html文档里面，根节点html标签设置font-size: 4px，就能实现
>
> 类似的在presetRemToPx预设里面，baseFontSize传入4就可以了
## 其它
unocss库作者写的文章：[重新构想原子化 CSS](https://antfu.me/posts/reimagine-atomic-css-zh)