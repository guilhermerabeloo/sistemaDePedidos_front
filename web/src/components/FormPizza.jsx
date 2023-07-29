import '../components/css/FormPizza.css';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';
import { Adicionais } from './Adicionais';

export function FormPizza () {
    const [ pizzas, setPizzas ] = useState([])
    const [ doisSabores, setDoisSabores ] = useState(false)
    const [ isOpen, setIsOpen ] = useState(false)

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

    const handleChange_Sabores = (event) => {
        setDoisSabores(!doisSabores)
        
        if(event.target.value === 'nao') {
            const sabor2 = document.getElementById('opcao2');
            sabor2.value = 0;
            sabor2.selectedIndex = 'Selecione';
        }
    };

    const handleChange_OpcaoPizza = (option, event) => {
        const option1 = document.getElementById('opcao1');
        const option2 = document.getElementById('opcao2');

        if(event.target.value == 0) {
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
    };

    return (
        <div className="containerPizza">
            <Adicionais 
                isOpen={isOpen}
                closeModal={() => setIsOpen(!isOpen)}
            />
            <div className="cabecalhoItem">
                <div className="quantidade">
                    <label htmlFor="quantidade">Quantidade</label>
                    <input 
                        type="number" 
                        id="quantidade"
                    />
                </div>
                <div className="tamanho">
                    <label htmlFor="tamanho">Tamanho</label>
                    <select name="tamanho" id="tamanho">
                        <option value="g">Grande</option>
                        <option value="p">Pequena</option>
                    </select>
                </div>
                <div className="borda">
                    <label htmlFor="borda">Borda</label>
                    <select name="borda" id="borda">
                        <option value="catupiry">Catupiry</option>
                        <option value="cheddar">Cheddar</option>
                        <option value="semBorda">Sem borda</option>
                        <option value="mussarela">Mussarela</option>
                        <option value="chocolate">Chocolate</option>
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
                                        <option key={pizza.idproduto} value={pizza.idproduto}>{pizza.produto}</option>
                                    )
                                })}
                            </select>
                        </td>
                        <td 
                            style={{ color: "blue", textDecoration: "underline" }}
                            onClick={() => setIsOpen(true)}
                        >
                            Adicionais
                        </td>
                        <td style={{ textAlign: "right" }}>
                            30,00
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
                                        <option key={pizza.idproduto} value={pizza.idproduto}>{pizza.produto}</option>
                                    )
                                })}
                            </select>
                        </td>
                        <td 
                            style={{ color: "blue", textDecoration: "underline" }}
                            onClick={() => setIsOpen(true)}
                        >
                            Adicionais
                        </td>
                        <td style={{ textAlign: "right" }}>
                            24,00
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}