import './Entrega.css'

export default function Entrega() {
    return (
        <div id="content">
            <div id="contentEntrega">
                <div className="adicaoItem">
                    <div className="categoriasPedido">
                        a
                    </div>
                    <div className="itensPedido">
                        b
                    </div>
                    <div className="rodapeItemPedido">
                        <div className="subTotalItem">
                            <p>Sub-total............................</p><p>23,00</p>
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
                <div className="resumoPedido">
                    
                </div>
            </div>
        </div>
    )
}