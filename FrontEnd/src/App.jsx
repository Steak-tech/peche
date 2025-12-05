import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Layout from './components/Layout.jsx';
import Sortie from './pages/Sortie.jsx';

function App() {

  return (
    // Return app with react router dom setup
    <Router>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/sortie" element={<Sortie />} />
          <Route path="/profile" element={<h1>Profile Page</h1>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
