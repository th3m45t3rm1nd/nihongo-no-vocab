import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom'
import Radicals from './pages/radicals'
import Kanjis from './pages/kanjis'
import Vocabs from './pages/vocabs'
import Home from './pages/home'

function App() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/radicals')
  } 
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/radicals" element={<Radicals />} />
        <Route path="/kanjis" element={<Kanjis />} />
        <Route path="/vocabs" element={<Vocabs />} />
      </Routes>
    </>
  )
}

export default App
