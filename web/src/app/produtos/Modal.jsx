import { useState } from 'react';
import './Modal.css'
import { BsPlusSquare } from "react-icons/bs";
import { BsXSquareFill } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
export default function Modal({ isOpen, closeModal }) {
        const [ingredientes, setIngredientes] = useState([{codigo: "", ingrediente: ""}]);
        const [index, setIndex] = useState(0);
    
        const adicionaIngrediente = () => {
            setIngredientes([...ingredientes, {codigo: "", ingrediente: ""}])
            setIndex(index + 1);
        };
        
        const handleChange = (index, event) => {
            console.log('oi')
            const { name, value } = event.target;
            const novosIngredientes = [...ingredientes];
            novosIngredientes[index][name] = value;
            setIngredientes(novosIngredientes);
        }

    return (
        <div>
            <div id="fade" className={isOpen ? '' : 'hide'} onClick={closeModal}></div>
            <div id="modal" className={isOpen ? '' : 'hide'}>
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
                <div className="selecao-ingredientes">
                    <table className="tabIngredientes">
                        <caption>Ingredientes</caption>
                        <tbody>
                            <tr>
                                <th className="codigo">Codigo</th>
                                <th className="ingrediente">Ingrediente</th>
                            </tr>
                            {ingredientes.map((ingrediente, index) => (
                                <tr key={index}>
                                    <td className="codigo">
                                        <input 
                                            className="inpCodigoIngrediente"
                                            type="number" 
                                            name="codigo" 
                                            value={ingrediente.codigo} 
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    </td>
                                    <td className="ingrediente">
                                        <input 
                                            className="inpIngrediente"
                                            type="text" 
                                            name="ingrediente" 
                                            value={ingrediente.ingrediente} 
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    </td>
                                </tr>
                        ))}
                        </tbody>
                    </table>
                    <button className="btn-AddIngrediente" onClick={() => adicionaIngrediente()}><BsPlusLg /> Adicionar ingrediente</button>
                </div>
                <button className="btn-salvar"><BsPlusSquare /> Salvar</button>
            </div>
        </div>
    )
}