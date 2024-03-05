import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
