import { defineConfig, renderStudio } from 'sanity';
import { deskTool } from 'sanity/desk';

// 定義 Schema
const siteSettings = {
  name: 'siteSettings',
  title: '網站內容管理',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '首頁大標題 (H1)',
      type: 'string',
    },
    {
      name: 'logo',
      title: '研究院 LOGO',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'subtitle',
      title: '首頁副標題',
      type: 'string',
    },
    {
      name: 'mainImage',
      title: '首頁背景圖片',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'whitePaperUrl',
      title: '優勢白皮書下載連結 (GitHub 連結)',
      type: 'url',
      description: '例如：https://github.com/用戶名/倉庫名/raw/main/白皮書.pdf'
    },
    {
      name: 'aboutText',
      title: '關於我們內容',
      type: 'text',
      rows: 5
    }
  ]
};

export default defineConfig({
  name: 'default',
  title: 'HK IMID 管理後台',
  projectId: '54hpcgpc',
  dataset: 'production',
  basePath: '/admin', // 設定後台網址為 /admin
  plugins: [deskTool()],
  schema: {
    types: [siteSettings],
  },
});
