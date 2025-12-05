import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';

function App() {

  return (
    // Return app with react router dom setup
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/captures" element={<h1>Captures Page</h1>} />
      </Routes>
    </Router>
  )
}

export default App
