import './Produtos.css';
import Modal from './Modal';
import { ModalExclusao } from '../../components/ModalExclusao';

import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BsPlusLg } from "react-icons/bs";
import { BsFunnelFill } from "react-icons/bs";
import { BsBackspace } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";

export default function Produtos() {
    const [produtos, setProdutos] = useState([{idproduto: "", produto: "", idcategoria: "", categoria: "", preco: ""}])
    const [atualizaTabela, setAtualizaTabela] = useState(false)

    useEffect(() => {
        async function getProdutos() {
            try {
                const response = await api.get(
                    '/produtos'
                )

                const data = response.data.data;
                setProdutos(data);
            } catch(error) {
                console.log(error)
            }
        }

        getProdutos()
    }, [atualizaTabela])

    const [options, setOptions] = useState(['', 'Selecione']);

    useEffect(() => {
        async function getIngredientes() {
            try {
                const response = await api.get(
                    '/ingredientes'
                )

                const data = response.data.data;
                const ingredientesOption = data.map((ingrediente) => {
                    return [ingrediente.idingrediente, ingrediente.ingrediente]
                })
                const optionsWithDefault = [["", "Selecione"], ...ingredientesOption]

                setOptions(optionsWithDefault)
            } catch(error) {
                console.log(error)
            }
        }

        getIngredientes()
    }, [])

    const [ optionsCategoria, setOptionsCategoria ] = useState([0, 'Selecione']);

    useEffect(() => {
        async function getCategorias() {
            try {
                const response = await api.get(
                    '/categorias'
                )

                const data = response.data.data;
                const categoriasOptions = data.map((categoria) => {
                    return [categoria.idcategoria, categoria.categoria]
                });

                const optionComPadrao = [[0, 'Selecione'], ...categoriasOptions]

                setOptionsCategoria(optionComPadrao)
            } catch(error) {
                console.log(error)
            }
        }

        getCategorias()

    }, [])
    
    const [ activeModal, setActiveModal ] = useState(false);
    const [ exclusao, setExclusao ] = useState(false);
    const [ idDeleteProduto, setIdDeleteProduto ] = useState(null);

    const handleClickExclusao = (idProduto) => {
        setIdDeleteProduto(idProduto);
        setExclusao(!exclusao);
    }

    return (
        <div id='content'>
        <Modal 
            isOpen={activeModal} 
            atualizaTabela={() => setAtualizaTabela(!atualizaTabela)} 
            options={options} 
            optionsCategoria={optionsCategoria}
            closeModal={() => setActiveModal(!activeModal)}
        />
        <ModalExclusao 
            exclusao={exclusao}
            atualizaTabela={() => setAtualizaTabela(!atualizaTabela)} 
            idProduto={idDeleteProduto}
            closeExclusao={() => setExclusao(!exclusao)}
        />
            <div id="contentProdutos">
                <div className="content-itens" id="infoProdutos">
                    <h3>Produtos</h3>
                    <button className="btn-novo" onClick={() => setActiveModal(true)}><BsPlusLg /> Novo</button>
                    <button className="btn-filter"><span className="filter"><BsFunnelFill /></span></button>
                </div>
                <div className="content-itens" id="tabProdutos">
                    <table>
                        <tbody>
                            <tr>
                                <th>Codigo</th>
                                <th>Produto</th>
                                <th>idCategoria</th>
                                <th>Categoria</th>
                                <th>Valor</th>
                                <th></th>
                            </tr>
                            {produtos.map((produto) => {
                                return (
                                    <tr key={produto.idproduto}>
                                        <td>{produto.idproduto}</td>
                                        <td>{produto.produto}</td>
                                        <td>{produto.idcategoria}</td>
                                        <td>{produto.categoria}</td>
                                        <td>{produto.preco}</td>
                                        <td className="btn-actions">
                                            <BsPencilSquare className="btn-edit"/>
                                            <BsBackspace className="btn-delete" onClick={() => handleClickExclusao(produto.idproduto)}/>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer pauseOnHover={false}/>
        </div>
    )
}
