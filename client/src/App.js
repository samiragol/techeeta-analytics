import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

// Custom hook for fetching user data
const useFetchUsers = (url) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json, ">>>>>>>.")
        setUsers(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { users, loading, error };
};

function App() {
  const url = "http://localhost:9000/users";
  const { users, loading, error } = useFetchUsers(url);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* Conditional rendering based on the loading state */}
      {loading && <p>Loading users...</p>}
      {error && <p>Error!!!: {error}</p>}
      {!loading && !error && (
        <ul>
          {users.map(user => (
            <li key={user.user_id}>{user.given_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
