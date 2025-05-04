import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import BookingPage from "./Components/Booking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Booking" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
