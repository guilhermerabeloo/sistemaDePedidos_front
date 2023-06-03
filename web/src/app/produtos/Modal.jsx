import { BsPlusSquare } from "react-icons/bs";
import { BsXSquareFill } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
export default function Modal({ isOpen, closeModal }) {
    if(isOpen) {
        return (
            <div>
                <div id="fade" className="" onClick={closeModal}></div>
                <div id="modal" className="">
                    <h2>Cadastro de produto</h2>
                    <button className="btn-fecharModal" onClick={closeModal}><BsXSquareFill /></button>
                    <form className="cadastroProduto">
                        <label htmlFor="produto">Produto: </label>
                        <input type="text" id="produto" placeholder="Ex: Portuguesa..."/>
        
                        <label htmlFor="categoria">Categoria:</label>
                        <input type="text" id="categoria" placeholder="Ex: Pizza..."/>
        
                        <label htmlFor="preco">Preço:</label>
                        <input type="text" id="preco" placeholder="R$ 26,00..."/>
                    </form>
                    <table className="tabIngredientes">
                        <caption>Ingredientes</caption>
                        <tr>
                            <th>Codigo</th>
                            <th>Ingrediente</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Presunto</td>
                        </tr>
                    </table>
                    <button className="btn-salvar"><BsPlusSquare />Salvar</button>
                </div>
            </div>
        )
    }

    return null
}