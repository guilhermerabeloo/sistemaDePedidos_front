import './css/Adicionais.css'
import PropTypes from 'prop-types';

import { BsXSquareFill } from "react-icons/bs";
import { api } from '../lib/api';
import { useEffect, useState } from 'react'

Adicionais.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
  };
  

export function Adicionais({ isOpen, closeModal }) {
    const [ radioAdicionais, setRadioAdicionais ] = useState([]);

    useEffect(() => {
        async function getAdicionais() {
          try {
            const response = await api.get("/ingredientes");
    
            const data = response.data.data;
            const adicionais = data.map((adicional) => {
                return adicional.ingrediente
            })

            setRadioAdicionais(adicionais);
          } catch (error) {
            console.log(error);
          }
        }
    
        getAdicionais();
      }, []);

    return (
        <div className="adicionais">
            <div id="fade" className={isOpen ? '' : 'hide'} onClick={closeModal}></div>
            <div id="modal" className={isOpen ? '' : 'hide'}>
                <button className="btn-fecharModal" onClick={closeModal}><BsXSquareFill /></button>
                <div className='labelAdicionais' >
                    <label htmlFor="adicionais">Adicionais:</label>
                </div>
                <div className="adicionaisOptions">
                    {radioAdicionais.map((adicional, index) => {
                        return (
                            <div className="containerRadio" key={index}>
                                <input 
                                    type="checkbox"
                                    className='checkboxAdicional' 
                                    name='adicionais'
                                    id={adicional}
                                />
                                <label className="labelAdicional" htmlFor={adicional}>{adicional}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}