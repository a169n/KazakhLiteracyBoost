
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/index';
import Layout from './layout/Layout';
function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='signup' element={<Signup />} />
      </Route>
    </Routes>
  )
}

export default App
