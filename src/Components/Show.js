import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Show.css'; // Import CSS file
import { UseAuth } from './Auth';

const Show = () => {
  const auth = UseAuth();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Course-db');
        setCourseList(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchData();
  }, []);

  const enrollCourse = async (courseId) => {
    try {
      console.log('Enrolling in course with ID:', courseId);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  return (
    <div className='course-container'>
      {courseList.map(course => (
        <div className='single-course' key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <table>
            <tbody>
              <tr>
                <td>Duration:</td>
                <td>{course.duration}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>${course.price}</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button onClick={() => enrollCourse(course.id)}>Enroll</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Show;
