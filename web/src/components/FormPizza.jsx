import '../components/css/FormPizza.css';

export function FormPizza () {
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
                        <select name="opcao1" id="opcao1">

                        </select>
                    </div>
                    <div className="opcao2">
                        <label htmlFor="opcao2">Opção 2</label>
                        <select name="opcao2" id="opcao2">

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