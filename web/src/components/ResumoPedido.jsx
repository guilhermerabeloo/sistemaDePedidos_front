import '../components/css/ResumoPedido.css'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { BsPencilSquare, BsBackspace } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import ModalEdicaoItem from './ModalEdicaoItem';
import { toast } from 'react-toastify';

ResumoPedido.propTypes = {
    itemAdicionado: PropTypes.object.isRequired,
};

export function ResumoPedido({ itemAdicionado }) {
    const [ itensPedido, setItensPedido ] = useState([]);
    const [ activeModalEdicaoItem, setActiveModalEdicaoItem ] = useState(false);
    const [ itemParaEdicao, setItemParaEdicao ] = useState({});

    useEffect(() => {
        if (itemAdicionado.quantidade) {
            setItensPedido(prevItensPedido => {
                const updateItens = [...prevItensPedido];
                const novoItem = { ...itemAdicionado, id: uuidv4() };
                updateItens.push(novoItem);
                return updateItens;
            });
        }
    }, [itemAdicionado]);

    const atualizaItem = (item) => {
        const updateItens = [ ...itensPedido ];
        const itensAtualizados = updateItens.map((i) => {
            if(i.id == item.id) {
                return item
            } else {
                return i
            }
        })
        setItensPedido(itensAtualizados);
        setActiveModalEdicaoItem(!activeModalEdicaoItem);
        toast.success('Item editado', {
            autoClose: 2000,
        });
    }

    const deleteItem = (id) => {
        const itens = [ ...itensPedido ];
        const deleteItens = itens.filter((item) => {
            return item.id !== id
        });

        setItensPedido(deleteItens);
    };

    const editaItem = (item) => {
        setItemParaEdicao(item)
    }

    return (
        <div className="resumoPedido">
            <ModalEdicaoItem 
                isOpen={activeModalEdicaoItem}
                closeModal={() => setActiveModalEdicaoItem(!activeModalEdicaoItem)}
                itemEditado={itemParaEdicao}
                atualizacaoDoItem={atualizaItem}
            />
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
                                <th style={{ width: "10%"}}>Qtd</th>
                                <th style={{ width: "60%"}}>Item</th>
                                <th style={{ width: "10%"}}>Valor</th>
                                <th style={{ width: "10%"}}></th>
                                <th style={{ width: "10%"}}></th>
                            </tr>
                            {itensPedido.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.quantidade}</td>
                                        <td>
                                            {`${item.sigla}-${item.option1.sabor}`}
                                            {item.doisSabores && <br />}
                                            {item.doisSabores && `${item.sigla}-${item.option2.sabor}`}
                                        </td>
                                        <td>{item.valor}</td>
                                        <td>
                                            <BsPencilSquare
                                                className="btn-edit"
                                                onClick={() => {
                                                    setActiveModalEdicaoItem(true)
                                                    editaItem(item)
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <BsBackspace
                                                className="btn-delete"
                                                onClick={() => deleteItem(item.id)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
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