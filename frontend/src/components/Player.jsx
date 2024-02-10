import React, { useState } from 'react';
import ReactModal from 'react-modal';
import ReactPlayer from 'react-player';

const LocalVideoPlayerModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div style={{
      position:'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }} >
      <button onClick={openModal}>Open Video Player Modal</button>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Local Video Player Modal"
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            position: 'absolute',
            width: '80%', // Adjust width as needed
            maxWidth: '800px', // Maximum width
            maxHeight: '80%', // Adjust maximum height as needed
            height: 'auto', // Set height to auto to maintain aspect ratio
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }
        }}
      >
        <div className='video-player'>
          <h2>Local Video Player</h2>
          <ReactPlayer
            url="https://vod-progressive.akamaized.net/exp=1707557064~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4467%2F14%2F372335193%2F1547101002.mp4~hmac=7d239308e9484495259b0231fc7709cb964166fec975e94f7b184024bec93f19/vimeo-prod-skyfire-std-us/01/4467/14/372335193/1547101002.mp4"
            width="100%"
            height="100%"
            controls={true}
          />
        </div>
        <button onClick={closeModal}>Close</button>
      </ReactModal>
    </div>
  );
};

export default LocalVideoPlayerModal;
