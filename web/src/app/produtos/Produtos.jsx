import './Produtos.css';
import Modal from './Modal';
import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BsPlusLg } from "react-icons/bs";
import { BsFunnelFill } from "react-icons/bs";

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

    const [options, setOptions] = useState(['', '']);

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
                
                setOptions(ingredientesOption)
            } catch(error) {
                console.log(error)
            }
        }

        getIngredientes()
    }, [])

    const [ activeModal, setActiveModal ] = useState(false);

    return (
        <div id='content'>
        <Modal isOpen={activeModal} atualizaTabela={() => setAtualizaTabela(!atualizaTabela)} options={options} closeModal={() => setActiveModal(!activeModal)}/>
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
                            </tr>
                            {produtos.map((produto) => {
                                return (
                                    <tr key={produto.idproduto}>
                                        <td>{produto.idproduto}</td>
                                        <td>{produto.produto}</td>
                                        <td>{produto.idcategoria}</td>
                                        <td>{produto.categoria}</td>
                                        <td>{produto.preco}</td>
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
