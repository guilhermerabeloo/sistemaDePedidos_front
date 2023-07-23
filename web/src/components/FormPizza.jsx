import '../components/css/FormPizza.css';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';

export function FormPizza () {
    const [ pizzas, setPizzas ] = useState([])

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

    const handleChange = (option, event) => {
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
    }

    return (
        <div className="containerPizza">
            <form>
                <div className="quantidade">
                    <label htmlFor="quantidade">Quantidade:</label>
                    <input 
                        type="number" 
                        id="quantidade"
                    />
                </div>
                <div className="saboresPizza">
                    <div className="sabores">
                        <label htmlFor="sabores">2 sabores?</label>
                        <select name="sabores" id="sabores">
                            <option value="nao">Não</option>
                            <option value="sim">Sim</option>
                        </select>
                    </div>
                    <div className="opcao1">
                        <label htmlFor="opcao1">Opção 1</label>
                        <select 
                            name="opcao1" 
                            id="opcao1"
                            onChange={(event) => handleChange("option1", event)}
                        >
                            {pizzas.map((pizza) => {
                                return (
                                    <option key={pizza.idproduto} value={pizza.idproduto}>{pizza.produto}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="opcao2">
                        <label htmlFor="opcao2">Opção 2</label>
                        <select 
                            name="opcao2" 
                            id="opcao2"
                            onChange={(event) => handleChange("option2", event)}
                        >
                            {pizzas.map((pizza) => {
                                return (
                                    <option key={pizza.idproduto} value={pizza.idproduto}>{pizza.produto}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="infoAdicionaisPizza">
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
            </form>
        </div>
    )
}