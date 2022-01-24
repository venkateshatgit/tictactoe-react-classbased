import { Component } from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.css'
import Game from './game.component';
import CustomPage from './pages/custom-component/custom.component';
import HomePage from './pages/home-component/home.component';
import MatrixPage from './pages/matrix-component/matrix.component';
import Moves from './pages/moves-component/moves.component';




class App extends Component {

  render() { 
    return (
      <div className='App'>
        <Routes>
          <Route exact  path="/" element={<HomePage/>}/>
          <Route exact  path="/custom-page" element={<CustomPage/>} />
          <Route exact  path="/matrix-page" element={<MatrixPage/>} />
          <Route exact  path="/game" element={<Game/>} />
          <Route exact  path="/moves-page" element={<Moves />} />
        </Routes>
      </div>
    );
  }
}
 
export default App;