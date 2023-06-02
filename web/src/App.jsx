import './App.css'
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MenuLateral } from './components/menuLateral';

function App() {
  return (
    <div className="container" id="template-areas">
        <Header />
        <MenuLateral />
        <div id="content1">
        </div>
        <div id="content2">
        </div>
        <Footer />
    </div>
  )
}

export default App
