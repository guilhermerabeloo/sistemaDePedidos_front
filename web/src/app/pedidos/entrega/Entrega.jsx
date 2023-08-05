import './Entrega.css'
import Pizza from '../../../assets/img/CategoriaPizza.png'
import Esfiha from '../../../assets/img/CategoriaEsfiha.png'
import Salgado from '../../../assets/img/CategoriaSalgado.png'
import Pastel from '../../../assets/img/CategoriaPastel.png'
import Coxinha from '../../../assets/img/CategoriaCoxinha.png'
import Bebida from '../../../assets/img/CategoriaBebida.png'

import { FormPizza } from '../../../components/FormPizza'
import { ResumoPedido } from '../../../components/ResumoPedido'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Adicionais } from '../../../components/Adicionais'

import { useState } from 'react'

export default function Entrega() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ subtotal, setSubtotal ] = useState(0);

    const handleChange_subtotal = (valor) => {
        console.log(valor)
        setSubtotal(valor);
    }

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
                        <FormPizza 
                            subtotal={handleChange_subtotal}
                        />
                        <Adicionais 
                            isOpen={isOpen}
                            closeModal={() => setIsOpen(!isOpen)}
                        />
                        <div 
                            className="infoAdicionaisPizza"
                        >
                            <p onClick={() => setIsOpen(true)}>Adicionais no item</p>
                        </div>
                        <div className="observacaoItemPedido">
                            <label htmlFor="observacoes">Observações do pedido:</label><br />
                            <textarea name="observacoes" id="observacoes" ></textarea>
                        </div>
                    </div>
                    <div className="rodapeItemPedido">
                        <div className="subTotalItem">
                            <p className='labelSubtotal'>Sub-total:</p><p className='valorSubtotal'>{subtotal}</p>
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
                <ToastContainer pauseOnHover={false} />
            </div>
        </div>
    )
}