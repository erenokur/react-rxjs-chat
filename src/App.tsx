import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Switcher from "./pages/chatPage";
import Chat from "./components/chat";

function App() {
  return (
    <Router>
      <div className="App">
        <Switcher />
        <Routes>
          <Route path="/first-person" element={<Chat person="Person 1" />} />
          <Route path="/second-person" element={<Chat person="Person 2" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
