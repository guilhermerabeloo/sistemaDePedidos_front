import './App.css'
import Logo from './assets/img/Logo.png';
import user from './assets/img/user.jpeg';
import { BsList } from "react-icons/bs";
import { BsFolderPlus } from "react-icons/bs";
import { BsCaretDownFill } from "react-icons/bs";
import { BsFillBagPlusFill } from "react-icons/bs";
import { BsMenuUp } from "react-icons/bs";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";

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
        <div className="menu-lateral">
            <div id="btn-expandir" >
                <BsList />
            </div>
            <ul>
                <li className="itens-menu">
                    <a className="item-menu" href="#">
                        <span className="icon"><BsFolderPlus /></span>
                        <span className="txt-link">Cadastro</span>
                        <span className="icon-subitens"><BsCaretDownFill /></span>
                    </a>
                    <ul className="itens-submenu">
                        <li><a href="assets/html/cadastro/produtos.html">Produtos</a></li>
                        <li><a href="#">Clientes</a></li>
                        <li><a href="#">Ingredientes</a></li>
                        <li><a href="#">Bairros</a></li>
                    </ul>
                </li>
            </ul>
            <ul>
                <li className="itens-menu">
                    <a className="item-menu" href="#">
                        <span className="icon"><BsFillBagPlusFill /></span>
                        <span className="txt-link">Pedido</span>
                        <span className="icon-subitens"><BsCaretDownFill /></span>
                    </a>
                    <ul className="itens-submenu">
                        <li><a href="#">Entrega</a></li>
                        <li><a href="#">Mesa</a></li>
                        <li><a href="#">Balcão</a></li>
                    </ul>
                </li>
            </ul>
            <ul>
                <li className="itens-menu">
                    <a className="item-menu" href="#">
                        <span className="icon"><BsMenuUp /></span>
                        <span className="txt-link">Cardápio online</span>
                    </a>
                </li>
            </ul>
            <ul>
                <li className="itens-menu">
                    <a className="item-menu" href="#">
                        <span className="icon"><BsFillClipboardDataFill /></span>
                        <span className="txt-link">Relatórios</span>
                    </a>
                </li>
            </ul>
        </div>
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
