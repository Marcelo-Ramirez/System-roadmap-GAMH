import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Pendings from './pages/Pendings';
import Processes from './pages/Processes';
import Folders from './pages/Folders';
import PrivateRoute from './components/PrivateRoute';
import RouteCapture from './components/RouteCapture';
import LoginWrapper from './components/LoginWrapper';
import Login from './pages/Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivateRoute element={<Layout />} />} >
                    <Route path="inicio" element={<Home />} />
                    <Route path="pendientes" element={<Pendings />} />
                    <Route path="procesos" element={<Processes />} />
                    <Route path="carpetas" element={<Folders />} />
                </Route>
                <Route path="/login" element={<LoginWrapper element={<Login />} />} />
                <Route path="*" element={<RouteCapture />} />
            </Routes>
        </Router>
    );
}

export default App;
