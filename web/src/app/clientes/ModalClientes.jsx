import './ModalClientes.css'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { toast } from 'react-toastify';

import { BsXSquareFill, BsPlusSquare } from "react-icons/bs";

ModalClientes.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    atualizaTabela: PropTypes.func.isRequired,
}

export default function ModalClientes({ isOpen, closeModal, atualizaTabela }) {
    const [ bairros, setBairros ] = useState([]);
    const [ form, setForm ] = useState({
        cliente: '',
        telefone: '',
        dataDeNascimento: '',
        endereco: '',
        numero: '',
        complemento: '',
        idBairro: 0,
        pontoDeReferencia: '',
        sexo: '',
    });

    
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
            }
        });
    };

    const onChangeSexo = (event) => {
        const formAtualizado = { ...form };
        formAtualizado.sexo = event.target.value;

        setForm(formAtualizado);
    };

    const postCliente = async (event) => {
        event.preventDefault()

        try {
            await api.post(
                `/cadastraCliente`,
                {
                    Cliente: form.cliente,
                    Telefone: form.telefone,
                    Endereco: form.endereco,
                    Numero: form.numero,
                    IdBairro: form.idBairro,
                    Complemento: form.complemento,
                    PontoDeReferencia: form.pontoDeReferencia,
                    Sexo: form.sexo,
                    DtNascimento: form.dataDeNascimento,
                }
            );
            closeModal(true);
            atualizaTabela(true);
            setForm({ 
                cliente: '',
                telefone: '',
                dataDeNascimento: '',
                endereco: '',
                numero: '',
                complemento: '',
                idBairro: 0,
                pontoDeReferencia: '',
                sexo: '', 
            });

            const selectBairros = document.getElementsByClassName('selectBairro')[0];
            selectBairros.selectedIndex = 'Selecione';
            
            toast.success('Cliente cadastrado com sucesso!', {
                autoClose: 3000,
            });
        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar o cliente.', {
                autoClose: 3000,
            });
        }
    }

    return (
        <div>
            <div id="fade" className={isOpen ? '' : 'hide'} onClick={closeModal}></div>
            <div id="modalCliente" className={isOpen ? '' : 'hide'}>
                <button className="btn-fecharModal" onClick={closeModal}><BsXSquareFill /></button>
                <form onSubmit={postCliente}>
                    <div className="nomeCliente">
                            <label htmlFor="cliente">Cliente</label>
                            <input 
                                type="text"
                                name="cliente"
                                placeholder="Ex: Francisco Silva..."
                                value={form.cliente}
                                onChange={onChangeCliente}
                            />
                    </div>
                    <div className="colunasForm">
                        <div className="coluna1">
                            <label htmlFor="telefone">Telefone</label>
                            <input 
                                type="text"
                                name="telefone"
                                value={form.telefone}
                                onChange={onChangeCliente}
                            />
                            <label htmlFor="endereco">Endereco</label>
                            <input 
                                type="text"
                                name="endereco"
                                placeholder="Ex: Francisco Silva..."
                                value={form.endereco}
                                onChange={onChangeCliente}
                            />
                            <label htmlFor="bairro">Bairro</label>
                            <select
                                name="bairro"
                                className='selectBairro'
                                value={form.bairro}
                                onChange={onChangeBairro}
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
                                value={form.dataDeNascimento}
                                onChange={onChangeCliente}
                            />
                            <label htmlFor="numero">Número</label>
                            <input 
                                type="number"
                                name="numero"
                                value={form.numero}
                                onChange={onChangeCliente}
                            />
                            <label htmlFor="complemento">Complemento</label>
                            <input 
                                type="text"
                                name="complemento"
                                placeholder="Ex: Francisco Silva..."
                                value={form.complemento}
                                onChange={onChangeCliente}
                            />
                        </div>
                    </div>
                    <div className="pontoReferencia">
                        <label htmlFor="pontoDeReferencia">Ponto de referência</label>
                        <input 
                            type="text"
                            name="pontoDeReferencia"
                            placeholder="Ex: Francisco Silva..."
                            value={form.pontoDeReferencia}
                            onChange={onChangeCliente}
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
                                    checked={form.sexo == 'F'}
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
                                    checked={form.sexo == 'M'}
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