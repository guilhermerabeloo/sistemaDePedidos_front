import '../components/css/FormPizza.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';
import { Adicionais } from './Adicionais';

FormPizza.propTypes = {
    subtotal: PropTypes.func.isRequired,
    pizzaAdd: PropTypes.func,
    limpaItem: PropTypes.bool.isRequired,
    setLimpaItem: PropTypes.func,
};

export function FormPizza ({ subtotal, pizzaAdd, limpaItem, setLimpaItem }) {
    const [ pizzas, setPizzas ] = useState([]);
    const [ bordas, setBordas ] = useState([]);
    const [ doisSabores, setDoisSabores ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ optionAdicionais, setOptionAdicionais ] = useState('')
    const [ adicionaisSelecionados, setAdicionaisSelecionados ] = useState([])
    const [ pizza, setPizza ] = useState({
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
    const [ valorUnitario, setValorUnitario ] = useState({ option1: 0, option2: 0 });

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
        if(limpaItem) {
            setPizza({
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

            setValorUnitario({ option1: 0, option2: 0 });
            subtotal(0);
            setDoisSabores(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limpaItem]);

    const atualizaValorUnitario = (updatePizza) => {
        const updateValorUnitario = {...valorUnitario};
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

        setPizza(updatePizza)
        setValorUnitario(updateValorUnitario)
        subtotal(updateValorUnitario.option1 + updateValorUnitario.option2)
        pizzaAdd(updatePizza)
        setLimpaItem(false)
    }

    const handleChange_Sabores = (event) => {
        setLimpaItem(false)
        setDoisSabores(!doisSabores)
        
        const isDoisSabores = event.target.value === 'nao' ? false : true;
        if(!isDoisSabores) {
            const sabor2 = document.getElementById('opcao2');
            sabor2.value = 0;
            sabor2.selectedIndex = 'Selecione';

            const updatePizza = {...pizza}
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
            
            setPizza(updatePizza)
            atualizaValorUnitario(updatePizza)
        } else {
            const updatePizza = {...pizza};
            updatePizza.doisSabores = isDoisSabores;

            if(updatePizza.option1.valor) {
                updatePizza.option1.valor = updatePizza.option1.valor / 2;
            }

            setPizza(updatePizza)
            atualizaValorUnitario(updatePizza)
        }

    };

    const handleChange_OpcaoPizza = (option, event) => {
        const option1 = document.getElementById('opcao1');
        const option2 = document.getElementById('opcao2');

        if(event.target.value == 0) {
            const updatePizza = {...pizza}
            updatePizza[option] = {
                id: 0,
                sabor: '', 
                adicionais: [], 
                valor: 0.00 
            }

            setPizza(updatePizza)
            atualizaValorUnitario(updatePizza)
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

        const updatePizza = {...pizza};
        const selectedValue = parseInt(event.target.value);
        const selectedOption = Array.from(event.target.options).find((option) => {
            return parseInt(option.value) === selectedValue;
        });

        const idpizza = selectedOption.getAttribute('data-idpizza');
        const sabor = selectedOption.getAttribute('data-pizza');
        const valor = selectedOption.getAttribute('data-valor');

        updatePizza[option].id = idpizza;
        updatePizza[option].sabor = sabor;
        updatePizza[option].valor = doisSabores ? valor / 2 : valor;

        setPizza(updatePizza)
        atualizaValorUnitario(updatePizza)
    };

    const handleChange_Quantidade = (event) => {
        const updatePizza = {...pizza};
        updatePizza.quantidade = event.target.value;
        setPizza(updatePizza)
        atualizaValorUnitario(updatePizza)
        setLimpaItem(false)
    }

    const handleChange_Tamanho = (event) => {
        const updatePizza = {...pizza};
        updatePizza.tamanho = event.target.value;
        setPizza(updatePizza)
        atualizaValorUnitario(updatePizza)
        setLimpaItem(false)
    }

    const handleChange_Borda = (event) => {
        const updatePizza = {...pizza};
        const idborda = event.target.selectedIndex;
        const borda = event.target.options[idborda].getAttribute('data-borda');
        const valor = event.target.options[idborda].getAttribute('data-valor');

        updatePizza.borda.idborda = idborda;
        updatePizza.borda.borda = borda;
        updatePizza.borda.valor = valor;

        setPizza(updatePizza)
        atualizaValorUnitario(updatePizza)
        setLimpaItem(false)
    }

    const handleChange_SelecionaAdicionais = (adicionais) => {
        const updatePizza = {...pizza};
        updatePizza[optionAdicionais].adicionais = adicionais;
        
        setPizza(updatePizza)
        atualizaValorUnitario(updatePizza)
        setLimpaItem(false)
    }

    const selecionaAdicionais = (option) => {
        const adicionaisPizza = pizza[option].adicionais;

        setAdicionaisSelecionados(adicionaisPizza);
        setLimpaItem(false)
    }

    return (
        <div className="containerPizza">
            <Adicionais 
                isOpen={isOpen}
                closeModal={() => setIsOpen(!isOpen)}
                selecaoDeAdicionais={handleChange_SelecionaAdicionais}
                adicionaisPadrao={adicionaisSelecionados}
            />
            <div className="cabecalhoItem">
                <div className="quantidade">
                    <label htmlFor="quantidade">Quantidade</label>
                    <input 
                        type="number" 
                        id="quantidade"
                        value={pizza.quantidade}
                        onChange={event => handleChange_Quantidade(event)}
                    />
                </div>
                <div className="tamanho">
                    <label htmlFor="tamanho">Tamanho</label>
                    <select 
                        name="tamanho" 
                        id="tamanho"
                        onChange={event => handleChange_Tamanho(event)}
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
                        value={pizza.borda.borda}
                        onChange={(event) => handleChange_Borda(event)}
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
                                    onChange={(event) => handleChange_Sabores(event)}
                                    value={pizza.doisSabores ? 'sim' : 'nao'}
                                >
                                    <option value="nao">Não</option>
                                    <option value="sim">Sim</option>
                                </select>
                            </td>
                            <td>
                                <select 
                                    name="opcao1" 
                                    id="opcao1"
                                    onChange={(event) => handleChange_OpcaoPizza("option1", event)}
                                    value={pizza.option1.id}
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
                                    setIsOpen(true)
                                    setOptionAdicionais('option1')
                                    selecionaAdicionais('option1')
                                }}
                            >
                                Adicionais
                            </td>
                            <td style={{ textAlign: "right" }} value={valorUnitario.option1}>
                                {valorUnitario.option1}
                            </td>
                        </tr>
                        <tr className={doisSabores ? 'opcao2' : 'opcao2 hide'}>
                            <td></td>
                            <td>Opção 2</td>
                        </tr>
                        <tr className={doisSabores ? 'opcao2' : 'opcao2 hide'}>
                            <td></td>
                            <td>
                                <select 
                                    name="opcao2" 
                                    id="opcao2"
                                    onChange={(event) => handleChange_OpcaoPizza("option2", event)}
                                    value={pizza.option2.id}
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
                                    setIsOpen(true)
                                    setOptionAdicionais('option2')
                                    selecionaAdicionais('option2')
                                }}
                            >
                                Adicionais
                            </td>
                            <td style={{ textAlign: "right" }} value={valorUnitario.option2}>
                                {valorUnitario.option2}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}