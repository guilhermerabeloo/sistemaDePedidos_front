import './App.css';
import { useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { MenuLateral } from '../components/menuLateral';
import { Outlet } from 'react-router-dom';

function App() {
  const [expandirGrid, setExpandirGrid] = useState(false);
  const menuExpandido = expandirGrid ? true : false;

  const toggleExpandirGrid = () => {
    setExpandirGrid(!expandirGrid);
  }

  return (
      <div className={`container ${expandirGrid ? 'expandirGrid' : ''}`} id="template-areas">
        <Header />
        <MenuLateral propToggleExpandirGrid={toggleExpandirGrid} menuExpandido={menuExpandido}/>
        <div id="content"></div>
        <Outlet />
        <Footer />
      </div>
  )
}

export default App
