import './App.css';
import Navbar from './components/template/Navbar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/home/Home'
import React from 'react';
import ReactPhotoGallery from './components/section/ReactPhotoGallery';
import Money from './components/section/Money';
import Calculator from './components/section/calculator/Calculator';
import Investment from './components/section/investment/Investment';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/ReactPhotoGallery' element={<ReactPhotoGallery/>}/>
          <Route exact path='/Money' element={<Money/>}/>
          <Route exact path='/calculator/Calculator' element={<Calculator/>}/>
          <Route exact path='/investment/Investment' element={<Investment/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
