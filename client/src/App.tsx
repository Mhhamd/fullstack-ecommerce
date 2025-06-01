import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import ShopAll from './pages/ShopAll';
import Product from './pages/Product';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from './components/shared/ScrollToTop';

function App() {
    return (
        <div>
            <ScrollToTop />
            <ToastContainer />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop-all" element={<ShopAll />} />
                <Route path="/product/:id" element={<Product />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
