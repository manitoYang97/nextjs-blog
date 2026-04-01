---
title: "Tailwind CSS 实用技巧"
date: "2024-04-03"
category: "技术"
tags: ["Tailwind CSS", "CSS", "前端"]
excerpt: "分享一些 Tailwind CSS 的实用技巧和最佳实践"
---

# Tailwind CSS 实用技巧

Tailwind CSS 是一个实用优先的 CSS 框架，它提供了大量的工具类来快速构建用户界面。

## 1. 响应式设计

Tailwind 使用移动优先的断点系统：

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  响应式宽度
</div>
```

## 2. 自定义配置

你可以在 `tailwind.config.js` 中自定义主题：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
      },
    },
  },
}
```

## 3. 常用工具类

- `flex` / `grid` - 布局
- `p-4` / `m-4` - 间距
- `text-center` - 文本对齐
- `rounded-lg` - 圆角
- `shadow-md` - 阴影

## 4. 使用 @apply

对于重复的样式，可以使用 `@apply`：

```css
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
}
```

## 总结

Tailwind CSS 大大提高了 CSS 开发效率，是现代前端开发的首选工具之一。
