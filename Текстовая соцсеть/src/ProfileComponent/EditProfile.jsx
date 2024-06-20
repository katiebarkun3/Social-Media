import React, { useState } from 'react';
import './ProfileComponent.css';
import Userfront from '@userfront/toolkit';

function EditProfile({ profileData, onSave }) {
  const [name, setName] = useState(profileData.name || '');
  const [unName, setUnName] = useState(profileData.unName || '');
  const [caption, setCaption] = useState(profileData.caption || '');
  const [image, setImage] = useState(profileData.image || null);
  const [email, setEmail] = useState(profileData.email ||  '');

  const [error, setError] = useState('');

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      await Userfront.user.update({
        name: name,
        username: unName,
        email: email,
        data: { caption: caption, image: image }, 
      });
      onSave({ unName, name, email, caption, image });
    } catch (error) {
      console.error('Failed to update profile:', error.response.data); 
      setError('Failed to update profile. Please try again.');
    }
  };
  

  return (
    <div className="profile-container">
      <input 
        type="text"
        value={unName}
        onChange={(e) => setUnName(e.target.value)}
        className="inputP unName-input"
        placeholder='Your unique name'
      />
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="inputP name-input"
        placeholder='Your name'
      />
      <input 
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="inputP caption-input"
        placeholder='About you'
      />
       <input 
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="inputP caption-input"
        placeholder='email'
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="inputP image-input"
      />
      {image && <img src={image} alt="Preview"/>}
      <button onClick={handleSave} className="send-button">Сохранить</button>
    </div>
  );
}

export default EditProfile;
