import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Trial() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [userList, setUserList] = useState([]);
  const [editUserId, setEditUserId] = useState(null); // Track the user being edited

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

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setImageUrl(user.imageUrl);
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3001/posts/${editUserId}`, { name, email, imageUrl })
      .then((response) => {
        alert('Data updated successfully');
        setEditUserId(null);
        setName('');
        setEmail('');
        setImageUrl('');
        fetchData();
      })
      .catch((error) => {
        console.error('PUT request error:', error);
        alert('Something went wrong when updating data.');
      });
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
    setName('');
    setEmail('');
    setImageUrl('');
  };

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:3001/posts/${userId}`)
      .then((response) => {
        alert('User deleted successfully');
        fetchData();
      })
      .catch((error) => {
        console.error('DELETE request error:', error);
        alert('Something went wrong when deleting user.');
      });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>React WebApp</h1>
      </div>
      <form style={{ marginBottom: '20px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <label htmlFor="imageUrl" style={{ display: 'block', marginBottom: '5px' }}>Image URL</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        {editUserId ? (
          <div>
            <button type="button" onClick={handleUpdate} style={{ background: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
              Update
            </button>
            <button type="button" onClick={handleCancelEdit} style={{ background: '#ccc', color: 'black', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" onClick={handlePost} style={{ background: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Post
          </button>
        )}
      </form>

      <div className="user-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {Array.isArray(userList) && userList.length > 0 ? (
          userList.map((user) => (
            <div key={user.id} className="user-card" style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <img src={user.imageUrl} alt={user.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} />
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ marginBottom: '5px' }}>{user.name}</h2>
                <p style={{ color: '#666', marginBottom: '10px' }}>Email: {user.email}</p>
                <div>
                  <button type="button" onClick={() => handleEdit(user)} style={{ background: '#2196F3', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(user.id)} style={{ background: '#f44336', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Trial;
