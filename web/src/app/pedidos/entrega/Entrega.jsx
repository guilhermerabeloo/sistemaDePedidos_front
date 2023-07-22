import './Entrega.css'
import Pizza from '../../../assets/img/CategoriaPizza.png'
import Esfiha from '../../../assets/img/CategoriaEsfiha.png'
import Salgado from '../../../assets/img/CategoriaSalgado.png'
import Pastel from '../../../assets/img/CategoriaPastel.png'
import Coxinha from '../../../assets/img/CategoriaCoxinha.png'
import Bebida from '../../../assets/img/CategoriaBebida.png'

import { api } from "../../../lib/api";
import { useEffect, useState } from 'react'
import { FormPizza } from '../../../components/FormPizza'
import { ResumoPedido } from '../../../components/ResumoPedido'

export default function Entrega() {
    const [ radioAdicionais, setRadioAdicionais ] = useState([])

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
        <div id="content">
            <div id="contentEntrega">
                <div className="adicaoItem">
                    <div className="categoriasPedido">
                        <div className="categoria">
                            <img src={Pizza} alt="Pizza" />
                            <p>Pizza</p>
                        </div>
                        <div className="categoria">
                            <img src={Esfiha} alt="Esfiha" />
                            <p>Esfiha</p>
                        </div>
                        <div className="categoria">
                            <img src={Salgado} alt="Salgado" />
                            <p>Salgado</p>
                        </div>
                        <div className="categoria">
                            <img src={Pastel} alt="Pastel" />
                            <p>Pastel</p>
                        </div>
                        <div className="categoria">
                            <img src={Coxinha} alt="Coxinha" />
                            <p>Coxinha</p>
                        </div>
                        <div className="categoria">
                            <img src={Bebida} alt="Bebida" />
                            <p>Bebida</p>
                        </div>
                    </div>
                    <div className="itensPedido">
                        <FormPizza />
                        <div className="adicionais">
                            <label className='labelAdicionais' htmlFor="adicionais">Adicionais:</label>
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
                        <div className="observacaoItemPedido">
                            <p>Adicionar observação no item</p>
                        </div>
                    </div>
                    <div className="rodapeItemPedido">
                        <div className="subTotalItem">
                            <p className='labelSubtotal'>Sub-total:</p><p className='valorSubtotal'>23,00</p>
                        </div>
                        <div className="btnItens">
                            <button className="btnLimpar">
                                Limpar
                            </button>
                            <button className="btnAdicionar">
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
                <ResumoPedido />
            </div>
        </div>
    )
}