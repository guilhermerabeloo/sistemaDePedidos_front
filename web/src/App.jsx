import './App.css'
import Logo from './assets/img/Logo.png';
import user from './assets/img/user.jpeg';
import { BsSearch } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
import { MenuLateral } from './components/menuLateral';

function App() {
  return (
    <div className="container" id="template-areas">
        <div id="header">
            <div className="header-itens" id="logo"><img src={Logo} alt="Logo da empresa" /></div>
            <div className="header-itens" id="pesquisa"><input type="text" placeholder="Pesquisar" /><button><BsSearch /></button></div>
            <div className="header-itens" id="config"><BsFillGearFill /></div>
            <div className="header-itens" id="user-name"><p>Olá, Guilherme Rabelo</p></div>
            <div className="header-itens user-image" ><img id="user-image"src={user} alt="" /></div>
        </div>
        <MenuLateral />
        <div id="content1">
        </div>
        <div id="content2">
        </div>
        <div id="footer">
           <p>Guilherme Rabelo © 2023 - Todos direitos reservados</p> 
        </div>
    </div>
  )
}

export default App
