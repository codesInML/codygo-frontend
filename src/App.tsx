import "antd/dist/antd.css";
import "./App.css";
import { Footer } from "./components/footer/Footer";
import Header from "./components/header/Header";
import Hotels from "./components/hotels/Hotel-List";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Brands } from "./components/brands/Brands";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Hotels />} />
          <Route path="/brands" element={<Brands />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
