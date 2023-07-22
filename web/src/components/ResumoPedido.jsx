import '../components/css/ResumoPedido.css'
import { BsPencilSquare } from "react-icons/bs";

export function ResumoPedido() {
    return (
        <div className="resumoPedido">
            <div className="clientePedido">
                <div className="dadosEntrega">
                    <p className='nomeClienteEntrega'>Guilherme Rabelo</p>
                    <p className='enderecoEntrega'>Rua Antônio Reis, 313 - Casa A - Sitio São João</p>
                    <p className='telefoneEntraga'>(85) 99617-6349</p>
                </div>
                <div className="edicaoDadosEntraga">
                    <button className="editDadosEntrega">
                        <BsPencilSquare className='iconEditDadosEntrega'/>  
                    </button>
                </div>
            </div>
            <div className="itensResumoPedido">
                <div className="divTabItens">
                    <table className='tabItensPedido'>
                        <tbody>
                            <tr>
                                <th style={{ width: "13%"}}>Qtd</th>
                                <th style={{ width: "70%"}}>Item</th>
                                <th style={{ width: "17%"}}>Valor</th>
                            </tr>
                            <tr>
                                <td>1x</td>
                                <td>PIZ-Portuguesa</td>
                                <td>25,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="taxaDeEntrega">
                    <label htmlFor="taxaEntrega">Taxa de Entrega</label>
                    <input type="number" />
                </div>
            </div>   
            <div className="totalPedido">
                <div className="infoTotal">
                    <div className="valorTotalPedido">
                        <p className='labelTotal'>Total</p>
                        <p className='valorTotal'>55,00</p>
                    </div>
                    <p className='formaPagamentoPedido'>Cartão de crédito</p>
                    <p className='observacaoPedido'>Adicionar observação no pedido</p>
                </div>
                <div className="botoesControle">
                    <button className="btnCancelar">Cancelar</button>
                    <button className="btnConfirmar">Confirmar</button>
                </div>
            </div>
        </div>
    )
}