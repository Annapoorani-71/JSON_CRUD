// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Trial() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [userList, setUserList] = useState([]);
//   const [editUserId, setEditUserId] = useState(null); // Track the user being edited

//   const handlePost = () => {
//     fetch
//       .post('http://localhost:3001/posts', { name, email, imageUrl })
//       .then((response) => {
//         alert('Data saved successfully');
//         setEmail('');
//         setName('');
//         setImageUrl('');
//         fetchData();
//       })
//       .catch((error) => {
//         console.error('POST request error:', error);
//         alert('Something went wrong when saving data.');
//       });
//   };

//   const fetchData = () => {
//     axios
//       .get('http://localhost:3001/posts')
//       .then((response) => {
//         setUserList(response.data);
//       })
//       .catch((error) => {
//         console.error('GET request error:', error);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleEdit = (user) => {
//     setEditUserId(user.id);
//     setName(user.name);
//     setEmail(user.email);
//     setImageUrl(user.imageUrl);
//   };

//   const handleUpdate = () => {
//     axios
//       .put(`http://localhost:3001/posts/${editUserId}`, { name, email, imageUrl })
//       .then((response) => {
//         alert('Data updated successfully');
//         setEditUserId(null);
//         setName('');
//         setEmail('');
//         setImageUrl('');
//         fetchData();
//       })
//       .catch((error) => {
//         console.error('PUT request error:', error);
//         alert('Something went wrong when updating data.');
//       });
//   };

//   const handleCancelEdit = () => {
//     setEditUserId(null);
//     setName('');
//     setEmail('');
//     setImageUrl('');
//   };

//   const handleDelete = (userId) => {
//     axios
//       .delete(`http://localhost:3001/posts/${userId}`)
//       .then((response) => {
//         alert('User deleted successfully');
//         setUserList(userList.filter(user => user.id !== userId)); // Update userList state after deletion
//       })
//       .catch((error) => {
//         console.error('DELETE request error:', error);
//         alert('Something went wrong when deleting user.');
//       });
//   };

//   return (
//     <div>
//       <div>
//         <h1>React WebApp</h1>
//       </div>
//       <form>
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <label htmlFor="imageUrl">Image URL</label>
//         <input
//           type="text"
//           id="imageUrl"
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}
//         />

//         {editUserId ? (
//           <div>
//             <button type="button" onClick={handleUpdate}>
//               Update
//             </button>
//             <button type="button" onClick={handleCancelEdit}>
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <button type="button" onClick={handlePost}>
//             Post
//           </button>
//         )}
//       </form>

//       <div>
//         {Array.isArray(userList) && userList.length > 0 ? (
//           userList.map((user) => (
//             <div key={user.id}>
//               <img src={user.imageUrl} alt={user.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} />
//               <div>
//                 <h2>{user.name}</h2>
//                 <p>Email: {user.email}</p>
//                 <div>
//                   <button type="button" onClick={() => handleEdit(user)}>
//                     Edit
//                   </button>
//                   <button type="button" onClick={() => handleDelete(user.id)}>
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No users found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Trial;

import React, { useState, useEffect } from 'react';

function Trial() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [userList, setUserList] = useState([]);
  const [editUserId, setEditUserId] = useState(null); // Track the user being edited

  const handlePost = () => {
    fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, imageUrl }),
    })
      .then((response) => {
        if (response.ok) {
          alert('Data saved successfully');
          setEmail('');
          setName('');
          setImageUrl('');
          fetchData();
        } else {
          throw new Error('Failed to save data');
        }
      })
      .catch((error) => {
        console.error('POST request error:', error);
        alert('Something went wrong when saving data.');
      });
  };

  const fetchData = () => {
    fetch('http://localhost:3001/posts')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        setUserList(data);
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
    fetch(`http://localhost:3001/posts/${editUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, imageUrl }),
    })
      .then((response) => {
        if (response.ok) {
          alert('Data updated successfully');
          setEditUserId(null);
          setName('');
          setEmail('');
          setImageUrl('');
          fetchData();
        } else {
          throw new Error('Failed to update data');
        }
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
    fetch(`http://localhost:3001/posts/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          alert('User deleted successfully');
          setUserList(userList.filter((user) => user.id !== userId)); // Update userList state after deletion
        } else {
          throw new Error('Failed to delete user');
        }
      })
      .catch((error) => {
        console.error('DELETE request error:', error);
        alert('Something went wrong when deleting user.');
      });
  };

  return (
    <div>
      <div>
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

        {editUserId ? (
          <div>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" onClick={handlePost}>
            Post
          </button>
        )}
      </form>

      <div>
        {Array.isArray(userList) && userList.length > 0 ? (
          userList.map((user) => (
            <div key={user.id}>
              <img
                src={user.imageUrl}
                alt={user.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              />
              <div>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <div>
                  <button type="button" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </div>
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

export default Trial;
