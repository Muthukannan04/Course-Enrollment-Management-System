import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from './Auth';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const auth = UseAuth();

  const handleEnrollNow = () => {
    if (auth.user) {
      navigate('/show');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Course Enrollment Portal</h1>
      <p>
        Explore our wide range of courses and enroll today to kickstart your learning journey!
      </p>
      <button onClick={handleEnrollNow}>Enroll Now</button>
    </div>
  );
};

export default Home;
