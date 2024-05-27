import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoGallery = () => {
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get('/api/videos');
        const folderSet = new Set();
        response.data.forEach((file) => {
          const folderPath = file.path.split('/').slice(0, -1).join('/');
          folderSet.add(folderPath);
        });
        setFolders(Array.from(folderSet));
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };
    fetchFolders();
  }, []);

  const handleFolderClick = async (folderPath) => {
    setCurrentFolder(folderPath);
    try {
      const response = await axios.get('/api/videos', {
        params: { prefix: folderPath },
      });
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div>
      <h1>Video Gallery</h1>
      <div>
        <h2>Folders</h2>
        {folders.map((folder) => (
          <div key={folder} onClick={() => handleFolderClick(folder)}>
            {folder}
          </div>
        ))}
      </div>
      <div>
        <h2>Videos</h2>
        {videos.map((video) => (
          <div key={video.path} onClick={() => handleVideoClick(video)}>
            {video.name}
          </div>
        ))}
      </div>
      {selectedVideo && (
        <div>
          <h2>Selected Video</h2>
          <video src={selectedVideo.path} controls />
        </div>
      )}
    </div>
  );
};

export default VideoGallery;