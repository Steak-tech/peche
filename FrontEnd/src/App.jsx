import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Layout from './components/Layout.jsx';
import Sortie from './pages/Sortie.jsx';
import DetailSortie from "./pages/DetailSortie.jsx";

function App() {

  return (
    // Return app with react router dom setup
    <Router>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/sortie" element={<Sortie />} />
          <Route path="/profile" element={<h1>Profile Page</h1>} />
            <Route path="/test" element={<DetailSortie />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
