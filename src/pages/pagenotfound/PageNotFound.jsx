import React from "react";
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '50vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          color: '#fe5555',
          fontSize: '10vh',
          fontWeight: '800',
        }}
      >
        404
      </h1>

      <p
        style={{
          color: '#fff',
          fontSize: '6vh',
          fontWeight: '800',
        }}
      >
        Page Not Found
      </p>

      <button
        onMouseOver={(e) => (e.currentTarget.style.color = '#fe5555')}
        onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          textDecoration: 'underline',
          cursor: 'pointer',
          fontSize: '4vh',
        }}
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </button>
    </div>
  );
}

export default PageNotFound;
