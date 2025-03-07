import { BrowserRouter, Routes, Route } from 'react-router-dom';


import NotFound from './pages/NotFound';
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Layout from "./components/Layout.tsx";
import Income from "./pages/Income.tsx";
import Expenses from "./pages/Expenses.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />

                <Route path="/" element={<Layout />} >
                    <Route index element={<Dashboard/>}/>
                    <Route path='income' element={<Income/>}/>
                    <Route path='expenses' element={<Expenses/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;

