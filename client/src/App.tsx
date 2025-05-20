import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import ShopAll from './pages/ShopAll';
import Product from './pages/Product';

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop-all" element={<ShopAll />} />
                <Route path="/product" element={<Product />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
