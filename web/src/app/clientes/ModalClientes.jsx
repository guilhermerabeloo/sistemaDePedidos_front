import './ModalClientes.css'
import PropTypes from 'prop-types';

import { BsXSquareFill, BsPlusSquare } from "react-icons/bs";

ModalClientes.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
}

export default function ModalClientes({ isOpen, closeModal }) {
    return (
        <div>
            <div id="fade" className={isOpen ? '' : 'hide'} onClick={closeModal}></div>
            <div id="modalCliente" className={isOpen ? '' : 'hide'}>
                <button className="btn-fecharModal" onClick={closeModal}><BsXSquareFill /></button>
                <form action="submit">
                    <div className="colunasForm">
                        <div className="coluna1">
                            <label htmlFor="cliente">Cliente</label>
                            <input 
                                type="text"
                                name="cliente"
                                placeholder="Ex: Francisco Silva..."
                            />
                            <label htmlFor="dataDeNascimento">Data de nascimento</label>
                            <input 
                                type="date"
                                name="dataDeNascimento"
                            />
                            <label htmlFor="endereco">Endereco</label>
                            <input 
                                type="text"
                                name="endereco"
                                placeholder="Ex: Francisco Silva..."
                            />
                        </div>
                        <div className="coluna2">
                            <label htmlFor="numero">Número</label>
                            <input 
                                type="number"
                                name="numero"
                            />
                            <label htmlFor="complemento">Complemento</label>
                            <input 
                                type="text"
                                name="complemento"
                                placeholder="Ex: Francisco Silva..."
                            />
                            <label htmlFor="bairro">Bairro</label>
                            <select
                                name="bairro"
                            >
                                <option value="Selecione">Selecione</option>
                            </select>
                        </div>
                    </div>
                    <div className="pontoReferencia">
                        <label htmlFor="pontoDeReferencia">Ponto de referência</label>
                        <input 
                            type="text"
                            name="pontoDeReferencia"
                            placeholder="Ex: Francisco Silva..."
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
                                />
                                <label htmlFor="feminino">Feminino</label>
                            </div>
                            <div className="optionMasculino">
                                <input 
                                    type="radio" 
                                    name="sexo"                
                                    id="masculino"    
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