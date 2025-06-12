import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import Authenticated from "./Components/Authenticated";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/authenticated" element={<Authenticated />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
