import './Produtos.css';
import Modal from './Modal';
import { useState, useEffect } from 'react';
import { api } from '../../lib/api';

import { BsPlusLg } from "react-icons/bs";
import { BsFunnelFill } from "react-icons/bs";

export default function Produtos() {

  const [options, setOptions] = useState(['', '']);

  useEffect(() => {
      async function getIngredientes() {
          try {
              const response = await api.get(
                  '/ingredientes'
              )

              const data = response.data.data;
              const ingredientesOption = data.map((ingrediente) => {
                  return [ingrediente.idingrediente, ingrediente.ingrediente]
              })
              
              setOptions(ingredientesOption)
          } catch(error) {
              console.log(error)
          }
      }

      getIngredientes()
  }, [])

  const [ activeModal, setActiveModal ] = useState(false);

  return (
    <div id='content'>
      <Modal isOpen={activeModal} options={options} closeModal={() => setActiveModal(!activeModal)}/>
      <div id="contentProdutos">
            <div className="content-itens" id="infoProdutos">
                <h3>Produtos</h3>
                <button className="btn-novo" onClick={() => setActiveModal(true)}><BsPlusLg /> Novo</button>
                <button className="btn-filter"><span className="filter"><BsFunnelFill /></span></button>
            </div>
            <div className="content-itens" id="tabProdutos">
                <table>
                  <tbody>
                    <tr>
                        <th>Codigo</th>
                        <th>Produto</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Portuguesa</td>
                        <td>Pizza</td>
                        <td>26.5</td>
                    </tr>
                    <tr>
                        <td>02</td>
                        <td>Calabresa</td>
                        <td>Pizza</td>
                        <td>24.00</td>
                    </tr>
                    <tr>
                        <td>03</td>
                        <td>Mussarela</td>
                        <td>Pizza</td>
                        <td>24.00</td>
                    </tr>
                    <tr>
                        <td>04</td>
                        <td>Frango</td>
                        <td>Coxinha</td>
                        <td>3.50</td>
                    </tr>
                    <tr>
                        <td>05</td>
                        <td>Carne do sol com catupiry</td>
                        <td>Esfiha aberta</td>
                        <td>2.00</td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
