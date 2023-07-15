import './ModalClientes.css'
import PropTypes from 'prop-types';
import { api } from '../../lib/api';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { BsPlusSquare, BsXSquareFill } from "react-icons/bs";

ModalEdicaoClientes.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    atualizaTabela: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    editCliente: PropTypes.shape({
        idcliente: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
        cliente: PropTypes.string,
        telefone: PropTypes.string,
        endereco: PropTypes.string,
        numero: PropTypes.string,
        complemento: PropTypes.string,
        idbairro: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
        bairro: PropTypes.string,
        pontoDeReferencia: PropTypes.string,
        sexo: PropTypes.string,
        dtnascimento: PropTypes.string,
        datacadastro: PropTypes.string
    }),
};

export default function ModalEdicaoClientes({ isOpen, atualizaTabela, closeModal, editCliente }) {
    const [ bairros, setBairros ] = useState([]);
    const [ form, setForm ] = useState({
        idCliente: 0,
        cliente: '',
        telefone: '',
        dataDeNascimento: '',
        endereco: '',
        numero: '',
        complemento: '',
        idBairro: 0,
        bairro: '',
        pontoDeReferencia: '',
        sexo: '',
    });

    console.log(editCliente)

    useEffect(() => {
        async function getBairros() {
            try {
                const response = await api.get(
                    '/bairros'
                    )
    
                const data = response.data.data;
                const bairros = data.map((bairro) => {
                    return [bairro.idbairro, bairro.bairro, bairro.taxaentrega]
                })

                const bairrosComDefault = [
                    [0, "Selecione", '0.00'],
                    ...bairros
                ];
                setBairros(bairrosComDefault);
            } catch(error) {
                console.log(error);
            }
        }
        
        getBairros();
    }, []);

    useEffect(() => {
        setForm({
            idCliente: editCliente.idcliente,
            cliente: editCliente.cliente,
            telefone: editCliente.telefone,
            dataDeNascimento: editCliente.dtnascimento,
            endereco: editCliente.endereco,
            numero: editCliente.numero,
            complemento: editCliente.complemento,
            idBairro: editCliente.idbairro,
            bairro: editCliente.bairro,
            pontoDeReferencia: editCliente.pontoDeReferencia,
            sexo: editCliente.sexo,
        })
    }, [editCliente])

    const onChangeCliente = (event) => {
        const { name, value} = event.target;

        setForm((formAntigo) => {
            const formAtualizado = { ...formAntigo }
            formAtualizado[name] = value;

            return formAtualizado
        });
    };

    const onChangeBairro = (event) => {
        bairros.forEach((bairro) => {
            if(bairro[1] === event.target.value) {
                const formAtualizado = { ...form };
                formAtualizado.idBairro = bairro[0]

                setForm(formAtualizado)
            };
        });
    };

    const onChangeSexo = (event) => {
        const formAtualizado = { ...form };
        formAtualizado.sexo = event.target.value;

        setForm(formAtualizado);
    };
    
    const putCliente = async (event) => {
        event.preventDefault();

        try {
            await api.put(
                `/alteraCliente/${form.idCliente}`,
                {
                    Cliente: form.cliente,
                    Telefone: form.telefone,
                    DtNascimento: form.dataDeNascimento,
                    Endereco: form.endereco,
                    Numero: form.numero,
                    IdBairro: form.idBairro,
                    Complemento: form.complemento,
                    PontoDeReferencia: form.pontoDeReferencia,
                    Sexo: form.sexo,
                }
            );

            closeModal(true);
            atualizaTabela(true);

            toast.success('Cliente editado com sucesso!', {
                autoClose: 3000,
            });
        } catch (error) {
            console.log(error);
            toast.error('Erro ao editar o cadastro do cliente.', {
                autoClose: 3000,
            });
        }
    }

    return (
        <div>
            <div id="fade" className={isOpen ? '' : 'hide'} onClick={closeModal}></div>
            <div id="modalCliente" className={isOpen ? '' : 'hide'}>
                <button className="btn-fecharModal" onClick={closeModal}><BsXSquareFill /></button>
                <form onSubmit={putCliente}>
                    <div className="nomeCliente">
                            <label htmlFor="cliente">Cliente</label>
                            <input 
                                type="text"
                                name="cliente"
                                placeholder="Ex: Francisco Silva..."
                                onChange={onChangeCliente}
                                value={form.cliente}
                            />
                    </div>
                    <div className="colunasForm">
                        <div className="coluna1">
                            <label htmlFor="telefone">Telefone</label>
                            <input 
                                type="text"
                                name="telefone"
                                onChange={onChangeCliente}
                                value={form.telefone}
                            />
                            <label htmlFor="endereco">Endereco</label>
                            <input 
                                type="text"
                                name="endereco"
                                placeholder="Ex: Francisco Silva..."
                                onChange={onChangeCliente}
                                value={form.endereco}
                            />
                            <label htmlFor="bairro">Bairro</label>
                            <select
                                name="bairro"
                                className='selectBairro'
                                onChange={onChangeBairro}
                                value={form.bairro}
                            >
                                {bairros.map((bairro) => (
                                    <option key={bairro[0]} value={bairro[1]}>{bairro[1]}</option>
                                ))}
                            </select>
                        </div>
                        <div className="coluna2">
                            <label htmlFor="dataDeNascimento">Data de nascimento</label>
                            <input 
                                type="date"
                                name="dataDeNascimento"
                                onChange={onChangeCliente}
                                value={form.dataDeNascimento}
                            />
                            <label htmlFor="numero">Número</label>
                            <input 
                                type="number"
                                name="numero"
                                onChange={onChangeCliente}
                                value={form.numero}
                            />
                            <label htmlFor="complemento">Complemento</label>
                            <input 
                                type="text"
                                name="complemento"
                                placeholder="Ex: Francisco Silva..."
                                onChange={onChangeCliente}
                                value={form.complemento}
                            />
                        </div>
                    </div>
                    <div className="pontoReferencia">
                        <label htmlFor="pontoDeReferencia">Ponto de referência</label>
                        <input 
                            type="text"
                            name="pontoDeReferencia"
                            placeholder="Ex: Francisco Silva..."
                            onChange={onChangeCliente}
                            value={form.pontoDeReferencia}
                        />
                    </div>
                    <div className="sexo">
                        <label htmlFor="sexo">Sexo</label>
                        <div className="sexoOptions">
                            <div className="optionFeminino">
                                <input 
                                    type="radio" 
                                    name="sexo"                
                                    id="feminino"
                                    value="F"  
                                    checked={form.sexo === 'F' ? true : false}
                                    onChange={onChangeSexo}  
                                />
                                <label htmlFor="feminino">Feminino</label>
                            </div>
                            <div className="optionMasculino">
                                <input 
                                    type="radio" 
                                    name="sexo"                
                                    id="masculino"
                                    value="M"  
                                    checked={form.sexo === 'M' ? true : false}
                                    onChange={onChangeSexo}  
                                />
                                <label htmlFor="masculino">Masculino</label>
                            </div>
                        </div>
                    </div>
                    <button 
                        type="" 
                        className="btn-salvar"
                    >
                        <BsPlusSquare /> Salvar
                    </button>
                </form>
            </div>
        </div>
    )
}