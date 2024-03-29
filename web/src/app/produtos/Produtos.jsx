import "./Produtos.css";
import ModalProdutos from "./ModalProdutos";
import ModalEdicao from "./ModalEdicao";
import { ModalExclusao } from "../../components/ModalExclusao";
import { Paginacao } from "../../components/Paginacao";
import { api } from "../../lib/api";

import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BsPlusLg,
  BsFunnelFill,
  BsBackspace,
  BsPencilSquare,
} from "react-icons/bs";

export default function Produtos() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [quantidadeDePaginas, setQuantidadeDePaginas] = useState(1);
  const [produtos, setProdutos] = useState([
    { idproduto: null, produto: "", idcategoria: 0, categoria: "", preco: "" },
  ]);
  const [atualizaTabela, setAtualizaTabela] = useState(false);
  const [optionsIngredientes, setOptionsIngredientes] = useState([]);
  const [optionsCategoria, setOptionsCategoria] = useState([]);
  const [activeModalNovo, setActiveModalNovo] = useState(false);
  const [activeModalEdicao, setActiveModalEdicao] = useState(false);
  const [exclusao, setExclusao] = useState(false);
  const [idDeleteProduto, setIdDeleteProduto] = useState(0);
  const [editProduto, setEditProduto] = useState({
    idproduto: null,
    produto: "",
    idcategoria: 0,
    categoria: "",
    preco: "",
  });

  useEffect(() => {
    document.title = 'Produtos';
  }, []);

  useEffect(() => {
    async function getProdutos() {
      try {
        const response = await api.get("/produtos");
        const data = response.data.data;

        const indiceInicio = (paginaAtual - 1) * 10;
        const indiceFinal = indiceInicio + 10;
        const produtosPaginaAtual = data.slice(indiceInicio, indiceFinal);

        const contagemDePaginas = Math.ceil(data.length / 10);

        setQuantidadeDePaginas(contagemDePaginas);
        setProdutos(produtosPaginaAtual);
      } catch (error) {
        console.log(error);
      }
    }

    getProdutos();
  }, [atualizaTabela, paginaAtual]);

  useEffect(() => {
    async function getIngredientes() {
      try {
        const response = await api.get("/ingredientes");

        const data = response.data.data;
        const ingredientesOption = data.map((ingrediente) => {
          return [ingrediente.idingrediente, ingrediente.ingrediente];
        });
        const optionsIngredientesWithDefault = [
          ["", "Selecione"],
          ...ingredientesOption,
        ];

        setOptionsIngredientes(optionsIngredientesWithDefault);
      } catch (error) {
        console.log(error);
      }
    }

    getIngredientes();
  }, []);

  useEffect(() => {
    async function getCategorias() {
      try {
        const response = await api.get("/categorias");

        const data = response.data.data;
        const categoriasOptions = data.map((categoria) => {
          return [categoria.idcategoria, categoria.categoria];
        });

        const optionComPadrao = [[0, "Selecione"], ...categoriasOptions];

        setOptionsCategoria(optionComPadrao);
      } catch (error) {
        console.log(error);
      }
    }

    getCategorias();
  }, []);

  const handleClickExclusao = (idProduto) => {
    setIdDeleteProduto(idProduto);
    setExclusao(!exclusao);
  };

  const handleClickEdicao = (produtoEdit) => {
    setActiveModalEdicao(true);
    setEditProduto({
      idproduto: produtoEdit.idproduto,
      produto: produtoEdit.produto,
      idcategoria: produtoEdit.idcategoria,
      categoria: produtoEdit.categoria,
      preco: produtoEdit.preco,
    });
  };

  return (
    <div id="content">
      <ModalProdutos
        isOpen={activeModalNovo}
        atualizaTabela={() => setAtualizaTabela(!atualizaTabela)}
        optionsIngredientes={optionsIngredientes}
        optionsCategoria={optionsCategoria}
        closeModal={() => setActiveModalNovo(!activeModalNovo)}
      />
      <ModalExclusao
        exclusao={exclusao}
        atualizaTabela={() => setAtualizaTabela(!atualizaTabela)}
        idProduto={idDeleteProduto}
        closeExclusao={() => setExclusao(!exclusao)}
      />
      <ModalEdicao
        isOpen={activeModalEdicao}
        atualizaTabela={() => setAtualizaTabela(!atualizaTabela)}
        optionsIngredientes={optionsIngredientes}
        optionsCategoria={optionsCategoria}
        closeModal={() => setActiveModalEdicao(!activeModalEdicao)}
        editProduto={editProduto}
      />
      <div id="contentProdutos">
        <div className="content-itens" id="infoProdutos">
          <h3>Produtos</h3>
          <button className="btn-novo" onClick={() => setActiveModalNovo(true)}>
            <BsPlusLg /> Novo
          </button>
          <button className="btn-filter">
            <span className="filter">
              <BsFunnelFill />
            </span>
          </button>
        </div>
        <div className="content-itens" id="tabProdutos">
          <table>
            <tbody>
              <tr>
                <th>Código</th>
                <th>Produto</th>
                <th style={{ display: "none" }}>idCategoria</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th></th>
              </tr>
              {produtos.map((produto) => {
                return (
                  <tr key={produto.idproduto}>
                    <td style={{ width: "15%" }}>{produto.idproduto}</td>
                    <td style={{ width: "45%" }}>{produto.produto}</td>
                    <td style={{ display: "none" }}>{produto.idcategoria}</td>
                    <td style={{ width: "17%" }}>{produto.categoria}</td>
                    <td style={{ width: "16%" }}>{produto.preco}</td>
                    <td className="btn-actions">
                      <BsPencilSquare
                        className="btn-edit"
                        onClick={() => handleClickEdicao(produto)}
                      />
                      <BsBackspace
                        className="btn-delete"
                        onClick={() => handleClickExclusao(produto.idproduto)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Paginacao
          paginaAtual={paginaAtual}
          setPaginaAtual={setPaginaAtual}
          quantidadeDePaginas={quantidadeDePaginas}
          setQuantidadeDePaginas={setQuantidadeDePaginas}
        />
      </div>
      <ToastContainer pauseOnHover={false} />
    </div>
  );
}
