import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/index";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Quizzes from "./pages/Quizzes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="quiz/:id" element={<Quiz />} />
        <Route path="quizzes" element={<Quizzes />} />
      </Route>
    </Routes>
  );
}

export default App;
