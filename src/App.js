import logo from './logo.svg';
import './styles/App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Timers from "./pages/Timers.jsx";
import Messages from "./pages/Messages.jsx";

function App() {
  return (
      <div>
          <img src={logo} className="App-logo" alt="logo" width={100} height={100}/>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/" element={<Timers/>}/>
              <Route path="/" element={<Messages/>}/>
          </Routes>
      </div>
  );
}

export default App;