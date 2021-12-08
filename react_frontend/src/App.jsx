import './App.css';
import Navbar from './components/template/Navbar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/home/Home'
import React from 'react';
import CrudSpringBoot from './components/section/CrudSpringBoot';
import ReactPhotoGallery from './components/section/ReactPhotoGallery';
import Time from './components/section/Time';
import Money from './components/section/Money';
import Calculator from './components/section/calculator/Calculator';
import Investment from './components/section/investment/Investment';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/ReactPhotoGallery' element={<ReactPhotoGallery/>}/>
          <Route exact path='/CrudSpringBoot' element={<CrudSpringBoot/>}/>
          <Route exact path='/Time' element={<Time/>}/>
          <Route exact path='/Money' element={<Money/>}/>
          <Route exact path='/calculator/Calculator' element={<Calculator/>}/>
          <Route exact path='/investment/Investment' element={<Investment/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
