import React, { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import './ProfileComponent.css';
import Userfront from '@userfront/toolkit';

function ProfileComponent() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    unName: '',
    name: '',
    email: Userfront.user.email,
    caption: '',
    image: null
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('profileData'));
    if (savedData) {
      setProfileData(savedData);
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleProfileSave = (data) => {
    setProfileData(data);
    localStorage.setItem('profileData', JSON.stringify(data));
    setActiveTab('profile');
  };

  return (
    <div>
      {activeTab === 'profile' ? (
        <div >
          <h2>Profile</h2>
          <div className="info">
          {profileData.image && <img src={profileData.image} alt="Profile" className="profileImg"/>}
          <div className="inInfo">
          <h3>Username: {profileData.unName}</h3>
          <h3>Name: {profileData.name}</h3>
          <p className="caption">Caption: {profileData.caption}</p>
          <p>Email: {profileData.email}</p>
          </div>
          </div>
          <button onClick={() => handleTabChange('editProfile')}>Редактировать</button>
        </div>
      ) : (
        <EditProfile profileData={profileData} onSave={handleProfileSave} />
      )}
    </div>
  );
}

export default ProfileComponent;
