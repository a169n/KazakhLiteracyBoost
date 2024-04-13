
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/index';
import Layout from './layout/Layout';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Home from './pages/Home';
function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path="quiz" element={<Quiz />} />
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
