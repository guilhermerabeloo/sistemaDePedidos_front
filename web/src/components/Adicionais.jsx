import './css/Adicionais.css'
import PropTypes from 'prop-types';

import { api } from '../lib/api';
import { useEffect, useState } from 'react'

Adicionais.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    selecaoDeAdicionais: PropTypes.func,
    adicionaisPadrao: PropTypes.array,
  };

export function Adicionais({ isOpen, closeModal, selecaoDeAdicionais, adicionaisPadrao }) {
    const [ radioAdicionais, setRadioAdicionais ] = useState([]);
    const [ adicionaisSelecionados, setAdicionaisSelecionados ] = useState(adicionaisPadrao || []);

    useEffect(() => {
        console.log("adicionaisSelecionados:", adicionaisSelecionados);
        // Qualquer ação adicional que você precisa realizar com os adicionais selecionados
    }, [adicionaisSelecionados]);

    useEffect(() => {
        setAdicionaisSelecionados(adicionaisPadrao || []);
    }, [adicionaisPadrao]);

    useEffect(() => {
        async function getAdicionais() {
          try {
            const response = await api.get("/adicionais");
            const data = response.data.data;

            setRadioAdicionais(data);
          } catch (error) {
            console.log(error);
          }
        }
    
        getAdicionais();
    }, []);

    const selecionaAdicional = (event) => {
        const updateAdicionais = [...adicionaisSelecionados];
        
        if(event.target.checked) {
            const novoAdicional = {
                idadicional: event.target.getAttribute('data-idadicional'),
                adicional: event.target.getAttribute('data-adicional'),
                pizza: event.target.getAttribute('data-vl_pizza'),
                esfiha: event.target.getAttribute('data-vl_esfiha'),
                beirute: event.target.getAttribute('data-vl_beirute'),
                pastel: event.target.getAttribute('data-vl_pastel'),
                geral: event.target.getAttribute('data-vl_geral'),
            };
            updateAdicionais.push(novoAdicional);

            console.log('update', updateAdicionais)
            setAdicionaisSelecionados(updateAdicionais);
        } else {
            const deleteAdicional = updateAdicionais.filter((adicional) => {
                return adicional.idadicional !== event.target.getAttribute('data-idadicional');
            });

            setAdicionaisSelecionados(deleteAdicional);
        }
    }

    const confirmaSelecaoDeAdicionais = () => {
        console.log(adicionaisSelecionados)
        selecaoDeAdicionais(adicionaisSelecionados)
    }

    return (
        <div className="adicionais">
            <div id="fade" className={isOpen ? '' : 'hide'} onClick={closeModal}></div>
            <div id="modal" className={isOpen ? '' : 'hide'}>
                <div className='labelAdicionais' >
                    <label htmlFor="adicionais">Adicionais:</label>
                </div>
                <div className="adicionaisOptions">
                    {radioAdicionais.map((adicional, index) => {
                        const isChecked = adicionaisSelecionados.some((i) => i.idadicional == adicional.idadicional);

                        return (
                            <div className="containerRadio" key={index}>
                                <input 
                                    type="checkbox"
                                    className='checkboxAdicional' 
                                    name='adicionais'
                                    id={adicional.idadicional}
                                    checked={isChecked}
                                    onChange={(event) => selecionaAdicional(event)}
                                    data-idadicional={adicional.idadicional}
                                    data-adicional={adicional.adicional}
                                    data-vl_pizza={adicional.vl_pizza}
                                    data-vl_esfiha={adicional.vl_esfiha}
                                    data-vl_beirute={adicional.vl_beirute}
                                    data-vl_pastel={adicional.vl_pastel}
                                    data-vl_geral={adicional.vl_geral}
                                />
                                <label className="labelAdicional" htmlFor={adicional.idadicional}>{adicional.adicional}</label>
                            </div>
                        )
                    })}
                </div>
                <div className="botoesControle">
                    <button 
                        className="btnCancelar" 
                        onClick={closeModal}
                    >
                        Cancelar
                    </button>
                    <button 
                        className="btnConfirmar" 
                        onClick={() => {
                            confirmaSelecaoDeAdicionais()
                            closeModal()
                        }}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}