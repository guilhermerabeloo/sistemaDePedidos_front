import './css/ModalEdicaoItem.css'
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { api } from '../lib/api';
import { Adicionais } from './Adicionais';
import { useEffect, useState } from 'react';
import { BsXSquareFill, BsPlusSquare } from "react-icons/bs";

ModalEdicaoItem.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    itemEditado: PropTypes.object,
    atualizacaoDoItem: PropTypes.func,
};

export default function ModalEdicaoItem({ isOpen, closeModal, itemEditado, atualizacaoDoItem }) {
    const [ activeAdicionaisEdit, setActiveAdicionaisEdit ] = useState(false);
    const [ pizzas, setPizzas ] = useState([]);
    const [ bordas, setBordas ] = useState([]);
    const [ doisSaboresEdit, setDoisSaboresEdit ] = useState(false);
    const [ valorUnitarioEdit, setValorUnitarioEdit ] = useState({ option1: 0, option2: 0 });
    const [ adicionaisSelecionados, setAdicionaisSelecionados ] = useState([]);
    const [ optionAdicionaisEdit, setOptionAdicionaisEdit ] = useState('');
    const [ pizzaEdit, setPizzaEdit ] = useState({
        sigla: 'PZZ',
        quantidade: 1,
        tamanho: '',
        borda: { idborda: 1, borda: 'Catupiry', valor: 0.00 },
        doisSabores: false,
        option1: {
            id: 0,
            sabor: '', 
            adicionais: [], 
            valor: 0.00 
        },
        option2: {
            id: 0,
            sabor: '', 
            adicionais: [], 
            valor: 0.00 
        },
        adicionais: [],
        valor: 0.00
    });

    console.log(pizzaEdit)

    useEffect(() => {
        if(itemEditado.quantidade) {
            setPizzaEdit(itemEditado)
            setDoisSaboresEdit(itemEditado.doisSabores)
            atualizaValorUnitarioEdit(itemEditado)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemEditado])

    useEffect(() => {
        async function getBordas() {
          try {
            const response = await api.get("/bordas");
            const data = response.data.data;
            
            setBordas(data);
          } catch (error) {
            console.log(error);
          }
        }
        getBordas();
    }, []);

    useEffect(() => {
        async function getProdutos() {
          try {
            const response = await api.get("/produtos");
            const data = response.data.data;
            const pizza = data.filter((produto) => produto.sigla == 'PZZ');
            const pizzaComDefault = [{idproduto: 0, produto: "Selecione", idcategoria: 0, categoria: "Pizza", sigla: "PZZ"}, ...pizza]
            
            setPizzas(pizzaComDefault);
          } catch (error) {
            console.log(error);
          }
        }
        getProdutos();
    }, []);

    const handleChange_QuantidadeEdit = (event) => {
        const updatePizza = {...pizzaEdit};
        updatePizza.quantidade = event.target.value;
        setPizzaEdit(updatePizza)
    }

    const handleChange_TamanhoEdit = (event) => {
        const updatePizza = {...pizzaEdit};
        updatePizza.tamanho = event.target.value;
        setPizzaEdit(updatePizza)
        atualizaValorUnitarioEdit(updatePizza)
    }

    const handleChange_BordaEdit = (event) => {
        const updatePizza = {...pizzaEdit};
        const idborda = event.target.selectedIndex;
        const borda = event.target.options[idborda].getAttribute('data-borda');
        const valor = event.target.options[idborda].getAttribute('data-valor');

        updatePizza.borda.idborda = idborda;
        updatePizza.borda.borda = borda;
        updatePizza.borda.valor = valor;

        setPizzaEdit(updatePizza)
        atualizaValorUnitarioEdit(updatePizza)
    }

    const handleChange_SaboresEdit = (event) => {
        setDoisSaboresEdit(!doisSaboresEdit)
        
        const isDoisSabores = event.target.value === 'nao' ? false : true;
        if(!isDoisSabores) {
            const sabor2 = document.getElementById('opcao2');
            sabor2.value = 0;
            sabor2.selectedIndex = 'Selecione';

            const updatePizza = {...pizzaEdit}
            updatePizza['option2'] = {
                id: 0,
                sabor: '', 
                adicionais: [], 
                valor: 0.00 
            }
            updatePizza.doisSabores = false;

            if(updatePizza.option1.valor) {
                updatePizza.option1.valor = updatePizza.option1.valor * 2;
            }
            
            setPizzaEdit(updatePizza)
            atualizaValorUnitarioEdit(updatePizza)
        } else {
            const updatePizza = {...pizzaEdit};
            updatePizza.doisSabores = isDoisSabores;

            if(updatePizza.option1.valor) {
                updatePizza.option1.valor = updatePizza.option1.valor / 2;
            }

            setPizzaEdit(updatePizza)
            atualizaValorUnitarioEdit(updatePizza)
        }
    };

    const atualizaValorUnitarioEdit = (updatePizza) => {
        const updateValorUnitario = {...valorUnitarioEdit};
        const pizza1 = updatePizza.option1;
        const pizza2 = updatePizza.option2;
        let valorUnitarioPizza1 = Number(pizza1.valor)
        let valorUnitarioPizza2 = Number(pizza2.valor)

        pizza1.adicionais.forEach((adicional) => {
            valorUnitarioPizza1 += Number(adicional.pizza);
        });
        pizza2.adicionais.forEach((adicional) => {
            valorUnitarioPizza2 += Number(adicional.pizza);
        });

        updateValorUnitario.option1 = valorUnitarioPizza1;
        updateValorUnitario.option2 = valorUnitarioPizza2;

        updatePizza.valor = updateValorUnitario.option1 + updateValorUnitario.option2

        setPizzaEdit(updatePizza)
        setValorUnitarioEdit(updateValorUnitario)
    };

    const handleChange_OpcaoPizza = (option, event) => {
        const option1 = document.getElementById('opcao1Edit');
        const option2 = document.getElementById('opcao2Edit');

        if(event.target.value == 0) {
            const updatePizza = {...pizzaEdit}
            updatePizza[option] = {
                id: 0,
                sabor: '', 
                adicionais: [], 
                valor: 0.00 
            }

            setPizzaEdit(updatePizza)
            atualizaValorUnitarioEdit(updatePizza)
            return
        }

        if(option1.value === option2.value) {
            event.target.value = 0;

            toast.warning('Este sabor já foi selecionado na outra metade', {
                autoClose: 3000,
            });

            if(option === 'option1') {
                option1.selectedIndex = "Selecione";
            } else {
                option2.selectedIndex = "Selecione";
            }
        }

        const updatePizza = {...pizzaEdit};
        const selectedValue = parseInt(event.target.value);
        const selectedOption = Array.from(event.target.options).find((option) => {
            return parseInt(option.value) === selectedValue;
        });

        const idpizza = selectedOption.getAttribute('data-idpizza');
        const sabor = selectedOption.getAttribute('data-pizza');
        const valor = selectedOption.getAttribute('data-valor');

        updatePizza[option].id = idpizza;
        updatePizza[option].sabor = sabor;
        updatePizza[option].valor = doisSaboresEdit ? valor / 2 : valor;

        setPizzaEdit(updatePizza)
        atualizaValorUnitarioEdit(updatePizza)
    };

    const handleChange_SelecionaAdicionais = (adicionais) => {
        const updatePizza = {...pizzaEdit};
        updatePizza[optionAdicionaisEdit].adicionais = adicionais;
        
        setPizzaEdit(updatePizza)
        atualizaValorUnitarioEdit(updatePizza)
    }

    const selecionaAdicionais = (option) => {
        const adicionaisPizza = pizzaEdit[option].adicionais;

        setAdicionaisSelecionados(adicionaisPizza);
    }

    return (
        <>
            <div id="fade" className={isOpen ? '' : 'hide'} onClick={closeModal}></div>
            <div id="modalEdicaoItem" className={isOpen ? '' : 'hide'}>
                <button className="btn-fecharModalEdicaoItem" onClick={closeModal}><BsXSquareFill /></button>
                <div className="cabecalhoItem">
                    <div className="quantidade">
                        <label htmlFor="quantidade">Quantidade</label>
                        <input 
                            type="number" 
                            id="quantidade"
                            value={pizzaEdit.quantidade}
                            onChange={event => handleChange_QuantidadeEdit(event)}
                        />
                    </div>
                    <div className="tamanho">
                        <label htmlFor="tamanho">Tamanho</label>
                        <select 
                            name="tamanho" 
                            id="tamanho"
                            onChange={event => handleChange_TamanhoEdit(event)}
                        >
                            <option value="g">Grande</option>
                            <option value="p">Pequena</option>
                        </select>
                    </div>
                    <div className="borda">
                        <label htmlFor="borda">Borda</label>
                        <select 
                            name="borda" 
                            id="borda"
                            value={pizzaEdit.borda.borda}
                            onChange={(event) => handleChange_BordaEdit(event)}
                        >
                            {bordas.map((borda) => {
                                return (
                                    <option 
                                        key={borda.idborda} 
                                        data-idborda={borda.idborda}
                                        data-borda={borda.borda}
                                        data-valor={borda.valor}
                                    >
                                        {borda.borda}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="saboresPizza">
                    <table className='tabSabores'>
                        <tbody>
                            <tr>
                                <td style={{ width: "20%" }}>2 Sabores?</td>
                                <td style={{ width: "40%" }}>Opção 1</td>
                                <td style={{ width: "20%" }}></td>
                                <td style={{ width: "20%", textAlign: "right" }}>Valor unitário</td>
                            </tr>
                            <tr>
                                <td>
                                    <select 
                                        name="sabores" 
                                        id="sabores"
                                        value={pizzaEdit.doisSabores ? 'sim' : 'nao'}
                                        onChange={(event) => handleChange_SaboresEdit(event)}
                                    >
                                        <option value="nao">Não</option>
                                        <option value="sim">Sim</option>
                                    </select>
                                </td>
                                <td>
                                    <select 
                                        name="opcao1Edit" 
                                        id="opcao1Edit"
                                        value={pizzaEdit.option1.id}
                                        onChange={(event) => handleChange_OpcaoPizza("option1", event)}
                                    >
                                        {pizzas.map((pizza) => {
                                            return (
                                                <option 
                                                    key={pizza.idproduto} 
                                                    value={pizza.idproduto}
                                                    data-idpizza={pizza.idproduto}
                                                    data-pizza={pizza.produto}
                                                    data-sigla={pizza.sigla}
                                                    data-valor={pizza.preco}
                                                >
                                                    {pizza.produto}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </td>
                                <td 
                                    style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                                    onClick={() => {
                                        setActiveAdicionaisEdit(true)
                                        setOptionAdicionaisEdit('option1')
                                        selecionaAdicionais('option1')
                                    }}
                                >
                                    Adicionais
                                </td>
                                <td style={{ textAlign: "right" }} value={valorUnitarioEdit.option1}>
                                    {valorUnitarioEdit.option1}
                                </td>
                            </tr>
                            <tr className={doisSaboresEdit ? 'opcao2Edit' : 'opcao2Edit hide'}>
                                <td></td>
                                <td>Opção 2</td>
                            </tr>
                            <tr className={doisSaboresEdit ? 'opcao2Edit' : 'opcao2Edit hide'}>
                                <td></td>
                                <td>
                                    <select 
                                        name="opcao2Edit" 
                                        id="opcao2Edit"
                                        value={pizzaEdit.option2.id}
                                        onChange={(event) => handleChange_OpcaoPizza("option2", event)}
                                    >
                                        {pizzas.map((pizza) => {
                                            return (
                                                <option 
                                                    key={pizza.idproduto} 
                                                    value={pizza.idproduto}
                                                    data-idpizza={pizza.idproduto}
                                                    data-pizza={pizza.produto}
                                                    data-sigla={pizza.sigla}
                                                    data-valor={pizza.preco}
                                                >
                                                {pizza.produto}
                                            </option>
                                            )
                                        })}
                                    </select>
                                </td>
                                <td 
                                    style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                                    onClick={() => {
                                        setActiveAdicionaisEdit(true)
                                        setOptionAdicionaisEdit('option2')
                                        selecionaAdicionais('option2')
                                    }}
                                >
                                    Adicionais
                                </td>
                                <td style={{ textAlign: "right" }} value={valorUnitarioEdit.option2}>
                                    {valorUnitarioEdit.option2}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Adicionais 
                    isOpen={activeAdicionaisEdit}
                    closeModal={() => setActiveAdicionaisEdit(!activeAdicionaisEdit)}
                    selecaoDeAdicionais={handleChange_SelecionaAdicionais}
                    adicionaisPadrao={adicionaisSelecionados}
                />
                <div 
                    className="infoAdicionaisPizza"
                >
                    <p onClick={() => setActiveAdicionaisEdit(!activeAdicionaisEdit)}>Adicionais no item</p>
                </div>
                <div className="observacaoItemPedido">
                    <label htmlFor="observacoes">Observações do pedido:</label><br />
                    <textarea name="observacoes" id="observacoes" ></textarea>
                </div>
                <button 
                    type="submit" 
                    className="btn-salvar"
                    onClick={() => atualizacaoDoItem(pizzaEdit)}
                >
                    <BsPlusSquare /> Salvar
                </button>
            </div>
        </>
    )
}