import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Admin.css';

export default function Admin() {
  const [courses, setCourses] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [popup, setPopup] = useState(false);
  const [id1, setId1] = useState('');
  const [title1, setTitle1] = useState('');
  const [description1, setDescription1] = useState('');
  const [duration1, setDuration1] = useState('');
  const [price1, setPrice1] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/Course-db')
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === '' || title === '' || description === '' || duration === '' || price === '') {
      alert("Enter valid Data");
    } else {
      axios.post('http://localhost:3001/Course-db', { id, title, description, duration, price })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/Course-db/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  const openPopup = (data) => {
    setPopup(true);
    setId1(data.id);
    setTitle1(data.title);
    setDescription1(data.description);
    setDuration1(data.duration);
    setPrice1(data.price);
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3001/Course-db/${id1}`, {
      id: id1,
      title: title1,
      description: description1,
      duration: duration1,
      price: price1
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div className='admin-container'>
      <form className='admin-form' onSubmit={handleSubmit}>
        <label>Course ID:</label>
        <input type="number" value={id} onChange={(e) => setId(e.target.value)} /><br />
        <label>Course Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
        <label>Course Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
        <label>Course Duration:</label>
        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} /><br />
        <label>Course Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
        <button type='submit' className='submit'>Submit</button>
        <NavLink to="/" className='home-link'>Home</NavLink>
      </form>

      <table className='admin-table'>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Title</th>
            <th>Course Description</th>
            <th>Course Duration</th>
            <th>Course Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.duration}</td>
              <td>{course.price}</td>
              <td>
                <button className='update' onClick={() => openPopup(course)}>Update</button>
                <button className='delete' onClick={() => handleDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popup &&
        <div className='popup'>
          <form>
            <button onClick={() => setPopup(false)} className='close'>Close</button><br></br>
            <label>Course ID:</label>
            <input type="number" value={id1} onChange={(e) => setId1(e.target.value)} /><br />
            <label>Course Title:</label>
            <input type="text" value={title1} onChange={(e) => setTitle1(e.target.value)} /><br />
            <label>Course Description:</label>
            <input type="text" value={description1} onChange={(e) => setDescription1(e.target.value)} /><br />
            <label>Course Duration:</label>
            <input type="text" value={duration1} onChange={(e) => setDuration1(e.target.value)} /><br />
            <label>Course Price:</label>
            <input type="number" value={price1} onChange={(e) => setPrice1(e.target.value)} /><br />
            <button type='submit' onClick={handleUpdate} className='submit'>Submit</button>
          </form>
        </div>
      }
    </div>
  );
}
