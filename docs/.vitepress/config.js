import { defineConfig } from 'vitepress'
export default defineConfig({
  title: '笔记',
  description: '笔记',
  base: '/note/',
  themeConfig: {
    outline: 'deep',
    nav: [
      { text: 'web前端', link: '/web/' }
    ],
    sidebar: {
      '/web/': [
        {
          text: 'web前端',
          items: [
            { text: 'unocss基础', link: '/web/unocssStudy' }
          ]
        }
      ]
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdatedText: '上次更新时间',
    outlineTitle: '大纲'
  }
})