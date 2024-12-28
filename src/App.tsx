import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Kanjis from './pages/kanjis'
import Vocabs from './pages/vocabs'
import Radicals from './pages/radicals'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kanjis" element={<Kanjis />} />
      <Route path="/vocabs" element={<Vocabs />} />
      <Route path="/radicals" element={<Radicals />} />
    </Routes>
  )
}

export default App
