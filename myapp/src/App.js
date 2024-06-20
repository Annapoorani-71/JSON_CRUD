import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Updating from './components/Updating';
import Gallery from './components/Gallery'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/"  element=<Home/> />
          <Route path="/about" element=<About/> />
          {/* <Route path="/services" element={Services} />
          <Route path="/contact" element={Contact} /> */}
          <Route path='/gallery' element=<Gallery/>/>
          <Route path='/update' element=<Updating/>/>
          </Routes>
      </div>
    </Router>
  );
};

export default App;
