import { useState } from "react";
import { BsList } from "react-icons/bs";
import { BsFolderPlus } from "react-icons/bs";
import { BsCaretDownFill } from "react-icons/bs";
import { BsFillBagPlusFill } from "react-icons/bs";
import { BsMenuUp } from "react-icons/bs";
import { BsFillClipboardDataFill } from "react-icons/bs";

export function MenuLateral() {
    const [activeItem, setActiveItem] = useState(null);

    const selectLink = (itemId) => {
        setActiveItem(itemId)
    };

    return (
            <div className="menu-lateral">
            <div id="btn-expandir" >
                <BsList id="btn-exp"/>
            </div>
            <ul>
                <li className="itens-menu">
                    <a 
                        className={`item-menu ${activeItem === 'cadastro' ? 'ativo' : ''}`} 
                        href="#" 
                        onClick={() => selectLink('cadastro')}
                    >
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
                    <a 
                        className={`item-menu ${activeItem === 'pedido' ? 'ativo' : ''}`} 
                        href="#" 
                        onClick={() => selectLink('pedido')}
                    >
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
                    <a 
                        className={`item-menu ${activeItem === 'cardapio' ? 'ativo' : ''}`} 
                        href="#" 
                        onClick={() => selectLink('cardapio')}
                    >
                        <span className="icon"><BsMenuUp /></span>
                        <span className="txt-link">Cardápio online</span>
                    </a>
                </li>
            </ul>
            <ul>
                <li className="itens-menu">
                    <a 
                        className={`item-menu ${activeItem === 'relatorios' ? 'ativo' : ''}`} 
                        href="#" 
                        onClick={() => selectLink('relatorios')}
                    >
                        <span className="icon"><BsFillClipboardDataFill /></span>
                        <span className="txt-link">Relatórios</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}