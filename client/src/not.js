

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>404 Not Found</h2>
        <p style={styles.text}>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" style={styles.link}>
          <button style={styles.button}>Go Home</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#000', 
    color: '#fff', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  link: {
    textDecoration: 'none',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: 'none',
  }
};

export default NotFound;
