import './ModalProdutos.css'
import PropTypes from 'prop-types';
import { useState } from 'react';
import { api } from '../../lib/api';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { BsPlusSquare } from "react-icons/bs";
import { BsXSquareFill } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";

ModalProdutos.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  atualizaTabela: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  optionsIngredientes: PropTypes.arrayOf(
    PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    )
  ).isRequired,
  optionsCategoria: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    )
  ).isRequired,
};

export default function ModalProdutos({ isOpen, closeModal, optionsIngredientes, atualizaTabela, optionsCategoria }) {
    const [ingredientes, setIngredientes] = useState([{ id: uuidv4(), codigo: "", ingrediente: "Selecione"}]);
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
            const ingredienteSelecionado = optionsIngredientes.find(option => option[1] === value);

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
        codCategoria: 0,
        categoria: 'Selecione',
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

    const onChangeCategoria = (event) => {
        optionsCategoria.forEach((option) => {
           if(option[1] === event.target.value) {
                const formAtualizado = { ...form }
                formAtualizado.codCategoria = option[0]

                setForm(formAtualizado)
           }
        })

    }

    const cadastraProduto = async (event) => {
        event.preventDefault()

        const codigos = ingredientes.map((ingrediente) => {
            return ingrediente.codigo
        });
        
        setForm({
            produto: event.target.elements.produto.value,
            codCategoria: event.target.elements.codCategoria.value,
            categoria: event.target.elements.categoria.value,
            preco: event.target.elements.preco.value,
        })

        try {
            await api.post(
                '/cadastraProduto',
                {
                    Produto: form.produto,
                    Categoria: form.codCategoria,
                    Preco: form.preco,
                    Ingredientes: codigos
                }
            )

            closeModal(true);
            atualizaTabela(true);
            setForm({produto: '', codCategoria: 0, categoria: 'Selecione', preco: ''});
            setIngredientes([{ codigo: '', ingrediente: 'Selecione' }]);

            const selectIngredientes = document.getElementsByClassName('selectIngredientes')[0];
            selectIngredientes.selectedIndex = 'Selecione';
            const selectCategorias = document.getElementsByClassName('selectCategorias')[0];
            selectCategorias.selectedIndex = 'Selecione';

            toast.success('Produto cadastrado com sucesso!', {
                autoClose: 3000,
            });
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
                        name="codCategoria" 
                        id="codCategoria" 
                        onChange={onChangeProduto}
                        value={form.codCategoria}
                    />
                    <select
                        className='selectCategorias'
                        name='categoria'
                        onChange={onChangeCategoria}
                    >
                        {optionsCategoria.map(option => (
                            <option key={option[0]} value={option[1]}>{option[1]}</option>
                        ))}
                    </select>
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
                                        <tr key={ingrediente.id}>
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
                                                    className='selectIngredientes'
                                                    name="ingrediente" 
                                                    onChange={(event) => handleChange(index, event)}
                                                    value={ingrediente.ingrediente}
                                                >
                                                    {optionsIngredientes.map(option => (
                                                        <option key={option[0]} value={option[1]}>{option[1]}</option>
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