# Next.js 博客

基于 Next.js + TypeScript + Tailwind CSS 构建的静态博客，部署在 GitHub Pages 上。

## 功能特性

- 使用 Markdown 编写文章
- 文章分类和标签筛选
- 响应式设计
- 自动生成静态页面
- GitHub Actions 自动部署

## 技术栈

- [Next.js](https://nextjs.org/) - React 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Markdown 元数据解析
- [remark](https://github.com/remarkjs/remark) - Markdown 处理

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

## 添加文章

在 `posts` 目录下创建 `.md` 文件，格式如下：

```markdown
---
title: "文章标题"
date: "2024-04-01"
category: "分类"
tags: ["标签1", "标签2"]
excerpt: "文章摘要"
---

文章内容支持 Markdown 格式...
```

## 部署

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

## 许可证

MIT
