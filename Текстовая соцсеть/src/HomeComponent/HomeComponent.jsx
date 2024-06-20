import React from 'react';
import './HomeComponent.css';

function HomeComponent({ posts, deletePost, toggleLike, addComment }) {
  const formatDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);

    if (isNaN(postDate.getTime())) {
      return 'Неверная дата';
    }

    const diffInMilliseconds = now - postDate;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 1) {
      return 'только что';
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds} ${getSecondsText(diffInSeconds)} назад`;
    } else if (diffInDays >= 1) {
      return `${postDate.getDate()} ${getMonthName(postDate.getMonth())}`;
    } else if (diffInHours >= 1) {
      return `${diffInHours} ${getHoursText(diffInHours)} назад`;
    } else {
      return `${diffInMinutes} ${getMinutesText(diffInMinutes)} назад`;
    }
  };

  const getMonthName = (monthIndex) => {
    const months = [
      'января', 'февраля', 'марта', 'апреля',
      'мая', 'июня', 'июля', 'августа',
      'сентября', 'октября', 'ноября', 'декабря'
    ];
    return months[monthIndex];
  };

  const getHoursText = (hours) => {
    if (hours === 1) {
      return 'час';
    } else if (hours >= 2 && hours <= 4) {
      return 'часа';
    } else {
      return 'часов';
    }
  };

  const getMinutesText = (minutes) => {
    if (minutes === 1) {
      return 'минуту';
    } else if (minutes >= 2 && minutes <= 4) {
      return 'минуты';
    } else {
      return 'минут';
    }
  };

  const getSecondsText = (seconds) => {
    if (seconds === 1) {
      return 'секунду';
    } else if (seconds >= 2 && seconds <= 4) {
      return 'секунды';
    } else {
      return 'секунд';
    }
  };

  return (
    <div className="home-container">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="post-item">
            <p>{post.message}</p>
            {post.images && post.images.length > 0 && (
              <div className="post-images">
                {post.images.map((image, idx) => (
                  <img key={idx} src={image} alt={`Attached ${idx}`} className="post-image" />
                ))}
              </div>
            )}
            <span className="post-date">{formatDate(post.date)}</span>
            <button onClick={() => deletePost(index)} className="delete-button">Удалить</button>
            <button onClick={() => toggleLike(index)} className={`like-button ${post.liked ? 'liked' : ''}`}>
              {post.liked ? '❤️' : '🤍'} {post.likes}
            </button>
            <div className="comments-section">
              <h4>Комментарии</h4>
              {post.comments.map((comment, idx) => (
                <p key={idx}>{comment}</p>
              ))}
              <input 
                type="text"
                placeholder="Добавить комментарий..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim() !== '') {
                    addComment(index, e.target.value.trim());
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p>Нет сообщений</p>
      )}
    </div>
  );
}

export default HomeComponent;
