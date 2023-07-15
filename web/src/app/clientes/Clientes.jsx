import './Clientes.css'
import ModalClientes from './ModalClientes.jsx';
import ModalEdicaoClientes from './ModalEdicaoClientes';
import ModalExclusaoCliente from './ModalExclusaoCliente';
import { Paginacao } from '../../components/Paginacao';
import { api } from '../../lib/api';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';

import { BsPlusLg, BsPencilSquare, BsFunnelFill, BsBackspace } from "react-icons/bs";

export default function Clientes() {
    const [ atualizaTabela, setAtualizaTabela ] = useState(false);
    const [ activeModalNovo, setActiveModalNovo ] = useState(false);
    const [ activeModalEdicao, setActiveModalEdicao ] = useState(false);
    const [ activeModalExclusao, setActiveModalExclusao ] = useState(false);
    const [ idDeleteCliente, setIdDeleteCliente ] = useState(0);
    const [ paginaAtual, setPaginaAtual ] = useState(1);
    const [ quantidadeDePaginas, setQuantidadeDePaginas ] = useState(1);
    const [ clientes, setClientes ] = useState([{
        idcliente: 0,
        cliente: '',
        telefone: '',
        endereco: '',
        numero: 0,
        complemento: '',
        idbairro: 0,
        bairro: '',
        pontoDeReferencia: '',
        sexo: '',
        dtnascimento: '',
        dtcadastro: ''
    }]);

    const [ editCliente, setEditCliente ] = useState({
        idcliente: 0,
        cliente: '',
        telefone: '',
        endereco: '',
        numero: 0,
        complemento: '',
        idbairro: 0,
        bairro: '',
        pontoDeReferencia: '',
        sexo: '',
        dtnascimento: '',
        dtcadastro: ''
    });

    useEffect(() => {
        async function getClientes() {
            try {
                const response = await api.get(
                    `/clientes`
                )
                const data = response.data.data
        
                const indiceInicio = (paginaAtual - 1) * 10;
                const indiceFinal = indiceInicio + 10;
                const produtosPaginaAtual = data.slice(indiceInicio, indiceFinal);

                const contagemDePaginas = Math.ceil(data.length / 10);

                setQuantidadeDePaginas(contagemDePaginas)
                setClientes(produtosPaginaAtual)
            } catch(error) {
                console.log(error)
            }
        }
    
        getClientes()
    }, [atualizaTabela])

    const handleClickEdicao = (clienteEdit) => {
        setEditCliente({
            idcliente: clienteEdit.idcliente,
            cliente: clienteEdit.cliente,
            telefone: clienteEdit.telefone,
            endereco: clienteEdit.endereco,
            numero: clienteEdit.numero,
            complemento: clienteEdit.complemento,
            idbairro: clienteEdit.idbairro,
            bairro: clienteEdit.bairro,
            pontoDeReferencia: clienteEdit.pontodereferencia,
            sexo: clienteEdit.sexo,
            dtnascimento: clienteEdit.dtnascimento,
            dtcadastro: clienteEdit.datacadastro
        })
        setActiveModalEdicao(true)
    };

    const handleClickExclusao = (id) => {
        setIdDeleteCliente(id);
        setActiveModalExclusao(true);
    };

    return (
        <div id="content">
            <div>
                <Helmet>
                    <title>Clientes</title>
                </Helmet>
            </div>
            <ModalClientes 
                isOpen={activeModalNovo}
                atualizaTabela={() => setAtualizaTabela(!atualizaTabela)}
                closeModal={() => setActiveModalNovo(!activeModalNovo)}
            />
            <ModalEdicaoClientes 
                isOpen={activeModalEdicao}
                atualizaTabela={() => setAtualizaTabela(!atualizaTabela)}
                closeModal={() => setActiveModalEdicao(!activeModalEdicao)}
                editCliente={editCliente}            
            />
            <ModalExclusaoCliente
                isOpen={activeModalExclusao}
                atualizaTabela={() => setAtualizaTabela(!atualizaTabela)}
                idDeleteCliente={idDeleteCliente}
                closeModal={() => setActiveModalExclusao(!activeModalExclusao)}
            />
            <div id="contentClientes">
                <div className="content-itens" id="infoClientes">
                    <h3>Clientes</h3>
                    <button className="btn-novo" onClick={() => setActiveModalNovo(true)}><BsPlusLg /> Novo</button>
                    <button className="btn-filter"><span className="filter"><BsFunnelFill /></span></button>
                </div>
                <div className="content-itens" id="tabClientes">
                    <table>
                        <tbody>
                            <tr>
                                <th style={{width:  "6%"}}>Código</th>
                                <th style={{width: "23%"}}>Nome</th>
                                <th style={{width: "12%"}}>Telefone</th>
                                <th style={{width: "16%"}}>Endereço</th>
                                <th style={{width:  "8%"}}>Número</th>
                                <th style={{width: "15%"}}>Bairro</th>
                                <th style={{width: "10%"}}>Nascimento</th>
                                <th style={{display: "none"}}>Complemento</th>
                                <th style={{display: "none"}}>idBairro</th>
                                <th style={{display: "none"}}>Ponto De Referência</th>
                                <th style={{display: "none"}}>Sexo</th>
                                <th style={{display: "none"}}>Cadastro</th>
                                <th style={{width: "7%"}}></th>
                            </tr>
                            {clientes.map((cliente) => {
                                return (
                                    <tr key={cliente.idcliente}>
                                        <td>{cliente.idcliente}</td>
                                        <td>{cliente.cliente}</td>
                                        <td>{cliente.telefone}</td>
                                        <td>{cliente.endereco}</td>
                                        <td>{cliente.numero}</td>
                                        <td>{cliente.bairro}</td>
                                        <td>{cliente.dtnascimento}</td>
                                        <td style={{display: "none"}}>{cliente.complemento}</td>
                                        <td style={{display: "none"}}>{cliente.idbairro}</td>
                                        <td style={{display: "none"}}>{cliente.pontoDeReferencia}</td>
                                        <td style={{display: "none"}}>{cliente.sexo === 'F' ? 'Feminino' : 'Masculino'}</td>
                                        <td style={{display: "none"}}>{cliente.dtcadastro}</td>
                                        <td className="btn-actions">
                                            <BsPencilSquare
                                                className="btn-edit"
                                                onClick={() => handleClickEdicao(cliente)}
                                            />
                                            <BsBackspace
                                                className="btn-delete"
                                                onClick={() => handleClickExclusao(cliente.idcliente)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Paginacao
                    paginaAtual={paginaAtual}    
                    setPaginaAtual={setPaginaAtual}
                    quantidadeDePaginas={quantidadeDePaginas}
                    setQuantidadeDePaginas={setQuantidadeDePaginas}
                />
            </div>
            <ToastContainer pauseOnHover={false}/>
        </div>
    )
}