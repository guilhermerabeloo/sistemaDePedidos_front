import './Modal.css'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { BsPlusSquare } from "react-icons/bs";
import { BsXSquareFill } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";

ModalEdicao.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    atualizaTabela: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    optionsIngredientes: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.string)
    ).isRequired,
    optionsCategoria: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.string)
    ).isRequired,
    editProduto: PropTypes.shape({
        idproduto: PropTypes.number,
        produto: PropTypes.string,
        idcategoria: PropTypes.number,
        categoria: PropTypes.string,
        preco: PropTypes.string,
    }),
};

export default function ModalEdicao({ isOpen, closeModal, optionsIngredientes, atualizaTabela, optionsCategoria, editProduto }) {
    const [ ingredientes, setIngredientes ] = useState([{ id: uuidv4(), codigo: "", ingrediente: "Selecione"}]);
    const [ index, setIndex ] = useState(0);
    const [ form, setForm ] = useState({
        produto: '',
        codCategoria: 0,
        categoria: 'Selecione',
        preco: '',
    });
    const [ produtoAlterado, setProdutoAlterado ] = useState({
        alteracao: false,
        produto: '',
        codCategoria: 0,
    });
    const [ precoAlterado, setPrecoAlterado ] = useState({
        alteracao: false,
        preco: null,
    });
    const [ ingredientesIniciais, setIngredientesIniciais ] = useState([{
        id: 0, codigo: "", ingrediente: "Selecione"
    }]);

    async function getIngredientes() {
        try {
            const response = await api.get(
                `/consultaIngredientesProduto/${editProduto.idproduto}`
            );
            const data = response.data.data;
            const ingredienteApi = data.map((ingrediente, index) => {
                return {id: index, codigo: ingrediente.idingrediente, ingrediente: ingrediente.ingrediente} 
            });

            setIngredientes(ingredienteApi)

            const ingredientesIniciaisCopy = JSON.parse(JSON.stringify(ingredienteApi));
            setIngredientesIniciais(ingredientesIniciaisCopy);
        } catch(error) {
            console.log(error)
        }   
    }

    useEffect(() => {
        setForm({
            produto: editProduto.produto,
            codCategoria: editProduto.idcategoria,
            categoria: editProduto.categoria,
            preco: editProduto.preco,
        });
        
        getIngredientes()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editProduto])

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

    const onChangeProduto = (event) => {
        const { name, value } = event.target;

        setForm((formAntigo) => {
            const formAtualizado = { ...formAntigo };
            formAtualizado[name] = value;

            if(name === 'produto') {
                const produtoAtualizado = { ...produtoAlterado };
                produtoAtualizado.alteracao = true;
                produtoAtualizado.produto = value;
                produtoAtualizado.codCategoria = formAtualizado.codCategoria;

                setProdutoAlterado(produtoAtualizado);
            }

            return formAtualizado
        });

        if(name === 'preco') {
            setPrecoAlterado({
                alteracao: true,
                preco: value,
            });
        }
    }

    const onChangeCategoria = (event) => {
        optionsCategoria.forEach((option) => {
           if(option[1] === event.target.value) {
                const formAtualizado = { ...form };
                const produtoAtualizado = { ...produtoAlterado };

                formAtualizado.codCategoria = option[0];
                formAtualizado.categoria = option[1];

                produtoAtualizado.alteracao = true;
                produtoAtualizado.produto = form.produto;
                produtoAtualizado.codCategoria = option[0];

                setForm(formAtualizado);
                setProdutoAlterado(produtoAtualizado);
            }
        });
    };

    const putEdicaoProduto = async (event) => {
        event.preventDefault();

        if(produtoAlterado.alteracao) {
            try {
                await api.put(
                    `/alteraProduto/${editProduto.idproduto}`,
                    {
                        Produto: produtoAlterado.produto,
                        Categoria: produtoAlterado.codCategoria,
                    }
                );
            } catch (error) {
                toast.error('Erro ao editar o produto.', {
                    autoClose: 3000,
                });
                setProdutoAlterado({
                    alteracao: false,
                    produto: '',
                    codCategoria: 0,
                });
                closeModal(true);
                return console.log(error);
            }
        }

        if(precoAlterado.alteracao) {
            try {
                await api.post(
                    `/cadastraSituacaoProduto`,
                    {
                        Preco: precoAlterado.preco,
                        IdProduto: editProduto.idproduto
                    }
                )
            } catch (error) {
                toast.error('Erro ao editar preço do produto.', {
                    autoClose: 3000,
                });
                setPrecoAlterado({
                    alteracao: false,
                    preco: null,
                });
                closeModal(true);
                return console.log(error);
            }
        }

        const chavesIniciais = ingredientesIniciais.map(objeto => objeto.codigo);
        const chavesFinais = ingredientes.map(objeto => objeto.codigo);
        const ingredientesAdd = chavesFinais.filter((ingrediente) => {
            if(!chavesIniciais.includes(ingrediente)) {
                return ingrediente
            }
        });
        const ingredientesDel = chavesIniciais.filter((ingrediente) => {
            if(!chavesFinais.includes(ingrediente)) {
                return ingrediente
            }
        });

        if(ingredientesDel.length > 0) {
            try {
                await api.post(
                    `/excluiIngredienteProduto/${editProduto.idproduto}`,
                    {
                        Ingredientes: ingredientesDel,
                    }
                )
            } catch (error) {
                toast.error('Erro ao editar ingredientes do produto.', {
                    autoClose: 3000,
                });
                closeModal(true);
                return console.log(error);
            }
        }
        
        if(ingredientesAdd.length > 0) {
            try {
                await api.post(
                    `/associaIngrediente/${editProduto.idproduto}`,
                    {
                        Ingredientes: ingredientesAdd,
                    }
                )
            } catch (error) {
                toast.error('Erro ao editar ingredientes do produto.', {
                    autoClose: 3000,
                });
                closeModal(true);
                return console.log(error);
            }
        }

        closeModal(true);

        if(!produtoAlterado.alteracao && !precoAlterado.alteracao && !(ingredientesDel.length > 0) && !(ingredientesDel.length > 0)) {
            toast.error('Altere alguma informação para editar o produto', {
                autoClose: 3000,
            });

            return
        }
        
        atualizaTabela(true);
        setProdutoAlterado({
            alteracao: false,
            produto: '',
            codCategoria: 0,
        });
        setPrecoAlterado({
            alteracao: false,
            preco: null,
        });
        toast.success('Produto editado com sucesso com sucesso!', {
            autoClose: 3000,
        });
    }

    return (
        <div>
            <div id="fade" className={isOpen ? '' : 'hide'} onClick={closeModal}></div>
            <div id="modal" className={isOpen ? '' : 'hide'}>
                <button className="btn-fecharModal" onClick={closeModal}><BsXSquareFill /></button>
                <form className="cadastroProduto" onSubmit={putEdicaoProduto}>
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
                        value={form.categoria}
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
                            onClick={() => adicionaIngrediente(index)}
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