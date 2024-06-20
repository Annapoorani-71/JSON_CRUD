import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [userList, setUserList] = useState([]);

  const handlePost = () => {
    axios
      .post('http://localhost:3001/posts', { name, email, imageUrl })
      .then((response) => {
        alert('Data saved successfully');
        setEmail('');
        setName('');
        setImageUrl('');
        fetchData();
      })
      .catch((error) => {
        console.error('POST request error:', error);
        alert('Something went wrong when saving data.');
      });
  };

  const fetchData = () => {
    axios
      .get('http://localhost:3001/posts')
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error('GET request error:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>React WebApp</h1>
      </div>
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button type="button" onClick={handlePost}>
          Post
        </button>
      </form>

      <div className="user-list">
        {Array.isArray(userList) ? (
          userList.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.imageUrl} alt={user.name} />
              <div>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
