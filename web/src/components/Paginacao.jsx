import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import PropTypes from 'prop-types';

Paginacao.propTypes = {
    paginaAtual: PropTypes.number.isRequired,
    setPaginaAtual: PropTypes.func.isRequired,
    quantidadeDePaginas: PropTypes.number.isRequired,
}


export function Paginacao ({ paginaAtual, quantidadeDePaginas, setPaginaAtual}) {
    const handleClickAvancaPagina = () => {
        if(paginaAtual == quantidadeDePaginas) {
            return
        }

        const atual = paginaAtual;
        const proxima = atual + 1;

        setPaginaAtual(proxima)
    };

    const handleClickVoltaPagina = () => {
        if(paginaAtual == 1) {
            return
        }

        const atual = paginaAtual;
        const proxima = atual - 1;

        setPaginaAtual(proxima)
    };

    return (
        <div className="content-itens" id="paginacao">
            <button
                onClick={() => setPaginaAtual(1)}
            >
                <BsChevronDoubleLeft />Primeira
            </button>
            <button 
                onClick={handleClickVoltaPagina}
            >
                <BsChevronLeft />Anterior
            </button>
            <p>
                {`${paginaAtual} de ${quantidadeDePaginas} páginas`}
            </p>
            <button 
                onClick={handleClickAvancaPagina}
            >
                Próxima<BsChevronRight />
            </button>
            <button
                onClick={() => setPaginaAtual(quantidadeDePaginas)}
            >
                Última<BsChevronDoubleRight />
            </button>
        </div>
    )
}