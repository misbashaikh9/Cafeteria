import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' // Import Bootstrap CSS
import Signup from './components/Signup.jsx';
import Signin from './components/SignIn.jsx';  
import Home from './components/Home.jsx'; 
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} ></Route>
      <Route path="/signin" element={<Signin />} ></Route>
      <Route path="/" element={<Home />} ></Route>
      {/* Add other routes here as needed */}

      </Routes>
    </BrowserRouter>
  )
}

export default App
