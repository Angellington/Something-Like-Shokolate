import './App.css'
import DateCustom from './components/DateCustom'
import { Routes, Route } from 'react-router-dom'
import Box from '@mui/material/Box'
import Main from './pages/Main/Main'
import View from './pages/View/View'
function App() {

 
  return (
    <>
      <DateCustom />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/view' element={<View />} />
      </Routes>
    </>
  )
}

export default App