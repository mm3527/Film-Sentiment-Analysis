import React from 'react'
import logo from '../assets/logo.png'
import './components.css'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="wrapper">
        <button
          className="logo"
          onClick={() => navigate('/')}
          aria-label="Go to home page"
        >
          <img src={logo} alt="Film Critic Logo" />
        </button>

        <nav>
          <button
            className="nav-button"
            onClick={() => navigate('/explore/movie')}
          >
            Movies
          </button>
          <button
            className="nav-button"
            onClick={() => navigate('/explore/tv')}
          >
            TV Shows
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
