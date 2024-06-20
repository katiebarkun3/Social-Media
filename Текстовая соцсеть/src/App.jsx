import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useResolvedPath } from "react-router-dom";
import PostComponent from './PostComponent/PostComponent';
import HomeComponent from './HomeComponent/HomeComponent';
import ProfileComponent from './ProfileComponent/ProfileComponent';
import Userfront, {
  SignupForm,
  LoginForm,
  PasswordResetForm,
  LogoutButton
} from "@userfront/toolkit/react";
import './App.css'

Userfront.init("zn5mwmgn");


export default function App() {

  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    const updatedPosts = [{
      ...newPost,
      likes: 0,
      liked: false,
      comments: []
    }, ...posts];
    setPosts(updatedPosts);

  };

  const deletePost = (index) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
  };

  const addComment = (postIndex, comment) => {
    const newPosts = [...posts];
    newPosts[postIndex].comments.push(comment);
    setPosts(newPosts);
  };

  const toggleLike = (postIndex) => {
    const newPosts = [...posts];
    newPosts[postIndex].liked = !newPosts[postIndex].liked;
    newPosts[postIndex].likes += newPosts[postIndex].liked ? 1 : -1;
    setPosts(newPosts);
  };

  return (
    <Router>
      <div className="menu">
        <Link to="/">Главная</Link>
        <Link to="/post">Написать пост</Link>
        <Link to="/profile">Профиль</Link>
        <Link to="/registration/home">Регистрация</Link>
      </div>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <HomeComponent posts={posts} deletePost={deletePost} addComment={addComment} toggleLike={toggleLike} />
          </RequireAuth>
        } />
       <Route path="/post" element={
  <RequireAuth>
    <PostComponent addPost={addPost}/>
  </RequireAuth>
} />

        <Route path="/profile" element={<RequireAuth><ProfileComponent /></RequireAuth>} />
        <Route path="/registration/*" element={<Registration />} />
      </Routes>
    </Router>
  );
}




function Registration() {
  const match = useResolvedPath("").pathname;
  return (
    <div className='fullReg'>
      <div className='reg'>
        <Link to={`${match}/home`}>Регистрация</Link>
        <Link to={`${match}/login`}>Вход</Link>
        <Link to={`${match}/resetPassword`}>Сброс пароля</Link>
        <Link to={`${match}/logout`}>Выход</Link>
      </div>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="resetPassword" element={<PasswordReset />} />
        <Route path="logout" element={<LogoutButton />} />

      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <SignupForm />
    </div>
  );
}

function Login() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

function PasswordReset() {
  return (
    <div>
      <PasswordResetForm />
    </div>
  );
}

function RequireAuth({ children }) {
  let location = useLocation();

  if (!Userfront.tokens.accessToken) {
    return <Navigate to="/registration/login" state={{ from: location }} replace />;
  }

  return children;
}
