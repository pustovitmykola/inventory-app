import { Routes, Route, NavLink } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  return (
    <>
      <nav className="nav">
        <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Адмін-панель
        </NavLink>
        <NavLink to="/gallery" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Галерея
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Улюблені ♥
        </NavLink>
      </nav>
      <Routes>
        <Route path="/admin" element={<AdminInventory />} />
        <Route path="/admin/create" element={<AdminInventoryCreate />} />
        <Route path="/admin/:id" element={<AdminInventoryDetails />} />
        <Route path="/admin/:id/edit" element={<AdminInventoryEdit />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<AdminInventory />} />
      </Routes>
    </>
  );
}

export default App;
