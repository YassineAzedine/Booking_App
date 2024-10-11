import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Checkout from "./components/checkout";
import Confirm from "./components/confirm";
import Contact from "./components/contact";
import Reservation from "./components/reservation";
import About from "./components/about";
import Rooms from "./components/romms";
import Header from "./layoutes/header";
import Footer from "./layoutes/footer";




function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="reservation" element={<Reservation />} />
        <Route path="contact" element={<Contact />} />
        {/* <Route path="checkout" element={<Checkout />} /> */}
        <Route path="rooms/checkout/:id" element={<Checkout />} />

        <Route path="confirm" element={<Confirm />} />


      </Route>
    </Routes>
    <Footer />

  </BrowserRouter>
  );
}

export default App;
