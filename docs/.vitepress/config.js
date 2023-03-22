import { defineConfig } from 'vitepress'
export default defineConfig({
  title: '笔记',
  description: '笔记',
  base: '/note/',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhoululu/note' },
    ],
    outline: 'deep',
    nav: [
      { text: 'web前端', link: '/web/' },
      { text: '源码阅读',  items: [
        {
          text: 'element-plus',
          link: '/source-code/element-plus/'
        }
      ]},
      {
        text: '工具使用', items: [
          {
            text: 'git',
            link: '/tool-use/git/'
          }
        ]
      }
    ],
    sidebar: {
      '/web/': [
        {
          text: 'web前端',
          items: [
            { text: 'unocss基础', link: '/web/unocssStudy' },
            { text: 'box-shadow', link: '/web/box-shadow' }
          ]
        }
      ],
      '/source-code/element-plus/': [
        {
          text: 'element-plus',
          items: [
            { text: 'divider', link: '/source-code/element-plus/divider' }
          ]
        }
      ],
      '/tool-use/git/': [
        {
          text: 'git',
          items: [
            { text: '基本使用', link: '/tool-use/git/base' }
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