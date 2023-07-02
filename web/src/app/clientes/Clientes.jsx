import './Clientes.css'
import { Paginacao } from '../../components/Paginacao';
import { api } from '../../lib/api';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { BsPlusLg, BsPencilSquare, BsFunnelFill, BsBackspace } from "react-icons/bs";

export default function Clientes() {
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

    useEffect(() => {
        async function getClientes() {
            try {
                const response = await api.get(
                    `/clientes`
                )
                const data = response.data.data
        
                setClientes(data)
            } catch(error) {
                console.log(error)
            }
        }
    
        getClientes()
    }, [])

    return (
        <div id="content">
            <div id="contentClientes">
                <div className="content-itens" id="infoClientes">
                    <h3>Clientes</h3>
                    <button className="btn-novo"><BsPlusLg /> Novo</button>
                    <button className="btn-filter"><span className="filter"><BsFunnelFill /></span></button>
                </div>
                <div className="content-itens" id="tabClientes">
                    <table>
                        <tbody>
                            <tr>
                                <th style={{width:  "6%"}}>Código</th>
                                <th style={{width: "23%"}}>Nome</th>
                                <th style={{width: "12%"}}>Telefone</th>
                                <th style={{width: "16%"}}>Endereco</th>
                                <th style={{width:  "8%"}}>Numero</th>
                                <th style={{width: "15%"}}>Bairro</th>
                                <th style={{width: "10%"}}>Nascimento</th>
                                <th style={{display: "none"}}>Complemento</th>
                                <th style={{display: "none"}}>idBairro</th>
                                <th style={{display: "none"}}>Ponto De Referencia</th>
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
                                            <BsPencilSquare className="btn-edit"/>
                                            <BsBackspace className="btn-delete"/>
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