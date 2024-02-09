
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Remove useNavigate import
import Particles from "./components/Particles";
import Home from "./pages/Home";
import "./App.css";

const App = () => {
  

  return (
    <BrowserRouter> {/* Wrap your entire application with BrowserRouter */}
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/home' element={<Particles/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


