# 🎬 Web Animeko Frontend

基于 React 的在线视频流媒体播放器前端界面，支持视频流式播放，实时显示下载进度和状态信息。

![React Version](https://img.shields.io/badge/react-18.x-blue)
![Node Version](https://img.shields.io/badge/node-%3E%3D14-green)

## ✨ 特性

- 📺 流畅播放 - 支持视频流式播放
- 📊 实时状态 - 显示下载进度、速度和连接节点
- 🎯 简单易用 - 直观的用户界面
- 🎨 美观设计 - 现代化的 UI 设计
- 🔄 自动更新 - 定期刷新视频列表和状态

## 🎯 演示

暂无

## 🚀 快速开始

### 前置要求

- Node.js (>= 14.x)
- npm 或 yarn
- 后端服务 ![需要单独部署](https://github.com/jiang-yx6/torrent)

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/jiang-yx6/web-animeko.git
cd web-animeko
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm start
```

现在，打开 [http://localhost:3000](http://localhost:3000) 即可访问应用。

## 🛠 技术栈

- React 18
- HTML5 Video API
- CSS3 动画和过渡效果
- Fetch API

## 📖 功能说明

### 视频选择和控制
- 从下拉列表选择视频
- 播放/暂停控制
- 删除不需要的视频

### 状态显示
- 下载进度百分比
- 实时下载速度
- 连接节点数量
- 剩余下载时间

### 错误处理
- 友好的错误提示
- 加载状态反馈
- 自动重试机制

## 🔗 API 接口

前端需要配合后端 API 使用，主要接口包括：

```javascript
// 获取视频列表
GET /api/torrent_list

// 开始下载视频
GET /api/torrents/:id/start

// 获取视频状态
GET /api/status/:id

// 删除视频
DELETE /api/torrents/:id/delete

// 视频流
GET /api/stream/:id
```

## 💻 开发说明

### 目录结构
```
src/
  ├── App.js          # 主应用组件
  ├── App.css         # 样式文件
  └── index.js        # 入口文件
```

## 👨‍💻 作者

- **Ethan Jiang** - [GitHub](https://github.com/jiang-yx6)

## 🙏 致谢

- [React](https://reactjs.org/)
- [Create React App](https://create-react-app.dev/)
- [HTML5 Video](https://www.w3.org/TR/html5/media-elements.html)
