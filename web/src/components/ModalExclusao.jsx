import '../components/css/ModalExclusao.css'
import PropTypes from 'prop-types';
import { BsFillXCircleFill } from "react-icons/bs";
import { api } from '../lib/api';
import { toast } from 'react-toastify';

ModalExclusao.propTypes = {
    exclusao: PropTypes.bool.isRequired,
    closeExclusao: PropTypes.func.isRequired,
    idProduto: PropTypes.number.isRequired,
    atualizaTabela: PropTypes.func.isRequired,
};


export function ModalExclusao({ exclusao, closeExclusao, idProduto, atualizaTabela }) {
    
    async function deleteProduto() {
        try {
            await api.delete(
                `/excluiProduto/${idProduto}`
            );
            toast.success('Produto excluído com sucesso!', {
                autoClose: 3000,
            });
            atualizaTabela(true);
        } catch(error) {
            console.log(error)
            toast.error('Erro ao excluir o produto.', {
                autoClose: 3000,
            });
        }
    }

    return (
        <div className="container-exclusao">
            <div className={`modal-exclusao-fade ${exclusao ? '' : 'hide'}`} onClick={closeExclusao}></div>
            <div className={`modal-exclusao ${exclusao ? '' : 'hide'}`}>
                <BsFillXCircleFill className="icon-alert"/>
                <p>Deseja mesmo excluir este registro?</p>
                <div className="action">
                    <button className="btn-nao" onClick={closeExclusao}>Não</button>
                    <button 
                        className="btn-sim" 
                        onClick={() => {
                            deleteProduto();
                            closeExclusao();
                        }}
                    >
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}