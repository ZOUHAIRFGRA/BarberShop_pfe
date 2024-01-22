// App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';
import Header from './components/Header'; // Import your Header component
import Footer from './components/Footer'; // Import your Footer component

const App = () => {
  return (
    <Router>
      <div>
        <Header /> {/* Your Header Component */}
        
        <Routes />

        {/* <Footer /> Your Footer Component */}
      </div>
    </Router>
  );
};

export default App;
