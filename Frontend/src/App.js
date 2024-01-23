// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';
import Header from './components/Header'; // Import your Header component
import Footer from './components/Footer'; // Import your Footer component

const App = () => {
  const [contentVisible, setContentVisible] = useState(false);

  return (
    <Router>
      <div>
        <Header contentVisible={contentVisible}/> {/* Your Header Component */}
        
        <Routes  setContentVisible={setContentVisible}/>

        <Footer visible={contentVisible} /> 
      </div>
    </Router>
  );
};

export default App;
