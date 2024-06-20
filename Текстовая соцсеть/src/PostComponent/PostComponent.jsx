import React, { useState } from 'react';
import './PostComponent.css';

 export default function PostComponent({ addPost}) {
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleImageChange = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const imagePromises = files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises)
        .then(images => setImages(images))
        .catch(error => console.error("Error reading files:", error));
    }
  };

  const handleMessageSubmit = () => {
    if (message.trim() !== '') {
      const post = {

        message,
        date: new Date().toISOString(),
        images,
      };
      addPost(post); 
      setMessage('');
      setImages([]);
    }
  };

  return (
    <div className="post-container">
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Введите ваше сообщение..."Ы
        className="message-input"
      />
      <input 
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="image-input"
        multiple
      />
      <div className="image-preview-container">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Preview ${index}`} className="image-preview" />
        ))}
      </div>
      <button onClick={handleMessageSubmit} className="send-button">Отправить</button>
    </div>
  );
}