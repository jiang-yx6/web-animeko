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
  const [torrentList, setTorrentList] = useState([]);
  const [selectedTorrent, setSelectedTorrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [error, setError] = useState(null);

  // 获取种子列表
  useEffect(() => {
    const fetchTorrentList = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/torrent_list`);
        const data = await response.json();
        setTorrentList(data);
      } catch (err) {
        console.error('获取种子列表失败:', err);
        setError('获取种子列表失败，请刷新页面重试');
      }
    };

    fetchTorrentList();
    const intervalId = setInterval(fetchTorrentList, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // 获取种子状态
  useEffect(() => {
    let intervalId;

    const updateStatus = async () => {
      if (!selectedTorrent || !isPlaying) return;

      try {
        const response = await fetch(`${API_BASE_URL}/status/${selectedTorrent.id}`);
        if (!response.ok) {
          throw new Error('获取状态失败');
        }
        const data = await response.json();
        setStatus(data);
        
        // 当进度大于1%时，认为视频可以开始播放
        if (data.progress > 1 && !videoReady) {
          setVideoReady(true);
        }
      } catch (err) {
        console.error('获取状态失败:', err);
        setError('获取下载状态失败');
        setIsPlaying(false);
      }
    };

    if (isPlaying) {
      updateStatus();
      intervalId = setInterval(updateStatus, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [selectedTorrent, isPlaying, videoReady]);

  // 开始播放
  const handlePlay = async () => {
    if (!selectedTorrent) return;

    try {
      setError(null);
      setVideoReady(false);
      
      // 开始下载种子
      const response = await fetch(`${API_BASE_URL}/torrents/${selectedTorrent.id}/start`);
      if (!response.ok) {
        throw new Error('开始下载失败');
      }
      
      setIsPlaying(true);
    } catch (err) {
      console.error('开始下载失败:', err);
      setError('开始下载失败，请重试');
      setIsPlaying(false);
    }
  };

  // 删除种子
  const handleDelete = async () => {
    if (!selectedTorrent) return;

    try {
      const response = await fetch(`${API_BASE_URL}/torrents/${selectedTorrent.id}/delete`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('删除失败');
      }

      setIsPlaying(false);
      setVideoReady(false);
      setSelectedTorrent(null);
      setError(null);
      
      // 刷新列表
      const listResponse = await fetch(`${API_BASE_URL}/torrent_list`);
      const data = await response.json();
      setTorrentList(data);
    } catch (err) {
      console.error('删除种子失败:', err);
      setError('删除失败，请重试');
    }
  };

  // 处理视频错误
  const handleVideoError = (e) => {
    console.error('视频加载失败:', e);
    if (!videoReady) {
      setError('视频正在准备中，请等待...');
    } else {
      setError('视频加载失败，请重试');
      setIsPlaying(false);
    }
  };

  return (
    <div className="App">
      <div className="video-container">
        <h1>WebTorrent 流媒体播放器</h1>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* 种子列表和控制按钮 */}
        <div className="torrent-list">
          <select
            value={selectedTorrent?.id || ''}
            onChange={(e) => {
              const selected = torrentList.find(t => t.id === Number(e.target.value));
              setSelectedTorrent(selected);
              setIsPlaying(false);
              setVideoReady(false);
              setError(null);
            }}
          >
            <option value="">选择视频</option>
            {torrentList.map((torrent) => (
              <option key={torrent.id} value={torrent.id}>
                {torrent.title || torrent.name || `视频 ${torrent.id}`}
              </option>
            ))}
          </select>
          <button 
            onClick={handlePlay} 
            disabled={!selectedTorrent || isPlaying}
          >
            {isPlaying ? '播放中' : '播放'}
          </button>
          {selectedTorrent && (
            <button onClick={handleDelete}>删除</button>
          )}
        </div>

        {/* 视频播放器 */}
        {isPlaying && selectedTorrent && (
          <>
            {!videoReady ? (
              <div className="loading-message">
                正在准备视频，已完成 {status.progress}%...
              </div>
            ) : (
              <video
                key={selectedTorrent.id}
                controls
                src={`${API_BASE_URL}/stream/${selectedTorrent.id}`}
                style={{ width: '100%', maxWidth: '800px' }}
                onError={handleVideoError}
              />
            )}
            <div className="progress">
              下载进度: {status.progress}% |
              速度: {status.downloadSpeed} MB/s |
              连接节点: {status.peers} |
              剩余时间: {Math.floor(status.timeRemaining / 60)}分
              {status.timeRemaining % 60}秒
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;