import './App.css';
import { useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MenuLateral } from './components/menuLateral';

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
        <div id="content1">
        </div>
        <div id="content2">
        </div>
        <Footer />
    </div>
  )
}

export default App
