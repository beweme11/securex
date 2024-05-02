import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function isValidToken() {
  const token = localStorage.getItem('accessToken');
  return !!token; // Convert token to boolean
}

function Homepage() {
  const [showForm, setShowForm] = useState(false);
  const [showCourses, setshowCourses] = useState(false);
  const [formData, setFormData] = useState({
    lesson_number: '',
    lesson_title: '',
    lesson_description: '',
    user: 'test_user', // Assuming a default user value
  });
  const [courses, setCourses] = useState([]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/add-learning-info/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Course uploaded successfully
        console.log('Course uploaded successfully');
        // Clear form data
        setFormData({
          lesson_number: '',
          lesson_title: '',
          lesson_description: '',
          user: 'test_user', // Reset user value if needed
        });
        // Hide the form after submission
        setShowForm(false);
        // Refresh courses after upload
        fetchCourses();
      } else {
        // Course upload failed
        console.error('Course upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCourses = async () => {
    setshowCourses(true)
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/api/get-courses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
{isValidToken() && (
  <div className="container mx-auto mt-8">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to FCN Learning Platform</h1>
      <p className="text-lg text-gray-700 mb-8">Learn all about Fundamental Computer Networks (FCN) with our comprehensive courses and resources.</p>
      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded mr-4" onClick={fetchCourses}>Browse Cards</button>
        <Link to="/about" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded">About Us</Link>
        <button onClick={() => setShowForm(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded ml-4">Upload a Card</button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="lesson_number" className="block text-gray-700 font-bold mb-2">Lesson Number:</label>
            <input type="text" id="lesson_number" name="lesson_number" value={formData.lesson_number} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="lesson_title" className="block text-gray-700 font-bold mb-2">Lesson Title:</label>
            <input type="text" id="lesson_title" name="lesson_title" value={formData.lesson_title} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required />
          </div>
          <div className="mb-6">
            <label htmlFor="lesson_description" className="block text-gray-700 font-bold mb-2">Lesson Description:</label>
            <textarea id="lesson_description" name="lesson_description" value={formData.lesson_description} onChange={handleChange} className="w-full border rounded-md px-3 py-2" rows="5" required />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded">Submit</button>
        </form>
      )}
    </div>
  </div>
)}

{/* Display courses */}
{showCourses && courses.length > 0 && (
  <div className="container mx-auto mt-8">
    <h2 className="text-2xl font-bold mb-4">Cards Available:</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{course.lesson_title}</h3>
            <p className="text-gray-600">{course.lesson_description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

    </>
  );
}

export default Homepage;
