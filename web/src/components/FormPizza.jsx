import '../components/css/FormPizza.css';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';
import { Adicionais } from './Adicionais';

export function FormPizza () {
    const [ pizzas, setPizzas ] = useState([]);
    const [ bordas, setBordas ] = useState([]);
    const [ doisSabores, setDoisSabores ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ optionAdicionais, setOptionAdicionais ] = useState('')
    const [ adicionaisSelecionados, setAdicionaisSelecionados ] = useState([])
    const [ pizza, setPizza ] = useState({
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

    const handleChange_Sabores = (event) => {
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

            if(updatePizza.option1.valor) {
                updatePizza.option1.valor = updatePizza.option1.valor * 2;
            }

            setPizza(updatePizza)
        } else {
            const updatePizza = {...pizza};
            updatePizza.doisSabores = isDoisSabores;

            if(updatePizza.option1.valor) {
                updatePizza.option1.valor = updatePizza.option1.valor / 2;
            }
            setPizza(updatePizza)
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
        const idpizza = event.target.selectedIndex;
        const sabor = event.target.options[idpizza].getAttribute('data-pizza');
        const valor = event.target.options[idpizza].getAttribute('data-valor');

        updatePizza[option].id = idpizza;
        updatePizza[option].sabor = sabor;
        updatePizza[option].valor = doisSabores ? valor / 2 : valor;


        setPizza(updatePizza)
    };

    const handleChange_Quantidade = (event) => {
        const updatePizza = {...pizza};
        updatePizza.quantidade = event.target.value;
        setPizza(updatePizza)
    }

    const handleChange_Tamanho = (event) => {
        const updatePizza = {...pizza};
        updatePizza.tamanho = event.target.value;
        setPizza(updatePizza)
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
    }

    const handleChange_SelecionaAdicionais = (adicionais) => {
        const updatePizza = {...pizza};
        updatePizza[optionAdicionais].adicionais = adicionais;
        
        setPizza(updatePizza)
    }

    const selecionaAdicionais = (option) => {
        const adicionaisPizza = pizza[option].adicionais;

        setAdicionaisSelecionados(adicionaisPizza);
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
                        <td style={{ textAlign: "right" }}>
                            {pizza.option1.valor}
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
                        <td style={{ textAlign: "right" }}>
                            {pizza.option2.valor}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}