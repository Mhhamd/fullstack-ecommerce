import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Add from './pages/Add';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import DashboardLayout from './components/DashboardLayout';
import All_Items from './pages/All_Items';

function App() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/add"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Add />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/all-items"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <All_Items />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
