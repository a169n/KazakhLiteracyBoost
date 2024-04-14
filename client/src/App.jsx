import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/index";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Quizzes from "./pages/Quizzes";
import Profile from "./pages/Profile";
import Chat from "./chat/Chat";
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="quiz/:id" element={<Quiz />} />
        <Route path="quizzes" element={<Quizzes />} />
        <Route path="profile" element={<Profile />} />
        <Route path="chat" element={<Chat />} />
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
