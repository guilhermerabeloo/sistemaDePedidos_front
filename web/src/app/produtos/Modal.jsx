import './Modal.css'
import { useState } from 'react';
import { api } from '../../lib/api';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { BsPlusSquare } from "react-icons/bs";
import { BsXSquareFill } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  atualizaTabela: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string)
  ).isRequired
};

export default function Modal({ isOpen, closeModal, options, atualizaTabela }) {
    const [ingredientes, setIngredientes] = useState([{codigo: "", ingrediente: "Selecione"}]);
    const [index, setIndex] = useState(0);

    const adicionaIngrediente = () => {
        setIngredientes([...ingredientes, {codigo: "", ingrediente: ""}])
        setIndex(index + 1);
    };

    const excluiIngrediente = (index) => {
        const novosIngredientes = [...ingredientes];
        novosIngredientes.splice(index, 1);
        setIngredientes(novosIngredientes);
    };
    
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const novosIngredientes = [...ingredientes];
        novosIngredientes[index][name] = value;

        if(name === 'ingrediente') {
            const ingredienteSelecionado = options.find(option => option[1] === value);

            if(ingredienteSelecionado) {
                novosIngredientes[index].codigo = ingredienteSelecionado[0];
            } else {
                novosIngredientes[index].codigo = '';
            }
        }
        setIngredientes(novosIngredientes);
    };

    const [ form, setForm ] = useState({
        produto: '',
        categoria: '',
        preco: '',
    });

    const onChangeProduto = (event) => {
        const { name, value } = event.target;

        setForm((formAntigo) => {
            const formAtualizado = { ...formAntigo }
            formAtualizado[name] = value
            
            return formAtualizado
        });
    }

    const cadastraProduto = async (event) => {
        event.preventDefault()

        const codigos = ingredientes.map((ingrediente) => {
            return ingrediente.codigo
        });

        setForm({
            produto: event.target.elements.produto.value,
            categoria: event.target.elements.categoria.value,
            preco: event.target.elements.preco.value,
        })

        try {
            await api.post(
                '/cadastraProduto',
                {
                    Produto: form.produto,
                    Categoria: form.categoria,
                    Preco: form.preco,
                    Ingredientes: codigos
                }
            )
            toast.success('Produto cadastrado com sucesso!', {
                autoClose: 3000,
            });
            closeModal(true);
            atualizaTabela(true);
            setForm({produto: '', categoria: '', preco: ''});
            setIngredientes([{ codigo: '', ingrediente: 'Selecione' }]);
        } catch (erro) {
            toast.error('Erro ao cadastrar o produto.', {
                autoClose: 3000,
            });
        }
    }

    return (
        <div>
            <div id="fade" className={isOpen ? '' : 'hide'} onClick={closeModal}></div>
            <div id="modal" className={isOpen ? '' : 'hide'}>
                <button className="btn-fecharModal" onClick={closeModal}><BsXSquareFill /></button>
                <form className="cadastroProduto" onSubmit={cadastraProduto}>
                    <label htmlFor="produto">Produto: </label>
                    <input 
                        type="text" 
                        name="produto" 
                        id="produto" 
                        placeholder="Ex: Portuguesa..."
                        onChange={onChangeProduto}
                        value={form.produto}
                    />
                    <label htmlFor="categoria">Categoria:</label>
                    <input 
                        type="text" 
                        name="categoria" 
                        id="categoria" 
                        placeholder="Ex: Pizza..."
                        onChange={onChangeProduto}
                        value={form.categoria}
                    />
                    <label htmlFor="preco">Preço:</label>
                    <input 
                        type="text" 
                        name="preco" 
                        id="preco" 
                        placeholder="R$ 26,00..."
                        onChange={onChangeProduto}
                        value={form.preco}
                    />
                    <div className="selecao-ingredientes">
                        <div className="ingredientes-container">
                            <table className="tabIngredientes">
                                <tbody>
                                    <tr>
                                        <th className="codigo">Codigo</th>
                                        <th className="ingrediente">Ingrediente</th>
                                        <th className="excluiLinha"></th>
                                    </tr>
                                    {ingredientes.map((ingrediente, index) => (
                                        <tr key={index}>
                                            <td className="codigo">
                                                <input 
                                                    className="inpCodigoIngrediente"
                                                    type="number" 
                                                    name="codigo" 
                                                    value={ingrediente.codigo || ''} 
                                                    onChange={(event) => handleChange(index, event)}
                                                />
                                            </td>
                                            <td className="ingrediente">
                                                <select
                                                    name="ingrediente" 
                                                    onChange={(event) => handleChange(index, event)}
                                                >
                                                    <option key="">Selecione</option>
                                                    {options.map(option => (
                                                        <option key={option[1]} value={option[1]}>{option[1]}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <BsFillTrash3Fill 
                                                    className={`deleteRow ${ingredientes.length === 1 ? 'disabled' : ''}`}
                                                    onClick={() => excluiIngrediente(index)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button 
                            type="button" 
                            className="btn-AddIngrediente" 
                            onClick={() => adicionaIngrediente()}
                        >
                            <BsPlusLg /> Adicionar ingrediente
                        </button>
                    </div>
                    <button 
                        type="submit" 
                        className="btn-salvar"
                    >
                        <BsPlusSquare /> Salvar
                    </button>
                </form>
            </div>
        </div>
    )
}