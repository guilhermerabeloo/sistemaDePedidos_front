import { useState } from "react";
import { BsList } from "react-icons/bs";
import { BsFolderPlus } from "react-icons/bs";
import { BsCaretDownFill } from "react-icons/bs";
import { BsFillBagPlusFill } from "react-icons/bs";
import { BsMenuUp } from "react-icons/bs";
import { BsFillClipboardDataFill } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
export function MenuLateral({ propToggleExpandirGrid, menuExpandido }) {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const selectMenu = (itemId) => {
        setActiveMenu(itemId);

        if(menuExpandido) {
            if (activeMenu === itemId) {
                setActiveSubMenu(null);
            } else {
                setActiveSubMenu(itemId);
            }
        }
    };

    return (
        <div className="menu-lateral">
            <div id="btn-expandir">
                <BsList id="btn-exp" onClick={propToggleExpandirGrid}/>
            </div>
            <ul>
                <li className="itens-menu">
                    <a 
                        className={`item-menu ${activeMenu === 'cadastro' ? 'ativo' : ''}`} 
                        href="#" 
                        onClick={() => {selectMenu('cadastro') }}
                    >
                        <span className="icon"><BsFolderPlus /></span>
                        <span className="txt-link">Cadastro</span>
                        <span className="icon-subitens"><BsCaretDownFill /></span>
                    </a>
                    <ul className={`itens-submenu ${activeSubMenu === 'cadastro' ? 'exibirItens' : ''}`}>
                        <li><a href="assets/html/cadastro/produtos.html">Produtos</a></li>
                        <li><a href="#">Clientes</a></li>
                        <li><a href="#">Ingredientes</a></li>
                        <li><a href="#">Bairros</a></li>
                    </ul>
                </li>
            </ul>
            <ul>
                <li className="itens-menu">
                    <a 
                        className={`item-menu ${activeMenu === 'pedido' ? 'ativo' : ''}`} 
                        href="#" 
                        onClick={() => selectMenu('pedido')}
                    >
                        <span className="icon"><BsFillBagPlusFill /></span>
                        <span className="txt-link">Pedido</span>
                        <span className="icon-subitens"><BsCaretDownFill /></span>
                    </a>
                    <ul className={`itens-submenu ${activeSubMenu === 'pedido' ? 'exibirItens' : ''}`}>
                        <li><a href="#">Entrega</a></li>
                        <li><a href="#">Mesa</a></li>
                        <li><a href="#">Balcão</a></li>
                    </ul>
                </li>
            </ul>
            <ul>
                <li className="itens-menu">
                    <a 
                        className={`item-menu ${activeMenu === 'cardapio' ? 'ativo' : ''}`} 
                        href="#" 
                        onClick={() => selectMenu('cardapio')}
                    >
                        <span className="icon"><BsMenuUp /></span>
                        <span className="txt-link">Cardápio online</span>
                    </a>
                </li>
            </ul>
            <ul>
                <li className="itens-menu">
                    <a 
                        className={`item-menu ${activeMenu === 'relatorios' ? 'ativo' : ''}`} 
                        href="#" 
                        onClick={() => selectMenu('relatorios')}
                    >
                        <span className="icon"><BsFillClipboardDataFill /></span>
                        <span className="txt-link">Relatórios</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}