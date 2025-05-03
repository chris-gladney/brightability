import "./App.css";
import ContactUs from "./components/ContactUs";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Staff from "./components/Staff";
import PhotoAlbum from "./components/PhotoAlbum";
import PaymentConnect from "./components/PaymentConnect";
import PaymentSocial from "./components/PaymentSocial";
import MoreInfo from "./components/MoreInfo"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/photos" element={<PhotoAlbum />} />
        <Route path="/connect" element={<PaymentConnect />} />
        <Route path="/social" element={<PaymentSocial />} />
        <Route path="/moreinfo" element={<MoreInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
