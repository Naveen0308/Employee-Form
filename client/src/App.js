import './App.css';
import Home from './Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homenew from './Homenew';
import Update from './Update';



function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/Homenew' element={<Homenew />}></Route>
      <Route path='/Update' element={<Update />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
