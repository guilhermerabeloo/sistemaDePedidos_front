import { Link } from 'react-router-dom';
import Logo from '../assets/img/Logo.png';
import user from '../assets/img/user.jpeg';
import { BsSearch } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";

export function Header() {
    return (
        <div id="header">
            <div className="header-itens" id="logo"><Link to={'/'}><img src={Logo} alt="Logo da empresa" /></Link></div>
            <div className="header-itens" id="pesquisa"><input type="text" placeholder="Pesquisar" /><button><BsSearch /></button></div>
            <div className="header-itens" id="config"><BsFillGearFill /></div>
            <div className="header-itens" id="user-name"><p>Olá, Guilherme Rabelo</p></div>
            <div className="header-itens user-image" ><img id="user-image"src={user} alt="" /></div>
        </div>
    )
}