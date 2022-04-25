import React from 'react'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Home from './pages/Home'
import CoinsPage from './pages/CoinsPage'

function App() {
  return (
    <Router>
      
      <div className='App'>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/coins/:id' element={<CoinsPage/>}/>
        </Routes>
      </div>

      
    </Router>
  );
}

export default App;
