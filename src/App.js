import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Landing from './pages/Landing';
import Details from './pages/Details';

function App() {
  return (
    <div className="App" style={{backgroundColor:"#000000",color:"white",height:"100vh",overflowY:"scroll"}}>
      <Routes>
        <Route path="/" exact element={<Landing/>} />
        <Route path="/details/:id" element={<Details/>} />
      </Routes>
    </div>
  );
}

export default App;
