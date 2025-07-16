// App.js
import React, { useEffect, useState } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:3001/api';

function App() {
  const [status, setStatus] = useState({
    progress: 0,
    peers: 0,
    downloadSpeed: 0,
    timeRemaining: 0
  });

  useEffect(() => {
    const updateStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/status`);
        const data = await response.json();
        setStatus(data);
      } catch (err) {
        console.error('获取状态失败:', err);
      }
    };

    const intervalId = setInterval(updateStatus, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <div className="video-container">
        <h1>WebTorrent 流媒体播放器</h1>
        <video
          controls
          src={`${API_BASE_URL}/stream`}
          style={{ width: '100%', maxWidth: '800px' }}
        />
        <div className="progress">
          下载进度: {status.progress}% |
          速度: {status.downloadSpeed} MB/s |
          连接节点: {status.peers} |
          剩余时间: {Math.floor(status.timeRemaining / 60)}分
          {status.timeRemaining % 60}秒
        </div>
      </div>
    </div>
  );
}

export default App;