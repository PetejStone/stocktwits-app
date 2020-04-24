import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main'
import {Route} from 'react-router-dom'
function App() {
  return (
    
    <div className="App">
      <h1>Hello</h1>
      <Route
        path="/"
        // component={ () => window.location = `https://api.stocktwits.com/api/2/oauth/authorize?client_id=87ff18157d322323&response_type=code&redirect_uri=http://stocktwits-app.netlify.app&scope=read,watch_lists,publish_messages,publish_watch_lists,direct_messages,follow_users,follow_stocks` }
 
      />
  
    </div>
  );
}

export default App;
