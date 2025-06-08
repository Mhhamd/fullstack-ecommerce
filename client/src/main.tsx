import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './context/ProductProvider.tsx';
import { UserProvider } from './context/UserProvider.tsx';
import { FilterProvider } from './context/FilterProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename="/">
            <UserProvider>
                <ProductProvider>
                    <FilterProvider>
                        <App />
                    </FilterProvider>
                </ProductProvider>
            </UserProvider>
        </BrowserRouter>
    </StrictMode>
);
